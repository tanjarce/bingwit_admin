import React, {Component} from 'react'
import { Row, Col, Input, Button } from 'reactstrap';

class Compose extends Component{
    render(){
        return(
            <div className='border'>
                        <div className='header px-3 py-1'> Compose</div>
                        <div className='m-3'>
                            <div>
                                <Row>
                                    <Col xs='12' className='my-1'>
                                        <Row>
                                            <Col xs='1' className='my-auto'>To:</Col>
                                            <Col>
                                            <Input type='text' placeholder='Write something...' />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs='12' className='my-1 mt-3'>
                                        <Row>
                                            <Col>
                                            <Input type='text' placeholder='Title' />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs='12'>
                                    <div  className='my-1'>
                                        <Input type='textarea' placeholder='Write something...' style={{height : '200px'}} />
                                    </div>
                                    </Col>
                                    <Col xs='12'>
                                    <Row>
                                        <Col/>
                                        <Col xs='auto'>
                                        <div  className='mx-1 mt-5'>
                                            <Button className='button_announcement_clear'>Clear</Button>
                                            <Button className='button_announcement_post'>Post</Button>
                                        </div>
                                        </Col>
                                    </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
        );
    }
}
export default Compose