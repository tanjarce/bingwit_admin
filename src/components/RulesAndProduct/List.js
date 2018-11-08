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
            pagination: {
                offset: 0,
                limit: 10
            },
            searchQ: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.getAllProduct = this.getAllProduct.bind(this)
        this.resetPaginationAndSearch = this.resetPaginationAndSearch.bind(this) 
        this.updateQuery = this.updateQuery.bind(this)
    }
    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }
    resetPaginationAndSearch () {
        this.setState(()=>({
            pagination: {
                offset: 0,
                limit: 10
            },
            searchQ: ''
        }))
    }

    updateQuery(paginationData, searchQData){
        // if there is NO inputed in search box the searchData from parent component will remain
        // else searchData will update and it will pass 0 to offset to search all the data
        this.setState((prevState)=>({
            searchQ: (typeof searchQData !== 'undefined') ? searchQData.trim() : prevState.searchQ,
            pagination: paginationData ? {...paginationData} : (typeof searchQData !== 'undefined')
                ? {...prevState.pagination, offset: 0} : prevState.pagination 
        }))
    }
    

    getAllProduct(paginationData, searchQData) {
        this.setState({
            isLoading: true
        })
        this.updateQuery(paginationData, searchQData)
        setTimeout(()=>{
            const { pagination, searchQ } = this.state 
            
            const data =  {
                searchQ : searchQ,
                ...pagination
            }
                
            API.getAllProductTypes(data)
            .then(res => {
                if(res.success){
                    this.setState(()=>({
                        productCount: res.product_type.count,
                        productRow: res.product_type.rows,
                        isLoading: false
                    }))
                }
                return res.product_type.rows
            })
            .catch(err => {
                this.setState(()=>({
                    isLoading: false
                }))
                Help.toastPop({message: err, type: 'error'})
            })
        },10)
    }

    render() {
        const tabs = [
            {'text': 'Rules', 'url': '/list/rules'},
            {'text': 'Products', 'url': '/list/products'},
            {'text': 'Product Categories', 'url': '/list/product_categories'},
            {'text': 'Areas', 'url': '/list/areas'},
        ]
        
        const {isLoading, isOpen, productCount, productRow, pagination, searchQ } = this.state

        return (
            <div className='bottom-pad'>
                <ProductModal isOpen={isOpen}  getAllProduct={this.getAllProduct} toggle={this.toggleModal}  type="add" />
                <Banner 
                    header="List of Rules &amp; Products"
                    contents="Contains information about rules and products." 
                />
                <Container>
                    <Tabs links={tabs} resetPaginationAndSearch={this.resetPaginationAndSearch}>
                        {
                            (this.props.location.pathname === '/list/products') && 
                            <Button color="primary" className="ml-auto" size="sm" onClick={this.toggleModal}>Add Product</Button>
                        }
                    </Tabs>
                    <Switch>
                        // RULES
                        <Route path="/list/rules" render={()=>(
                            <Rules updateQuery={this.updateQuery} searchQ={searchQ} pagination={pagination}/>
                        )}/>
                        // PRODUCTS
                        <Route exact path="/list/products" render={()=>(
                            <Products isLoading={isLoading} productCount={productCount} paginationData={pagination} productRow={productRow} getAllProduct={this.getAllProduct}/>
                        )}/>
                        <Route path="/list/products/view/:id" component={ ViewProduct } />
                        // AREAS
                        <Route exact path="/list/areas" render={()=>(
                            <Areas updateQuery={this.updateQuery} searchQ={searchQ} pagination={pagination}/>
                        )}/>
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
