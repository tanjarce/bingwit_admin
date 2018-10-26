import React, { Component } from 'react'
import Tables from '../Tables'
import { withRouter } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../modals/DeleteModal'
import SearchAndCount from '../SearchAndCount'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'
import userDefafult from '../../assets/userDefault.svg'
import moment from 'moment'
import * as Help from '../../toastify/helpers'

class Feedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            feedbacks: [],
            feedbackCount: 0,
            selectedRow: null
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.getFeedbacks = this.getFeedbacks.bind(this)
        this.deleteFeedback = this.deleteFeedback.bind(this)
        this.viewFeedback = this.viewFeedback.bind(this) 
    }

    viewFeedback (rowInfo) {
        const { id } = rowInfo
        const { history: { push, goBack } , location: { pathname } } = this.props

        this.props.history.push(`${pathname}/view/${id}`)
    }

    getFeedbacks () {
        API.getFeedbacks()
        .then((response) => {
            if(response.success){
                this.setState(()=>({
                    feedbacks: [...response.feedback.rows],
                    feedbackCount: response.feedback.count
                }))
            }
            
        }).catch(error =>{
            console.log(error)
        })
    }

    deleteFeedback () {
        const { selectedRow: {id, User: {full_name}} } = this.state
        // console.log(id, full_name)
        API.deleteFeedbacks(id)
        .then((response) => {
            if (response.success) {
                Help.toastPop({message: 'Deleted successfully...', type: 'error'})
                this.getFeedbacks();
            } else {
                Help.toastPop({message: 'something went wrong', type: 'error'})
            }
        })
    }

    componentWillMount(){
        this.getFeedbacks()
    }

    toggleModal (rowInfo) {
        this.setState((prevState)=>({
            isOpen: !this.state.isOpen,
            selectedRow : rowInfo ? {...rowInfo} : null
        }), ()=>{
            console.log(this.state.selectedRow)
        })
    }

    render() {
        const { feedbacks, isOpen, feedbackCount, selectedRow } = this.state
        const Feedback = feedbacks.map((feed)=>{
            return ({
                ...feed,
                'Sent Date': moment(feed['Sent Date']).format('MMMM D, YYYY'),
                'action': {...feed}
            })
        })
        
        const columnsRules = [
            {
                Header: 'Account User',
                accessor: 'User',
                width: 300,
                Cell: rowInfo =>  {
                    return (
                        <div>
                            <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px'}}>
                                <img 
                                with="25px" height="25px" 
                                src={rowInfo.value.image_url ? rowInfo.value.image_url : userDefafult} 
                                className="m-auto"/>
                            </span>
                            {rowInfo.value.full_name}
                        </div>
                    )
                }
            },
            {
                Header: 'Feedback Description',
                accessor: 'feedback',
            },
            {
                Header: 'Sent Date',
                accessor: 'Sent Date',
                width: 180
            },
            {
                Header: ' ',
                accessor: 'action',
                width: 50,
                Cell: rowInfo =>  
                    (
                        <UncontrolledDropdown className="text-muted" size="sm">
                            <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
                                <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
                            </DropdownToggle>
                            <DropdownMenu>

                                <DropdownItem onClick={()=>{this.viewFeedback(rowInfo.value)}}>View</DropdownItem>
                                <DropdownItem onClick={()=>{this.toggleModal(rowInfo.value)}}>Delete</DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }
        ]

        const deleteMessage = (selectedRow) ? `Are you sure you want to delete?` : ''
        return (
            <React.Fragment>
                <DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteFeedback} message={deleteMessage}/>
                <SearchAndCount text="Feedback" count={feedbackCount}/>
                <Tables
                    columns={columnsRules}
                    data={Feedback} />
            </React.Fragment>
        )
    }
}

export default withRouter(Feedback)
