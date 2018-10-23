import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import {Switch, Redirect, Route, NavLink } from 'react-router-dom'
import PrimaryFact from './PrimaryFact'
import Biography from './Biography'
import * as API from '../../services/API'

class CardUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo : []
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        API.getUserId(id)
        .then((response) => {
            this.setState({
                userInfo : response.user
            })
        })
    }
    render() {
        const { userInfo } = this.state;
    console.log(userInfo)
    const user = {
            'name' : userInfo.full_name,
            'username' : userInfo.username,
            'role' : userInfo.type,
            'src' : userInfo.image_url === null ? require('../../assets/NoImage.png') : require('../../assets/ProfileUser.png'),
            'address' : userInfo.address,
            'contact' :  userInfo.contact_number,
            'status' :  userInfo.status,
            'bio' : 'Ako si Alberto. Isang peshirman nangagarap maging wrapper. Marunong ako mag wrap idol ko si Gloc 9, kaso sa hirap ng buhay isa lang akong mangengesda sa benguet. 29 na anak ang aking binubuhay. Panay isda lang ang amin nakakain. Pileng ko nga may hasang na ko. Pero ayos lang. Nakakain naman kami lagi ng Lobster, Lapu-lapu, Salmon. Marami pang iba eh, tuwing umaga Crab, sa tanghali naman Bay Eel .. tapos sa gabi Bluefin Tuna lang nakakain namin. Minsan lang kami nakain ng mamahalin na pagkain... kung susuwertehin tuyo. Paborito ko talaga iyon. ang sarap. *Crying* ang hirap ng buhay T_T.'
            ,
            'ratings' :  userInfo.rating === null ? '- -': userInfo.rating, 
            'sales' :  '****',
        };
        return (
            <div>
                <Col xs='12' md='12'>
            <div className='main-body'>
            <NavLink to='/mnguser' activeClassName='gback'>
                    &lang; &nbsp; Go Back
            </NavLink>
            </div>
                </Col>

            <Row className='main'>

            <Col xs='12' md='5' lg='3'>
            <div className='main-card'>
                <div className='card-body'>
                    <img className='card-img' src={user.src} alt={user.full_name}/>
                </div>
                <div className='card-footer'>
                    <ul>
                        <li>Informations</li>
                        <li><NavLink to={'/mnguser/user/' + userInfo.id} className='link'>Primary Facts</NavLink></li>
                        <li><NavLink to={'/mnguser/user/' +'bio/'+ userInfo.id } className='link'>Biography</NavLink></li>
                    </ul>
                </div>
            </div>
            </Col>
            <Col xs='12' md='7' lg='9'>
            <div className='main-side'>
            <Switch>
                <Route path={'/mnguser/user/' + userInfo.id} render={()=>(
                    <PrimaryFact user={user}/>
                )}/>
                <Route path={'/mnguser/user/' +'bio/'+ userInfo.id } render={()=>(
                    <Biography user={user}/>
                )}/>
                <Route render={()=>(
                    <Redirect to={'/mnguser/user/' + userInfo.id} />
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