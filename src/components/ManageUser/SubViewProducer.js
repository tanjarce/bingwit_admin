import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';
import ordered from '../../assets/Ordered.svg'
import ready from '../../assets/Ready.svg'
import shipped from '../../assets/Shipped.svg'
import delivered from '../../assets/Delivered.svg'

class SubViewProducer extends Component {
    render(){
        const { item } = this.props
        return(
            <Row>
                <Col>
                    <div className='d-flex flex-column'>
                        <div style={{lineHeight : '0'}}><img src={ordered} className='pr-2'/> Nov. 29, 2018 - 4:30pm : Order Placed</div>
                        <div style={{lineHeight : '0'}}><img src={ready} className='pr-2'/> Nov. 29, 2018 - 4:30pm : Ready for Delivery</div>
                        <div style={{lineHeight : '0'}}><img src={shipped} className='pr-2'/> Nov. 29, 2018 - 4:30pm : Shipped</div>
                        <div style={{lineHeight : '0'}}><img src={delivered} className='pr-2'/> Nov. 29, 2018 - 4:30pm : Delivered</div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default SubViewProducer;