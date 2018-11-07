import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import {Switch, Redirect, Route, NavLink } from 'react-router-dom'
import PrimaryFact from './PrimaryFact'
import Transaction from './Transaction'
import * as API from '../../services/API'
import NoImage from '../../assets/NoImage.png'

import { css } from 'react-emotion';
import { PulseLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class CardUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo : '',
            type : ''
        }
        this.goBack = this.goBack.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        console.log(id)
        API.getUserId(id)
        .then((response) => {
            response.success === 'false' ?
            console.log(response.error.message)
            :
            this.setState({
                userInfo : response.user,
                type : response.user.type
            })
        })
    }
    goBack (){
        this.props.history.goBack()
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
                    <li><NavLink to={`/mnguser/${id}/prim`} className='link'>Primary Facts</NavLink></li>
                    <li><NavLink to={`/mnguser/${id}/transaction`} className='link'>Transactions</NavLink></li>
                </ul>
            </div>
        </div>
        </Col>
        <Col xs='12' md='6' lg='9'>
        <div className='main-side'>
        <Switch>
            <Route exact path={`/mnguser/:id/prim`} render={()=>(
                <PrimaryFact user={userInfo}/>
                )}/>
            {type ? type  === 'consumer'?
            <Route path={'/mnguser/:id/transaction'}render={()=>(
                <Transaction userTransaction={userInfo}/>
            )}/>
                :
                type !== 'admin' ?
                    <Route path={'/mnguser/:id/transaction'}render={()=>(
                        <div>PRODUCER TRANSACTIONS</div>
                        )}/>
                        :
                        <Route path={'/mnguser/:id/transaction'}render={()=>(
                            <div>Nothing to do here.</div>
                            )}/>
            
            :
            <PulseLoader
            className={override}
            sizeUnit={"px"}
            size={5}
            color={'#17C1BC'}
            loading={true}
          />}

            <Route render={()=>(
                <Redirect to={`/mnguser/${id}/prim`} />
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
