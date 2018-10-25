import React, { Component } from 'react'
import Tables from '../Tables'
import { Col, Row, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../modals/DeleteModal'

import * as Help from '../../toastify/helpers'
import moment from 'moment'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'
import TotalCount from '../TotalCount';

class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            userReport : [],
            selectedRow: null,
            count : ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.deleteRule = this.deleteRule.bind(this)
    }

    componentWillMount(){
        this.getReport();
    }

    deleteRule () {
        const { selectedRow } = this.state
        
        API.deleteReport(selectedRow.id)
        .then((response) => {
            if (response.success) {
                Help.toastPop({message: `Successfully deleted.`, type: 'error'})
                this.setState({
                    userReport : []
                })
                this.getReport();
                
            }
        }).catch(err => {
            Help.toastPop({message: err , type: 'error'})
        })
    }
    
    getReport(){
        API.getReports()
        .then((response) => {
                response.report.rows.map(item => {
                        API.getUserId(item.consumer_id)
                                .then((res) => {
                                    var joined = this.state.userReport.concat({
                                        'id' : item.id,
                                        'consumer' : res.user.full_name,
                                        'report_description' : item.feedback,
                                        'reported_seller' : item.User.full_name,
                                        'sent_date' : moment(item.createdAt).format('MMMM D, YYYY'),
                                        'action' : {...item}
                                    })
                                    this.setState({
                                        userReport : joined,
                                        count : response.report.count
                                    })
                                })
                            })
                        }
                    )
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }    

    toggleModal (rowInfo) {
        this.setState((prevState)=>({
            isOpen: !this.state.isOpen,
            selectedRow : rowInfo ? {...rowInfo} : prevState.selectedRow
        }))
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
    const { userReport, selectedRow, count, isOpen } = this.state;
    const Reports = userReport.map((report)=>{
        return ({
            'consumer': report.consumer,
            'report_description': report.report_description,
            'reported_seller': report.reported_seller,
            'sent_date':  report.sent_date,
            'action': report.action
        })
    })
    const columnsRules = [
        {
            Header: 'Consumer',
            accessor: 'consumer',
            width: 200
        },
        {
            Header: 'Report Description',
            accessor: 'report_description',
        },
        {
            Header: 'Reported Seller',
            accessor: 'reported_seller',
            width: 200
        },
        {
            Header: 'Sent Date',
            accessor: 'sent_date',
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
                            <DropdownItem onClick={() => this.toggleModal(rowInfo.value)}>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
        }]
    const message = selectedRow ? `Are you sure you want to delete this report? "${selectedRow.feedback}".` : ''
    return (
        <React.Fragment>
            <DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteRule} message={message}/>
            <Row><Col></Col>
            <Col xs='auto'><TotalCount count={count} text='Reports'/></Col>
            </Row>
            <Tables 
                columns={columnsRules} 
                data={Reports} />
        </React.Fragment>
    )
  }
}

export default Report
