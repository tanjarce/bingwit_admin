import React, { Component } from 'react';
import Tables from '../Tables'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import {Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Switch, Redirect, Route, withRouter } from 'react-router-dom'

import ViewTransaction from './ViewTransaction'
import TotalCount from '../TotalCount'
import dots from '../../images/show_more.svg'
import moment from 'moment'
import ExportCSV from '../../assets/Export.svg'

class Transaction extends Component {
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
            searchQ: '',
            type : '',
            column : '',
            data : '',
            columnl : '',
            datal : '',
        }
        this.viewTransaction = this.viewTransaction.bind(this)
        this.exportCSV = this.exportCSV.bind(this)
        this.getUserTransactionConsumer = this.getUserTransactionConsumer.bind(this)
        this.getUserTransactionProducer = this.getUserTransactionProducer.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        API.getUserId(id)
        .then((response) => {
        if(response.success === true){
            this.setState({
                dataUsers : response.user,
                type : response.user.type
            })
            response.user.type !== 'admin' ? (
            response.user.type === 'consumer' ?
            this.getUserTransactionConsumer() 
            :
            this.getUserTransactionProducer())
            :
            Help.toastPop({message: 'Admin type doesnt have this features.', type: 'error'})
        }
        else{
            Help.toastPop({message: response.error.message, type: 'error'})
        }
        })
    }
    viewTransaction(rowInfo){
        const { type } = this.state
        type === 'consumer' ?
         this.props.history.push(`/mnguser/users/${rowInfo.consumer_id}/transaction/view_${rowInfo.tracking_number}`)
        :
         this.props.history.push(`/mnguser/users/${rowInfo.producer_id}/transaction/view_${rowInfo.id}`)
    }
    getUserTransactionProducer(){
        this.setState({
            loading : true
        })       
        const id = this.props.match.params.id
        API.getUserTransactionProducer(id)
        .then((response) => {
            if(response.success){
                const arr = response.transaction.rows.map((item, key) => {
                    return ({
                        'tracking_number' : item.tracking_number,
                        'total_amount' :  <span>&#8369; {Intl.NumberFormat('en-GB').format(item.total_amount)}</span>,
                        'status' : item.status,
                        'consumer' : item.consumer.full_name ,
                        'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                        'action' : {...item},
                        'total' : item.total_amount
                    })
                })
                const items = []
                arr.map(item => items.push(item.total))
                const total = items.reduce((prev,next) => prev + next,0);
                this.setState({
                    column : 'Consumer',
                    data : 'consumer',
                    columnl : 'Status',
                    datal : 'status',
                    userInfo : arr,
                    count : response.transaction.count,
                    loading : false,
                    total : Intl.NumberFormat('en-GB').format(total)
                })
        }
        else{
            Help.toastPop({message: response.error.message, type: 'error'})
        }})
    }
    getUserTransactionConsumer(){        
        this.setState({
            loading : true
        })        
        const id = this.props.match.params.id
        API.getUserTransactionReceipt(id)
        .then((response) => {
            // console.log(response)
            if(response.success){
                const arr = response.rows.map((item, key) => {
                    return ({
                        'tracking_number' : item.tracking_number,
                        'total_amount' :  <span>&#8369; {Intl.NumberFormat('en-GB').format(item.total_amount)}</span>,
                        'status' : item.status,
                        'transaction' : item.transaction_count,
                        'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                        'action' : {...item},
                        'total' : item.total_amount
                    })
                })
                const items = []
                arr.map(item => items.push(item.total))
                const total = items.reduce((prev,next) => prev + next,0);
                this.setState({
                    column : 'Status',
                    data : 'status',
                    columnl : 'Transactions',
                    datal : 'transaction',
                    userInfo : arr,
                    count : response.count,
                    loading : false,
                    total : Intl.NumberFormat('en-GB').format(total)
                })
        }
        else{
            Help.toastPop({message: response.error.message, type: 'error'})
        } 
        })
        
    }
    exportCSV(){
        const { dataUsers, userInfo, total } = this.state 
        console.log(dataUsers)
        let csvToExport = [',,Tracking Number,Consumer,Status,Amount,Date'];
        let csvRow = [];
        csvRow = userInfo.map((item, index) => (
            index+1 + ',' + item.tracking_number + ',' + item.consumer + ',' + item.status + ',' + item.total + ',' + item.createdAt.replace(/[, ]+/g, "-").trim()
        ));
        
        csvToExport.push('%0A' , ...csvRow, '%0A' , `,,,,Total Amount: ${total.replace(',' , ' ')}`);

        csvToExport = csvToExport.join('%0A');

        var a = document.createElement("a");
        a.href = 'data:attachment/csv' + csvToExport;
        a.target = '_Blank';
        a.download = `${dataUsers.full_name}-transaction.csv`;
        document.body.appendChild(a);
        a.click();
    }
    render() {
        const { userTransaction } = this.props;
        const { loading, count, pagination, userInfo, total, column, data, columnl, datal } = this.state
        const columnsRules = [
            {
                Header: 'Tracking Number',
                accessor: 'tracking_number',
                width : 160,
            },
            {
                Header: 'Amount',
                accessor: 'total_amount',
                width : 100
            },
            {
                Header: column,
                accessor: data,
                Cell: rowInfo =>  
                (
                    rowInfo.value === 'cancelled' ? <span className="text-danger">cancelled</span> : rowInfo.value
                )
            },
            {
                Header: columnl,
                accessor: datal,
                width : 120,
                Cell: rowInfo =>  
                (
                    rowInfo.value === 'cancelled' ? <span className="text-danger">cancelled</span> : rowInfo.value
                )
            },
            {
                Header: 'Date Created',
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
                            <DropdownItem onClick={() => {this.viewTransaction(rowInfo.value)}}>View</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }]
        return (
            <div className='main-facts'>
                <Switch>
                    <Route exact path={`/mnguser/users/:id/transaction`} render={()=>(
                        <React.Fragment>
                            <div className='space' >
                                <h4 className='font-weight-bold'>{userTransaction.full_name}</h4>
                                <p className='text-muted role'>{userTransaction.type}</p>
                            </div>
                            <Row>
                            <Col xs='auto' className='mb-1'><span style={{cursor : 'pointer', color : '#3175B5'}} onClick={this.exportCSV}>
                            <img src={ExportCSV} className='pr-1'/> Export as CSV
                            </span></Col>
                            <Col></Col>
                            <Col xs='auto'><small>Total Amount: &#8369; {total}</small></Col>
                            {'|'}
                            <Col xs='auto'><TotalCount  text='Transactions' count={count}/></Col>
                            </Row>
                            <Tables
                                loading={loading}
                                columns={columnsRules} 
                                dataCount={count}
                                paginationData={pagination}
                                updateTable={this.getUserTransaction} 
                                data={userInfo} />
                        </React.Fragment>
                    )}/>
                    <Route exact path={`/mnguser/users/:id/transaction/view_:v_id`} render={()=>(
                        <ViewTransaction userTransaction={userTransaction} />
                    )}/>
                    <Route render={()=>(
                    <Redirect to={`/mnguser/users`} />
                    )}/>

                </Switch>
                </div>
        );
    }
}

export default withRouter(Transaction);