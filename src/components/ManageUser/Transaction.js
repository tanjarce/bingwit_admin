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
    componentWillMount(){
        const id = this.props.match.params.id
        API.getUserId(id)
        .then((response) => {
        if(response.success === true){
            response.user.type !== 'admin' ? 
            response.user.type === 'consumer' ?
            this.getUserTransactionConsumer() 
            :
            this.getUserTransactionProducer()
            :
            Help.toastPop({message: 'Admin type doesnt have this features.', type: 'error'})
        }
        else{
            Help.toastPop({message: response.error.message, type: 'error'})
        }
        })
    }
    viewTransaction(){
        const { userTransaction } = this.props;
        this.props.history.push(`/mnguser/users/${userTransaction.id}/transaction/view`)
    }
    getUserTransactionProducer(){
        this.setState({
            loading : true
        })       
        const id = this.props.match.params.id
        API.getUserTransactionTransaction(id)
        .then((response) => {
            if(response.success){
                console.log(response.transaction)
                const arr = response.transaction.rows.map((item, key) => {
                    return ({
                        'tracking_number' : item.tracking_number,
                        'total_amount' :  <span>&#8369; {Intl.NumberFormat('en-GB').format(item.total_amount)}</span>,
                        'rating' : item.rating ? item.rating : '- -',
                        'consumer' : item.consumer_id ,
                        'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                        'action' : {...item}
                    })
                })
                const items = []
                arr.map(item => items.push(item.total))
                const total = items.reduce((prev,next) => prev + next,0);
                this.setState({
                    column : 'Consumer',
                    data : 'consumer',
                    columnl : 'Rating',
                    datal : 'rating',
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
            
            if(response.success){
                const arr = response.receipts.map((item, key) => {
                    return ({
                        'tracking_number' : item.tracking_number,
                        'total_amount' :  <span>&#8369; {Intl.NumberFormat('en-GB').format(item.total_amount)}</span>,
                        'address' : item.address,
                        'transaction' : item.transaction.length,
                        'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                        'action' : {...item}
                    })
                })
                const items = []
                arr.map(item => items.push(item.total))
                const total = items.reduce((prev,next) => prev + next,0);
                this.setState({
                    column : 'No. of Transaction',
                    data : 'transaction',
                    columnl : 'Address',
                    datal : 'address',
                    userInfo : arr,
                    count : '- -',
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
        const { loading, count, pagination, userInfo, total, column, data, columnl, datal } = this.state
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
                Header: columnl,
                accessor: datal,
                width : 180
            },
            {
                Header: column,
                accessor: data,
                width : 180
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
                        </React.Fragment>
                    )}/>
                    <Route exact path={`/mnguser/users/:id/transaction/view`} render={()=>(
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