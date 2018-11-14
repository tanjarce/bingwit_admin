import React, { Component, Fragment } from 'react'
import { Container, Button, Col, Row  } from 'reactstrap';
import { withRouter, NavLink } from 'react-router-dom'
import '../../styles/rule.css'
import moment from 'moment'


class ViewReport extends Component{
    constructor(props){
        super(props)

        this.goBack = this.goBack.bind(this)
    }
    goBack (){
        this.props.history.goBack()
    }

    render(){
        const { selectedRow, viewTable } = this.props
        console.log(selectedRow)
        return (
            <div className='rule-body'>
                <Col xs='12' md='12'>
                <NavLink to='#' activeClassName='gback' onClick={viewTable}>
                        &lang; &nbsp; Go Back
                </NavLink>
                </Col>
                <Col>
                    <p>User: {selectedRow.User.full_name}</p>
                    <p>Date Created: {moment(selectedRow.createdAt).format('MMMM D, YYYY')}</p><br/>
                    <p>{selectedRow.feedback}</p>
                </Col>
            </div>
        )
    }
}

export default ViewReport 