import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import {Switch, Redirect, Route, NavLink } from 'react-router-dom'
import * as permissions from '../permissions/permissions'
import PrimaryFact from './PrimaryFact'
import Biography from './Biography'
class CardUser extends Component {
    render() {
        return (
            <div>
                <Col xs='12' md='12'>
            <div className='main-body'>
            <NavLink to='' activeClassName='gback'>
                    &lang; &nbsp; Go Back
            </NavLink>
            </div>
                </Col>

            <Row className='main'>

            <Col xs='12' md='5' lg='3'>
            <div className='main-card'>
                <div className='card-body'>
                    <img className='card-img' src={permissions.user1.src} alt={permissions.user1.name}
                    />
                </div>
                <div className='card-footer'>
                    <ul>
                        <li>Informations</li>
                        <li><NavLink to='/mnguser/prim' className='link'>Primary Facts</NavLink></li>
                        <li><NavLink to='/mnguser/bio' className='link'>Biography</NavLink></li>
                    </ul>
                </div>
            </div>
            </Col>

            <Col xs='12' md='7' lg='9'>
            <div className='main-side'>
            <Switch>
                <Route path='/mnguser/prim' render={()=>(
                            <PrimaryFact user={permissions.user1}/>
                        )}/>
                <Route path='/mnguser/bio' render={()=>(
                            <Biography user={permissions.user1}/>
                        )}/>
                <Route render={()=>(
                            <Redirect to="/mnguser/prim" />
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