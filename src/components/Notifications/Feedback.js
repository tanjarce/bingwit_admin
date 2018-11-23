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
import ViewFeedback from './ViewFeedback' 

class Feedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showTable: true,
            modalType: 'delete',
            isOpen: false,
            feedbacks: [],
            feedbackCount: 0,
            selectedRow: null,
            loading : true,
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.getFeedbacks = this.getFeedbacks.bind(this)
        this.deleteFeedback = this.deleteFeedback.bind(this)
        this.viewFeedback = this.viewFeedback.bind(this) 
        this.viewTable = this.viewTable.bind(this) 
    }

    viewTable () {
        this.setState((prevState)=>({
            showTable: true,
        }))
    }
    
    viewFeedback (rowInfo) {
        this.setState((prevState)=>({
            selectedRow : rowInfo ? {...rowInfo} : null,
            showTable: false
        }), ()=>{
            console.log(this.state.selectedRow)
        })
        // const { id } = rowInfo
        // const { history: { push, goBack } , location: { pathname } } = this.props

        // this.props.history.push(`${pathname}/view/${id}`)
    }
    viewTable (){
        this.setState(()=>({
            showTable: true
        }))
    }

    loading(){
        this.setState({
            loading : true
        })
    }
    getFeedbacks(paginationData, searchQData){
        this.loading()

        this.props.updateQuery(paginationData, searchQData)
        setTimeout(()=>{
            const { pagination, searchQ } = this.props

            const data = {
                searchQ : searchQ,
                ...pagination
            }
            
            API.getFeedbacks(data)
            .then((response) => {
                if(response.success){
                    this.setState(()=>({
                        feedbacks: [...response.feedback.rows],
                        feedbackCount: response.feedback.count,
                        loading : false
                    }))
                }
                else{
                    Help.toastPop({message: response.error.message , type: 'error'})
                }
            }).catch(error =>{
                console.log(error)
            })
        },10)
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
        const { feedbacks, isOpen, feedbackCount, selectedRow, loading, showTable } = this.state
        const { pagination } = this.props
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
                                width="25px" height="25px" 
                                src={rowInfo.value.image_url ? rowInfo.value.image_url : userDefafult} 
                                className="m-auto rounded-circle"/>
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
            showTable ? (
                <React.Fragment>
                    <DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteFeedback} message={deleteMessage}/>
                    <SearchAndCount updateTable={this.getFeedbacks} text="Feedback" count={feedbackCount}/>
                    <Tables
                        loading = {loading}
                        columns={columnsRules}
                        dataCount={feedbackCount}
                        paginationData={pagination}
                        updateTable={this.getFeedbacks}
                        data={Feedback} />
                </React.Fragment>
            ) 
            : (
                <ViewFeedback selectedRow={selectedRow} viewTable={this.viewTable}/>
            )
        )
    }
}

export default withRouter(Feedback)
