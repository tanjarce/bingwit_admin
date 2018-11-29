import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment'
import * as API from '../../services/API'

import SubViewConsumer from './SubViewConsumer'

class ViewConsumer extends Component {
    constructor(props){
        super(props);
        this.state = {
            tmp : [],
            data : [],
            dataTable : []
        }

        this.temp = this.temp.bind(this);
    }

    temp(res) {
        let newtmp = this.state.tmp;
        newtmp = newtmp.concat({...res})
        this.setState({
            tmp: newtmp
        })
    }

    componentWillMount(){
        const { data } = this.props
        const arr = []
        data.transaction.map((item) => {
           item.transaction_product.map((item_product) => {
           API.getUserTransactionProducerById(data.consumer_id, item.id)
                .then((response) => {
                     let tmp = {
                        id : item.id,
                        product_name : item_product.product,
                        producer_name : item.producer,
                        quantity : item_product.quantity + ' kg',
                        amount : <span>&#8369; {Intl.NumberFormat('en-GB').format(item_product.amount)}</span>,
                        cancel : item_product.isCancelled ? 'Yes' : 'No',
                        date : moment(item_product.createdAt).startOf('hour').fromNow(),
                        log : response.status_log
                    }
                    this.temp(tmp);
                })
            })
            
        })
        console.log(arr)
        this.setState({
            dataTable : arr,
            data : data
        })
    }
    render() {
        const { data, tmp, dataTable } = this.state
        console.log('tmp  = ' + tmp)
        console.log('dataTable = ' + dataTable)
        const dataArr = tmp.map((item, key) => {
            return <SubViewConsumer key={key} item={item}/>
        })
 
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
                    <Col xs='auto'><span className='px-3 col'>{tmp ? tmp.length : '0'}</span></Col><br/>
                </Row>
                <br/>
                <div className='border' style={{height : '220px', overflowY : 'auto', overflowX : 'hidden'}}>
                <Row>
                    <Col>
                    <div>
                    {dataArr}
                    </div>
                    </Col>
                </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default ViewConsumer;