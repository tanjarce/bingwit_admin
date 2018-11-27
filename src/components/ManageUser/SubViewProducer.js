import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';
import ordered from '../../assets/Ordered.svg'
import ready from '../../assets/Ready.svg'
import shipped from '../../assets/Shipped.svg'
import delivered from '../../assets/Delivered.svg'
import ordered_x from '../../assets/Ordered_x.svg'
import ready_x from '../../assets/Ready_x.svg'
import shipped_x from '../../assets/Shipped_x.svg'
import delivered_x from '../../assets/Delivered_x.svg'
import cancelled from '../../assets/Cancelled.svg'

import moment from 'moment'
class SubViewProducer extends Component {
    render(){
    const { item } = this.props
    console.log(item)
    const arr = []
    for(let x = 0 ; x < 4 ; x++){
        if(x === 0 ){
            item.log.rows[x] ? 
            item.log.rows[x].to === 'order placed' ? 
            arr.push( <div style={{lineHeight : '0'}}><img src={ordered_x} className='pr-2'/>
            {`${moment(item.log.rows[x].createdAt).format('MMM DD, YYYY - h:mm a')} - Order Placed`}
            </div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={ordered} className='pr-2'/>Order Placed</div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={ordered} className='pr-2'/>Order Placed</div>)
        }
        if(x === 1){
            item.log.rows[x] ? 
            item.log.rows[x].to === 'ready for delivery' ? 
            arr.push( <div style={{lineHeight : '0'}}><img src={ready_x} className='pr-2'/>
            {`${moment(item.log.rows[x].createdAt).format('MMM DD, YYYY - h:mm a')} - Ready for Delivery`}
            </div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={ready} className='pr-2'/>Ready for Delivery</div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={ready} className='pr-2'/>Ready for Delivery</div>)
        }
        if(x === 2){
            item.log.rows[x] ? 
            item.log.rows[x].to === 'shipped' ? 
            arr.push( <div style={{lineHeight : '0'}}><img src={shipped_x} className='pr-2'/>
            {`${moment(item.log.rows[x].createdAt).format('MMM DD, YYYY - h:mm a')} - Shipped`}
            </div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={shipped} className='pr-2'/>Shipped</div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={shipped} className='pr-2'/>Shipped</div>)
        }
        if(x === 3){
            item.log.rows[x] ? 
            <React.Fragment>
            {item.log.rows[x].to === 'delivered' ? 
            arr.push( <div style={{lineHeight : '0'}}><img src={delivered_x} className='pr-2'/>
            {`${moment(item.log.rows[x].createdAt).format('MMM DD, YYYY - h:mm a')} - Delivered`}
            </div>)
            :
            <React.Fragment>
            {item.log.rows[x].to === "returned upon delivery" ? 
            arr.push( <div style={{lineHeight : '0'}}><img src={cancelled} className='pr-2'/>
            {`${moment(item.log.rows[x].createdAt).format('MMM DD, YYYY - h:mm a')} - RUD`}
            </div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={delivered} className='pr-2'/>Delivered</div>)
            }
            </React.Fragment>
            }
            </React.Fragment>
            :
            <React.Fragment>
            {
            item.log.rows[1] ? 
            arr.push( <div style={{lineHeight : '0'}}><img src={cancelled} className='pr-2'/>
            {`${moment(item.log.rows[1].createdAt).format('MMM DD, YYYY - h:mm a')} - Cancelled`}
            </div>)
            :
            arr.push( <div style={{lineHeight : '0'}}><img src={delivered} className='pr-2'/>Delivered</div>)
            }
            </React.Fragment>
    }
}
        return(
            <Row>
                <Col>
                    <div className='d-flex flex-column'>
                        {arr}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default SubViewProducer;