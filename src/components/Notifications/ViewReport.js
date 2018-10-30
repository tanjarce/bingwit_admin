import React, { Component } from 'react'
import { Container, Button, Col, Row  } from 'reactstrap';
import { withRouter, NavLink } from 'react-router-dom'
import '../../styles/rule.css'
import moment from 'moment'

class ViewReport extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { selectedRow } = this.props
        console.log(selectedRow)
        return (
            <div className='rule-body'>
                <Col xs='12' md='12'>
                <NavLink to='/notif/feedback' activeClassName='gback'>
                        &lang; &nbsp; Go Back
                </NavLink>
                </Col>
                <Col>
                    <p>Sender: {selectedRow.consumer.full_name}</p>
                    <p>Reported User: {selectedRow.producer.full_name}</p>
                    <p>Date Created: {moment(selectedRow.createdAt).format('MMMM D, YYYY')}</p>
                    <p>{selectedRow.feedback}</p>
                </Col>
            </div>
        )
    }
}

export default withRouter(ViewReport)
