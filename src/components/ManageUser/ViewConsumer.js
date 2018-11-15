import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment'

import Tables from './Table'

class ViewConsumer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            dataTable : []
        }
    }
    /* 
    const product_arr = []
            item.transaction_product.map((item) => product_arr.push(item.product.name))
            console.log(product_arr.join(", "))
            return({
                product_name : product_arr,
                producer_name : item.producer.full_name,
                quantity : '',
                amount : '',
                status : '',
                date : ''
            });
    */
    componentWillMount(){
        const { data } = this.props
        const arr = []
        data.transaction.map((item) => {
            arr.push(...item.transaction_product)
        })
        const dataTable = arr.map((item) => {
            console.log(item)
            return({
                product_name : item.product.name,
                producer_name : item.product.producer.full_name,
                quantity : item.quantity,
                amount :  <span>&#8369; {Intl.NumberFormat('en-GB').format(item.amount)}</span>,
                date : moment(item.createdAt).format('MMMM D, YYYY')
            })
        })
        this.setState({
            dataTable : dataTable,
            data : data
        })
    }
    render() {
        const { data, dataTable } = this.state
        console.log(dataTable)
        const columnsRules = [
            {
                Header: 'Products',
                accessor: 'product_name'
            },
            {
                Header: 'Producer',
                accessor: 'producer_name'
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                width : 100
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                width : 100
            },
            {
                Header: 'Date',
                accessor: 'date',
                width : 180
            }
        ]
        
        return (
            <React.Fragment>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Tracking No:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.tracking_number ? data.tracking_number : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Status:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.status ? data.status : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Address:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.address ? data.address : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Total Amount:</Col>
                    <Col xs='auto'><span className='px-3 col'>{<span>&#8369; {Intl.NumberFormat('en-GB').format(data.total_amount ? data.total_amount : '0')}</span>}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Date:</Col>
                    <Col xs='auto'><span className='px-3 col'>{ data.createdAt ? moment(data.createdAt).format('MMMM D, YYYY') : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Products:</Col>
                    <Col xs='auto'><span className='px-3 col'>{dataTable ? dataTable.length : '0'}</span></Col><br/>
                </Row>
                <hr/>
                <Tables
                    columns={columnsRules} 
                    data = {dataTable}
                    defaultRow={dataTable.length}
                />
            </React.Fragment>
        );
    }
}

export default ViewConsumer;