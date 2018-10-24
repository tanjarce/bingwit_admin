import React, { Component } from 'react'
import Tables from '../Tables'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../modals/DeleteModal'
import SearchAndCount from '../SearchAndCount'
// import feedback from '../dummyJSONdata/feedback.json'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'
// import userDefafult from '../../assets/userDefault.svg'
import moment from 'moment'

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
    }

    getFeedbacks () {
        API.getFeedbacks()
        .then((response) => {
            console.log(response)
            if(response.success){
                console.log(response)
                this.setState(()=>({
                    feedbacks: [...response.feedback.rows],
                    feedbackCount: response.feedback.count
                }))
            }
            
        }).catch(error =>{
            console.log(error)
        })
    }

    deleteFeedback (id) {
        // API.deleteRules(id)
        // .then((response) => {
        //     const error = response.err || ''
        //     if (!error) {

        //         Help.toastPop({message: 'Deleted successfully...', type: 'error'})
        //         this.updateTable();
        //         return
        //     } else {
        //         this.props.onError(response.err.message)
        //     }
        // })
    }

    componentWillMount(){
        this.getFeedbacks()
    }

    toggleModal (rowInfo) {
        this.setState((prevState)=>({
            isOpen: !this.state.isOpen,
            selectedRow : rowInfo ? {...rowInfo} : prevState.selectedRow
        }))
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
                    const { value } = rowInfo
                    return (
                        <div>
                            <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px', 'background': 'pink'}}>
                                {/* <img 
                                with="25px" height="25px" 
                                src={value['image_url'] ? value['image_url'] : userDefafult} 
                                className="m-auto"/> */}
                            </span>
                            {value.full_name}
                            
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
                                <DropdownItem onClick={()=>{console.log('view')}}>View</DropdownItem>
                                <DropdownItem onClick={console.log('hi')}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }
        ]
        const rowInfo = selectedRow 
        ? { 
            'message': `Are you sure you want to delete ${selectedRow['User Name']}'s feedback.`,
            'id': selectedRow.id
        } : null
        return (
            <React.Fragment>
                <DeleteModal isOpen={isOpen} toggle={this.toggleModal} selectedRow={rowInfo} deleteItem={this.deleteFeedback} />
                <SearchAndCount text="Feedback" count={feedbackCount}/>
                <Tables
                    columns={columnsRules}
                    data={Feedback} />
            </React.Fragment>
        )
    }
}

export default Feedback
