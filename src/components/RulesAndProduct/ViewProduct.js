import React, { Component } from 'react'
// import { Container, Button, Col, Row  } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import '../../styles/rule.css'
import * as API from '../../services/API'
import moment from 'moment'

class ViewProduct extends Component{
    constructor(props){
        super(props)
        this.state = {
            productName : {},
            aliases: [],
            loading: true
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
                    }), ()=>{console.log(this.state.productName)})
                    API.getAliasName(id)
                        .then(res => {
                            if(res.success){
                                this.setState((prevState)=>({
                                    aliases: res.aliases,
                                    loading: false
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
        const { productName, aliases, loading } = this.state

        const aliasesList = aliases.length ? aliases.map(alias => {
            return(
                <li key={alias.id}>
                    <p className="font-weight-normal m-0">{alias.alias}</p>
                    <small className=" text-muted">Created: {momentFormat(alias.createdAt)} · Updated: {momentFormat(alias.updatedAt)}</small>
                </li>
            ) 
        }) : <div>No Alias</div>

        return(
            loading 
            ?<div>loading...</div> 
            :<div className='rule-body'> 
                <div className="my-3">
                    <NavLink to='#' activeClassName='gback' className="my-3" onClick={ (e)=>{
                        e.preventDefault()
                        this.goBack()
                    }}>
                        &lang; &nbsp; Go Back
                    </NavLink>
                </div>
                <div>
                    <h4 className="text-capitalize">Product Name: {productName.name}</h4>
                    <h5 className="text-capitalize">Category: {productName.product_category.name}</h5>
                    <p className="text-muted my-2">Created: {momentFormat(productName.createdAt)}</p>
                    <hr/>
                    <p className="m-0 mb-2">Product Aliases:</p>
                    <ul>
                        { aliasesList }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ViewProduct