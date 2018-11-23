import React, { Component } from 'react'
import Tables from '../Tables'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteModal from '../../modals/DeleteModal'

import userDefafult from '../../assets/userDefault.svg'
import * as Help from '../../toastify/helpers'
import moment from 'moment'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'
import SearchAndCount from '../SearchAndCount'
import ViewReport from './ViewReport';

class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            selectedRow: null,
            userReport : [],
            count : '',
            loading : true,
            bool : true,
        }
        this.viewItem = this.viewItem.bind(this)
        this.viewReport = this.viewReport.bind(this)
        this.getReport = this.getReport.bind(this)
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
                this.getReport();
            }
        }).catch(err => {
            Help.toastPop({message: err , type: 'error'})
        })
    }
    viewItem(){
        this.setState({
            bool : !this.state.bool
        })
    }
    viewReport (rowInfo) {
        this.viewItem();
        console.log(rowInfo)
        this.setState({
            selectedRow : rowInfo
        })
        
    }

    loading(){
        this.setState({
            loading : true
        })
    }
    getReport(paginationData, searchQData){
        this.loading()

        this.props.updateQuery(paginationData, searchQData)
        setTimeout(()=>{
            const { pagination, searchQ } = this.props

            const data = {
                searchQ : searchQ,
                ...pagination
            }
            API.getReports(data)
            .then((response) => {
                if(response.success){
                    this.setState({
                        userReport : response.report.rows,
                        count : response.report.count,
                        loading : false
                    })
                }
                else{
                    Help.toastPop({message: response.error.message , type: 'error'})
                }
            }).catch(error =>{
                console.log(error)
            })
        }, 10)
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
    const { userReport, selectedRow, count, isOpen, loading, bool } = this.state;
    const { pagination } = this.props
    const Reports = userReport.map((report)=>{
        return ({
            'consumer': report.consumer,
            'report_description': report.feedback,
            'reported_seller': report.producer,
            'sent_date':  moment(report.createdAt).format('MMMM D, YYYY'),
            'action': {...report}
            
        })
    })
    const columnsRules = [
        {
            Header: 'Consumer',
            accessor: 'consumer',
            width: 200,
            Cell: rowInfo =>  {
                return (
                    <div>
                        {console.log(rowInfo.value)}
                        <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px'}}>
                            <img 
                            alt = 'img'
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
            Header: 'Report Description',
            accessor: 'report_description',
        },
        {
            Header: 'Reported Seller',
            accessor: 'reported_seller',
            width: 200,
            Cell: rowInfo =>  {
                return (
                    <div>
                        <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px'}}>
                            <img 
                            alt="reported seller"
                            width="25px" height="25px" 
                            src={rowInfo.value.image_url ? rowInfo.value.image_url : userDefafult} 
                            className="m-auto rounded-circle"
                            />
                        </span>
                        {rowInfo.value.full_name}
                    </div>
                )
            }
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
            resizable: false,
            Cell: rowInfo =>  
                (
                    <UncontrolledDropdown className="text-muted" size="sm">
                        <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
                            <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=>{this.viewReport(rowInfo.value)}}>View</DropdownItem>
                            <DropdownItem onClick={() => this.toggleModal(rowInfo.value)}>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
        }]
    const message = selectedRow ? `Are you sure you want to delete this report? "${selectedRow.feedback}".` : ''
    return (
        <React.Fragment>
        {bool ? <div>
            <DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteRule} message={message}/>
            <SearchAndCount updateTable={this.getReport} text="Reports" count={count}/>
            <Tables 
                loading = {loading}
                columns={columnsRules} 
                dataCount={count}
                paginationData={pagination}
                updateTable={this.getReport} 
                data={Reports} />
                </div>
                :
                <ViewReport viewItem={this.viewItem} selectedRow = {selectedRow}/>
        }
        </React.Fragment>
    )
  }
}

export default Report