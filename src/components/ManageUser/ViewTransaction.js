import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'

class ViewTransaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo : ''
        }
    }
    componentDidMount(){
        this.setState({
            userInfo : this.props.userTransaction
        })
    }
    render() {
        const { userInfo } = this.state
        console.log(userInfo)
        return (
            <React.Fragment>
                <div className='space' >
                    <h4 className='font-weight-bold'>USERNAME</h4>
                    <p className='text-muted role'>{userInfo.full_name}</p>
                </div>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Tracking No:</Col>
                    <Col xs='auto'><span className='px-3 col'>JNBHGUHNJ-33HUB-N8NHB-0CVBGHH</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Date Created:</Col>
                    <Col xs='auto'><span className='px-3 col'>November 26, 2018</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>Total Amount:</Col>
                    <Col xs='auto'><span className='px-3 col'>PHP 1,000.00</span></Col><br/>
                </Row>
                <Row>
                    <Col xs='2' className='d-inline align-top col'>No. of products:</Col>
                    <Col xs='auto'><span className='px-3 col'>3</span></Col><br/>
                </Row>
            </React.Fragment>
        );
    }
}

export default withRouter(ViewTransaction);