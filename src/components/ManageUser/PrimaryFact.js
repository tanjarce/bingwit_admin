import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { css } from 'react-emotion';

import moment from 'moment'
import { PulseLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class PrimaryFact extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { user } = this.props;
        // console.log(user.address)
        // var obj = JSON.parse(user.address);
        const obj = user ? JSON.parse(user.address) : ''
        console.log(obj)
        return (
            <div className='main-facts'>
                { user ? 
                <React.Fragment>
                <div className='space' >
                    <h4 className='font-weight-bold'>{user.full_name}</h4>
                    <p className='text-muted role'>{user.type}</p>
                </div>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Username:</Col>
                    <Col xs='auto'><span className='px-3 col'>{user.username}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs="2" className='d-inline align-top col'>Address:</Col>
                    <Col xs='auto'><span className='px-3 col'>{obj.street + ' ' + obj.barangay + ' ' + obj.municipality + ', ' + obj.province}</span></Col><br/>
                </Row>    
                <Row>
                    {user.area ? 
                    <React.Fragment>
                    <Col xs="2" className='d-inline align-top col'>Area:</Col>
                    <Col xs='auto'><span className='px-3 col'>{user.area.area_address}</span></Col>
                    </React.Fragment>: ''}<br/>
                </Row>
                <div className='space' />
                <Row>
                    <Col xs="2" className='d-inline col'>Contact:</Col>
                    <Col xs='auto'><span className='px-3 col'>{user.contact_number}</span></Col><br/>
                </Row>
                <Row>
                    <Col xs="2" className='d-inline col'>Status:</Col>
                    <Col xs='auto'><span className='px-3 col'>{user.status}</span></Col><br/>
                </Row>    
                <Row>
                    <Col xs="2" className='d-inline col'>Ratings:</Col>
                    <Col xs='auto'><span className='px-3 col'>{user.rating ? user.rating : '- -'}</span></Col><br/>
                </Row>    
                <Row>
                    <Col xs="2" className='d-inline col'>Member Since:</Col>
                    <Col xs='auto'><span className='px-3 col'>{moment(user.createdAt).format('MMMM D, YYYY')}</span></Col><br/>
                </Row>    
                    {/* <Col className='d-inline'>Total Sales: <span className='px-4'>&#8369; {user.sales}</span></Col> */}
                </React.Fragment> 
                :
                <PulseLoader
                className={override}
                sizeUnit={"px"}
                size={5}
                color={'#17C1BC'}
                loading={true}
              />
                }
            </div>
        );
    }
}

export default PrimaryFact;