import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment'
import fishDefault from '../../assets/fish.svg'
import Tables from './Table'

class ViewProducer extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataTable : []
        }
    }
    componentWillMount(){
        const { data } = this.props
        const arr = data.rows.map((item) => {
            return({
                product_name : item.product,
                quantity : item.quantity + ' kg',
                amount : <span>&#8369; {Intl.NumberFormat('en-GB').format(item.amount)}</span>,
                comment : item.comment ? item.comment : 'No Comment.',
                date : moment(item.createdAt).format('MMMM D, YYYY')
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
                Header: 'Comment',
                accessor: 'comment',
            },
            {
                Header: 'Date',
                accessor: 'date',
            }
        ]
        return (
            <React.Fragment>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Tracking No:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.tracking_number ? data.tracking_number : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Consumer:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.consumer.full_name ? data.consumer.full_name : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Total Amount:</Col>
                    <Col xs='auto'><span className='px-3 col'>{<span>&#8369; {Intl.NumberFormat('en-GB').format(data.total_amount ? data.total_amount : '0')}</span>}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Status:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.status ? data.status : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Comment:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.additional_information ? data.additional_information : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Rating:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.rating ? data.rating : '- -'}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Products:</Col>
                    <Col xs='auto'><span className='px-3 col'>{data.count ? data.count : '0'}</span></Col><br/>
                </Row>
                <hr/>
                <Tables
                    columns={columnsRules}
                    data={dataTable} 
                    defaultRow={dataTable.length}
                />
            </React.Fragment>
        );
    }
}

export default ViewProducer;