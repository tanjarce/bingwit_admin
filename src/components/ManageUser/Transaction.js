import React, { Component } from 'react';
import Tables from '../Tables'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import {Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';

import TotalCount from '../TotalCount'
import dots from '../../images/show_more.svg'
import moment from 'moment'

class Biography extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : '',
            dataUsers : [],
            count : '',
            userInfo : [],
            loading : true,
            pagination: {
                offset: 0,
                limit: 10
            },
            total : '',
            searchQ: ''
        }
        this.viewTransaction = this.viewTransaction.bind(this)
        this.exportCSV = this.exportCSV.bind(this)
        this.getUserTransaction = this.getUserTransaction.bind(this)
    }
    componentDidMount(){
        this.getUserTransaction();
    }
    viewTransaction(){
        console.log('VIEW TRANSACT')
    }
    getUserTransaction(){
        this.setState({
            loading : true
        })
        
        const { userTransaction } = this.props;
        API.getUserTransaction(userTransaction.id)
        .then((response) => {
            if(response.success) { 
            const arr = response.transaction.rows.map((item, key) => {
                return ({
                    'tracking_number' : item.tracking_number,
                    'total_amount' :  <span>&#8369; {Intl.NumberFormat('en-GB').format(item.total_amount)}</span>,
                    'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                    'action' : {...item},
                    'total' : item.total_amount
                })
            })
            const items = []
            arr.map(item => items.push(item.total))
            const total = items.reduce((prev,next) => prev + next,0);
            this.setState({
                userInfo : arr,
                count : response.transaction.count,
                loading : false,
                total : Intl.NumberFormat('en-GB').format(total)
            })
        }
        else{   
            Help.toastPop({message: `You can't suspend this type.`, type: 'error'})
        }
        })
        
        /* 
        'tracking_number' : item.tracking_number,
                    'total_amount' : <span>&#8369; {item.total_amount}</span>,
                    'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                    'action' : {...item},
                    'total' : item.total_amount */
    }
    exportCSV(){
        const { userInfo } = this.state 
        console.log(userInfo)
        let csvToExport = [',Tracking Number,Amount,Date'];
        let csvRow = [];
        csvRow = userInfo.map((item) => (
            item.tracking_number + ',' + item.total + ',' + item.createdAt.replace(',','-')
        ));
        
        csvToExport.push(...csvRow);

        csvToExport = csvToExport.join('%0A');

        var a = document.createElement("a");
        a.href = 'data:attachment/csv' + csvToExport;
        a.target = '_Blank';
        a.download = 'testfile.csv';
        document.body.appendChild(a);
        a.click();
    }
    render() {
        const { userTransaction } = this.props;
        const { loading, count, pagination, userInfo, total } = this.state
        
        const columnsRules = [
            {
                Header: 'Tracking Number',
                accessor: 'tracking_number'
            },
            {
                Header: 'Amount',
                accessor: 'total_amount',
                width : 100
            },
            {
                Header: 'Date',
                accessor: 'createdAt',
                width : 180
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
                            <DropdownItem onClick={() => {this.viewTransaction(rowInfo.value.id)}}>View</DropdownItem>
                            {/* <DropdownItem onClick={() => {this.setModal(rowInfo.value, 'suspend') }}>Suspend</DropdownItem> */}
                            <DropdownItem onClick={()=>{this.setModal(rowInfo.value, 'delete')}}>Suspend</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }]
        return (
            <div className='main-facts'>
                <div className='space' >
                    <h4 className='font-weight-bold'>{userTransaction.full_name}</h4>
                    <p className='text-muted role'>{userTransaction.type}</p>
                </div>
                <Row>
                <Col xs='auto'><span style={{cursor : 'pointer'}} onClick={this.exportCSV}>Export as CSV</span></Col>
                <Col></Col>
                <Col xs='auto'><span>Total Amount: &#8369; {total}</span></Col>
                {'|'}
                <Col xs='auto'><TotalCount  text='Transaction' count={count}/></Col>
                </Row>
                <Tables
                    loading={loading}
                    columns={columnsRules} 
                    dataCount={count}
                    paginationData={pagination}
                    updateTable={this.getUserTransaction} 
                    data={userInfo} />
            </div>
        );
    }
}

export default Biography;