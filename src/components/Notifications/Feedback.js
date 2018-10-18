import React, { Component } from 'react'
import TableSearch from '../TableSearch'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../modals/DeleteModal'

import feedback from '../dummyJSONdata/feedback.json'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'


class Feedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
    }

    componentDidMount(){
        API.getFeedbacks()
        .then((response) => {
            //console.log(response)
        })
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
        const Feedback = feedback.map((feed)=>{
            return ({
                'name': feed.name,
                'feedback_description': feed.feedback_description,
                'sent_date': feed.sent_date,
                'action': {...feed}
            })
        })
        const columnsRules = [{
                Header: 'Account User',
                accessor: 'name',
                width: 300
            },
            {
                Header: 'Feedback Description',
                accessor: 'feedback_description',
            },
            {
                Header: 'Sent Date',
                accessor: 'sent_date',
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
        
        const { isOpen } = this.state
        return (
            <React.Fragment>
                <DeleteModal isOpen={isOpen} toggle={this.toggleModal}/>
                <TableSearch 
                    columns={columnsRules} 
                    data={Feedback} />
            </React.Fragment>
        )
      }
}

export default Feedback
