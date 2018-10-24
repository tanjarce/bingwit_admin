import React, { Component } from 'react'
import TableSearch from '../TableSearch'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../modals/DeleteModal'

import moment from 'moment'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'

class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            userReport : [],
            arr : [1,2,3]
        }
        this.getUser = this.getUser.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
    }

    componentWillMount(){
        this.getReport();
    }

    getReport(){
        API.getReports()
        .then((response) => {
                response.report.rows.map(item => {

                
                    API.getUserId(item.consumer_id)
                                .then((res) => {
                                    var joined = this.state.userReport.concat({
                                        'consumer' : res.user.full_name,
                                        'report_description' : item.feedback,
                                        'reported_seller' : item.User.full_name,
                                        'sent_date' : moment(item.createdAt).format('MMMM D, YYYY'),
                                    })
                                    this.setState({
                                        userReport : joined
                                    })
                                })

                })
            }
        )
        
            // if(response.success){
            //     this.setState({
            //         userReport : response.report.rows
            //     })
            // }
            
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }    

    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }
    getUser(id){
        API.getUserId(id)
        .then((response) => {
          if(response.success){
            return response.user.full_name
          }
          else{
            alert(response.error.message);
          }
        })
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
    const { userReport, arr } = this.state;
    console.log(userReport)

    const Reports = userReport.map((report)=>{
        return ({
            'consumer': report.consumer,
            'report_description': report.report_description,
            'reported_seller': report.reported_seller,
            'sent_date':  report.sent_date,
            'action': "{...report}"
        })
    })
    const columnsRules = [{
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
                data={Reports} />
        </React.Fragment>
    )
  }
}

export default Report
