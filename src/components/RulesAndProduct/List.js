import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Tabs from '../Tabs'
import Rules from './Rules'
import Products from './Products'
import Areas from './Areas'
import Banner from '../Banner'
import ViewProduct from './ViewProduct'
import ViewArea from './ViewArea'
import ProductModal from '../../modals/ProductModal'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            isOpen: false,
            productCount: 0,
            productRow: [],
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.getAllProduct = this.getAllProduct.bind(this)
    }
    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }

    getAllProduct() {
        API.getAllProductTypes()
        .then(res => {
            if(res.success){
                // console.log(res)
                this.setState(()=>({
                    productCount: res.product_type.count,
                    productRow: res.product_type.rows,
                    isLoading: false
                }))
            }
            // console.log(res)
            return res.product_type.rows
        })
        // .then(res => console.log(res))
        .catch(err => {
            this.setState(()=>({
                isLoading: false
            }))
            Help.toastPop({message: err, type: 'error'})
        })
    }

    render() {
        const tabs = [
            {'text': 'Rules', 'url': '/list/rules'},
            {'text': 'Products', 'url': '/list/products'},
            {'text': 'Areas', 'url': '/list/areas'},
        ]
        
        const {isLoading, isOpen, productCount, productRow } = this.state

        return (
            <div className='bottom-pad'>
                <ProductModal isOpen={isOpen}  getAllProduct={this.getAllProduct} toggle={this.toggleModal}  type="add" />
                <Banner 
                    header="List of Rules &amp; Products"
                    contents="Contains information about rules and products." 
                />
                <Container>
                    <Tabs links={tabs}>
                        {
                            (this.props.location.pathname === '/list/products') && 
                            <Button color="primary" className="ml-auto" size="sm" onClick={this.toggleModal}>Add Product</Button>
                        }
                    </Tabs>
                    <Switch>
                        <Route path="/list/rules" render={()=>(
                            <Rules />
                        )}/>
                        <Route exact path="/list/products" render={()=>(
                            <Products isLoading={isLoading} productCount={productCount} productRow={productRow} getAllProduct={this.getAllProduct}/>
                        )}/>
                        <Route exact path="/list/areas" render={()=>(
                            <Areas isLoading={isLoading} areaCount={productCount} areaRow={productRow} getAllArea={this.getAllArea}/>
                        )}/>
                        <Route path="/list/products/view/:id" component={ ViewProduct } />
                        <Route path="/list/areas/view/:id" component={ ViewArea } />
                        <Route render={()=>(
                            <Redirect to="/list/rules" />
                        )}/>
                    </Switch>
                </Container>
            </div>
        )
    }
}

export default withRouter(List)
