import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import {Switch, Redirect, Route, NavLink } from 'react-router-dom'

import PrimaryFact from './PrimaryFact'
import Transaction from './Transaction'

import * as API from '../../services/API'
import NoImage from '../../assets/NoImage.png'

import * as Help from '../../toastify/helpers'

class CardUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo : '',
            type : '',
            prevPath : ''
        }
        this.goBack = this.goBack.bind(this)
    }
    componentWillMount(){
        this.setState({
            prevPath : this.props.prevPath.pathname
        })
        const id = this.props.match.params.id
        API.getUserId(id)
        .then((response) => {
            response.success ?
            this.setState({
                userInfo : response.user,
                type : response.user.type
            })
            :
            Help.toastPop({message: response.error.message, type: 'error'})
        })
    }
    goBack (){
        const { prevPath } = this.state
        // this.props.history.goBack())
        this.props.history.push( prevPath ? prevPath : '/mnguser/users' )
        //
    }
    render() {
    const id = this.props.match.params.id
    const { userInfo, type } = this.state;
        return (
            <div>
            <Col xs='12' md='12'>
        <div className='main-body'>
        <NavLink to='#' onClick={this.goBack} className='gback'>
                &lang; &nbsp; Go Back
        </NavLink>
        </div>
            </Col>

        <Row className='main'>

        <Col xs='12' md='6' lg='3'>
        <div className='main-card'>
            <div className='card-body'>
                <img className='card-img' src={userInfo.image_url ? userInfo.image_url : NoImage } alt={userInfo.full_name}/>
            </div>
            <div className='card-footer'>
                <ul>
                    <li>Informations</li>
                    <li><NavLink to={`/mnguser/users/${userInfo.id}/prim`} className='link'>Primary Facts</NavLink></li>
                    {type !== 'admin' && 
                    <li><NavLink to={`/mnguser/users/${userInfo.id}/transaction`} onClick={this.getTransaction} className='link'>Transactions</NavLink></li>
                    }
                </ul>
            </div>
        </div>
        </Col>
        <Col xs='12' md='6' lg='9'>
        <div className='main-side'>
        <Switch>
            <Route exact path={`/mnguser/users/:id/prim`} render={()=>(
                <PrimaryFact user={userInfo}/>
            )}/>
            {type !== 'admin' &&
            <Route path={'/mnguser/users/:id/transaction'}render={()=>(
                <Transaction userTransaction={userInfo}/>
            )}/>
            }
            <Route render={()=>(
            <Redirect to={`/mnguser/users/${id}/prim`} />
            )}/>

        </Switch>
        </div>
        </Col>
        </Row>
        </div> 
        );
    }
}

export default CardUser;
