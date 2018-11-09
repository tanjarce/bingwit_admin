import React, { Component, Fragment } from 'react'
import {Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { withRouter, NavLink } from 'react-router-dom'

import * as API from '../../services/API'
import moment from 'moment'

class ViewProduct extends Component{
    constructor(props){
        super(props)
        this.state = {
            productName : {},
            aliases: []

        }

        this.goBack = this.goBack.bind(this)
    }

    componentDidMount(){
        const id = this.props.match.params.id

        API.getProductType(id)
            .then(res => {
                if(res.success){
                    this.setState((prevState)=>({
                        productName: res.product_type
                    }))
                    API.getAliasName(id)
                        .then(res => {
                            if(res.success){
                                this.setState((prevState)=>({
                                    aliases: res.aliases
                                }))
                            }
                        })
                }
            }).catch(err => console.log(err))
    }

    goBack (){
        this.props.history.goBack()
    }

    render(){
        const momentFormat = (data) => moment(data).format('MMMM D, YYYY')
        const { match } = this.props
        const { productName, aliases } = this.state

        const aliasesList = aliases.length ? aliases.map(alias => {
            return(
                <li key={alias.id}>
                    <p className="font-weight-normal m-0">{alias.alias}</p>
                    <small className=" text-muted">Created: {momentFormat(alias.createdAt)} · Updated: {momentFormat(alias.updatedAt)}</small>
                </li>
            ) 
        }) : <div>No Alias</div>

        return(
            <div className='rule-body'>
                {/* <span onClick={this.goBack} >&lang; Go Back</span> */}
                <Col xs='12' md='12' className="pb-3">
                        
                        <NavLink to="#" activeClassName='gback' onClick={e => {
                            e.preventDefault()
                            this.goBack()
                        }}>
                            &lang; &nbsp; Go Back
                        </NavLink>
                </Col>
                <Col>

                        <h4 className="text-capitalize">Product Name: <span >{productName.name}</span></h4>
                        <p className="text-muted mb-3">Created: {momentFormat(productName.createdAt)}</p>
                        <hr/>
                        <p className="m-0 mb-2">Product Aliases:</p>
                        <ul>
                            { aliasesList }
                        </ul>
                </Col>
            </div>
        )
    }
}

export default ViewProduct