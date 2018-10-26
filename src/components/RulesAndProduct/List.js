import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Tabs from '../Tabs'
import Rules from './Rules'
import Products from './Products'
import Banner from '../Banner'
import ViewProduct from './ViewProduct'
import ProductModal from '../../modals/ProductModal'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
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
                    productRow: res.product_type.rows
                }))
            }
            // console.log(res)
            return res.product_type.rows
        })
        // .then(res => console.log(res))
        .catch(err => {
            Help.toastPop({message: err, type: 'error'})
        })
    }

    // componentWillMount () {
    //     // if(this.props.location.pathname === '/list/products'){
    //         this.getAllProduct()
    //     // }
    // }

    render() {
        const tabs = [
            {'text': 'Rules', 'url': '/list/rules'},
            {'text': 'Products', 'url': '/list/products'},
        ]
        
        const { isOpen, productCount, productRow } = this.state

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
                            <Products productCount={productCount} productRow={productRow} getAllProduct={this.getAllProduct}/>
                        )}/>
                        <Route path="/list/products/view/:id" component={ ViewProduct } />
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
