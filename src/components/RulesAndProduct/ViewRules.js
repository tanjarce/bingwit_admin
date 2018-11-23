import React, { Component } from 'react'
import { Col } from 'reactstrap';
import { withRouter, NavLink } from 'react-router-dom'
import '../../styles/rule.css'
import moment from 'moment'

class ViewRules extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { selectedRow } = this.props
        console.log(selectedRow)
        return (
            <div className='rule-body'>
                <Col xs='12' md='12'>
                <NavLink to='/list' activeClassName='gback'>
                        &lang; &nbsp; Go Back
                </NavLink>
                </Col>
                <Col>
                    <p>Date Created: {moment(selectedRow.createdAt).format('MMMM D, YYYY')}</p>
                    <p>{selectedRow.description}</p>
                </Col>
            </div>
        )
    }
}

export default withRouter(ViewRules)
