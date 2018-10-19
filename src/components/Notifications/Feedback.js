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
            feedbackCount: 0
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.getFeedbacks = this.getFeedbacks.bind(this)
        this.getFeedbacksCount = this.getFeedbacksCount.bind(this)
    }

    getFeedbacksCount () {
        API.getCountFeedbacks()
        .then((response)=>{
            // console.log(response)
            if(response.success){
                this.setState(()=>({
                    feedbackCount: response.totalFeedbacks.count
                }))
            } else {
                console.log()
            }
        })
    }

    getFeedbacks () {
        API.getFeedbacks()
        .then((response) => {
            console.log(response)
            if(response.success){
                console.log(response)
                this.setState(()=>({
                    feedbacks: [...response.feedback]
                }), ()=>{
                    this.getFeedbacksCount()        
                    // const { feedbacks } = this.state
                    // const keys = Object.keys(feedbacks[0])
                    // console.log(keys)
                    // console.log(feedbacks)
                    // console.log(feedbacks[0]['Sent Date'])
                })
            }
            
        }).catch(error =>{
            console.log(error)
        })
    }

    componentWillMount(){
        this.getFeedbacks()
    }

    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }

    setModal (data, type) {
        this.setState({
            modalType: type,
            userData: {...data}
        }, () => {
            this.toggleModal()
        }
    )}

    render() {
        const { feedbacks } = this.state
        const Feedback = feedbacks.map((feed)=>{
            // console.log(feed)
            // console.log(feed['Sent Date'])
            // console.log(feed['User']['Account User'])

            return ({
                ...feed,
                'Sent Date': moment(feed['Sent Date']).format('MMMM D, YYYY'),
                'action': {...feed}
            })
        })
        const columnsRules = [{
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
                            {value['Account User']}
                            
                        </div>
                    )
                }
            },
            {
                Header: 'Feedback Description',
                accessor: 'Feedback Description',
            },
            {
                Header: 'Sent Date',
                accessor: 'Sent Date',
                width: 180
            },{
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
                                <DropdownItem onClick={this.toggleModal}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }]
        
        const { isOpen, feedbackCount } = this.state
        return (
            <React.Fragment>
                <DeleteModal isOpen={isOpen} toggle={this.toggleModal}/>
                <SearchAndCount text="Feedback" count={feedbackCount}/>
                <Tables
                    columns={columnsRules}
                    data={Feedback} />
            </React.Fragment>
        )
    }
}

export default Feedback
