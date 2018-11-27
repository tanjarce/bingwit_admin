import React, {Component} from 'react'
import { Row, Col, Input, Button } from 'reactstrap';

class ViewAnnouncement extends Component{
    render(){
        return(
            <div className='border'>
                <div className='header px-3 py-1'>
                <Row>
                    <Col xs='auto'>Announcement</Col>
                </Row>
                </div>
            <div className='m-3'>
                <div>
                    <Row>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>Title:</Col>
                                <Col>
                                Update Features v2.23
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>To:</Col>
                                <Col>
                                All
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>From:</Col>
                                <Col>
                                CDI_ADMIN
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>Date:</Col>
                                <Col>
                                October 3, 2018
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12'>
                        <hr/>
                        <div  className='my-1'>
                            <div className='text-justify px-3' style={{height : '200px', overflowY : 'auto'}}>
                            <p>
                            I. Major features fixed
                            1. Announcement – Changes in duration of active time, The previous time was 8 seconds and it was changed to 5 seconds. The style of bar is fixed. It’s compatible for any version of android and iOS.
                            <br/><br/>
                            2. Rules – All rules is updated. Please spend time to read it.
                            <br/><br/>
                            II. New Features was added.
                            <br/><br/>
                            18 Super features: Wave sensor for browsing products, Products scanner, AI for tutorials, Online Wallet, Auto-fishing for producers, Fish sensor for better catch, Black market, Anti-virus, System Clean-up, Dynamite fishing, Tutorials for Dark fising : Dynamite, Super spiking net, Vaccum, Lightning Saga, etc...
                            </p>
                            </div>
                        </div>
                        </Col>
                        <Col xs='12'>
                        <Row>
                        <Col/>
                        </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            </div>
        );
    }
}
export default ViewAnnouncement