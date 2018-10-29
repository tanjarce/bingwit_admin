import React, { Component, Fragment } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

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
            <Fragment>
                <Button className="my-3" onClick={this.goBack} >back</Button>
                <Card>
                    <CardBody>
                        <CardTitle className="font-weight-bold text-capitalize">{productName.name}</CardTitle>
                        <CardSubtitle className="text-muted mb-3">Created: {momentFormat(productName.createdAt)}</CardSubtitle>
                        <hr/>
                        <p className="m-0 mb-2 font-weight-bold">Alias Names:</p>
                        <ul>
                            { aliasesList }
                        </ul>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}

export default ViewProduct