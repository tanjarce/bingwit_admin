import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment'
import fishDefault from '../../assets/fish.svg'
import userDefault from '../../assets/userDefault.svg'
import Tables from './Table'
import * as Help from '../../toastify/helpers'

class ViewConsumer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            dataTable : []
        }
    }
    componentWillMount(){
        const { data } = this.props
        const arr = []
        data.transaction.map((item) => {
            item.transaction_product.map((item_product) => 
            {
                let tmp_arr = {
                    product_name : item_product.product,
                    producer_name : item.producer,
                    quantity : item_product.quantity + ' kg',
                    amount : <span>&#8369; {Intl.NumberFormat('en-GB').format(item_product.amount)}</span>,
                    cancel : item_product.isCancelled ? 'Yes' : 'No',
                    date : moment(item_product.createdAt).format('MMMM D, YYYY')
                }    
                arr.push(tmp_arr)
            })
            
        })
        this.setState({
            dataTable : arr,
            data : data
        })
    }
    render() {
        const { data, dataTable } = this.state
        const columnsRules = [
            {
                Header: 'Products',
                accessor: 'product_name',
                Cell: rowInfo =>  {
                    return (
                        <div>
                            <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px'}}>
                                <img 
                                width="25px" height="25px" 
                                src={rowInfo.value.image_url ? rowInfo.value.image_url : fishDefault} 
                                className="m-auto rounded-circle"/>
                            </span>
                            {rowInfo.value.name}
                        </div>
                    )
                }
            },
            {
                Header: 'Producer',
                accessor: 'producer_name',
                Cell: rowInfo =>  {
                    return (
                        <div>
                            <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px'}}>
                                <img 
                                width="25px" height="25px" 
                                src={rowInfo.value.image_url ? rowInfo.value.image_url : userDefault} 
                                className="m-auto rounded-circle"/>
                            </span>
                            {rowInfo.value.full_name}
                        </div>
                    )
                }
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
                Header: 'Cancelled',
                accessor: 'cancel',
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