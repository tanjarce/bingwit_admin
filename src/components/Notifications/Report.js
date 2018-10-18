import React, { Component } from 'react'
import TableSearch from '../TableSearch'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../modals/DeleteModal'

// import * as API from '../../services/API'
import reports from '../dummyJSONdata/reports.json'
import dots from '../../images/show_more.svg'

class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
    }
    // componentWillMount(){
    //     API.getReports()
    //     .then((response) => {
    //         if(response.success){
    //             console.log(response)
    //         }
            
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

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
    const Reports = reports.map((report)=>{
        return ({
            'consumer': report.consumer_name,
            'report_description': report.report_description,
            'reported_seller': report.reported_seller,
            'sent_date': report.sent_date,
            'action': {...report}
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
