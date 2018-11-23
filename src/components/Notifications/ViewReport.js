import React, { Component } from 'react'
import { Col } from 'reactstrap';
import { withRouter, NavLink } from 'react-router-dom'
import '../../styles/rule.css'
import moment from 'moment'

class ViewReport extends Component {
    render() {
        const { selectedRow, viewItem } = this.props
        console.log(selectedRow)
        return (
            <div className='rule-body'>
                <Col xs='12' md='12'>
                <NavLink to='#' activeClassName='gback' onClick={viewItem}>
                        &lang; &nbsp; Go Back
                </NavLink>
                </Col>
                <Col>
                    <p>Consumer: {selectedRow.consumer.full_name}</p>
                    <p>Reported Seller: {selectedRow.producer.full_name}</p>
                    <p>Date Created: {moment(selectedRow.createdAt).format('MMMM D, YYYY')}</p><br/>
                    <p>{selectedRow.feedback}</p>
                </Col>
            </div>
        )
    }
}

export default withRouter(ViewReport)
