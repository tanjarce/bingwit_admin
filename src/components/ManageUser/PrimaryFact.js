import React, { Component, Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import { css } from 'react-emotion';
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
                    <Col xs='auto'><span className='px-3 col'>{user.address}</span></Col><br/>
                </Row>    
                <Row>
                    <Col xs="2" className='d-inline align-top col'>Area:</Col>
                    <Col xs='auto'><span className='px-3 col'>{user.Area ? user.Area.area_address : 'Null'}</span></Col><br/>
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