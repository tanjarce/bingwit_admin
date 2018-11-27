import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Tabs from '../Tabs'
import Rules from './Rules'
import Products from './Products'
import Categories from './Categories'
import Areas from './Areas'
import Banner from '../Banner'
import ViewProduct from './ViewProduct'
import ViewArea from './ViewArea'
import ViewCategory from './ViewCategory'
import * as API from '../../services/API'

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            isOpen: false,
            optionCategory: [],
            searchQ: '',
            category: '',
            pagination: {
                offset: 0,
                limit: 10
            },
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.resetQueries = this.resetQueries.bind(this) 
        this.updateQuery = this.updateQuery.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.getAllCategory = this.getAllCategory.bind(this)
    }

    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }
    
    resetQueries () {
        this.setState(()=>({
            searchQ: '',
            category: '',
            pagination: {
                offset: 0,
                limit: 10
            },
        }))
    }

    updateCategory(value, func){
        this.setState(()=>({
            category: value
        }), ()=>{ 
            func() 
        })
    }

    updateQuery(paginationData, searchQData, func){
        // if there is NO inputed in search box the searchData from parent component will remain
        // else searchData will update and it will pass 0 to offset to search all the data
        // callback function will be triggered after apdating the states that is used for querying

        this.setState((prevState)=>({
            searchQ: (typeof searchQData !== 'undefined') ? searchQData.trim() : prevState.searchQ,
            pagination: paginationData ? {...paginationData} : (typeof searchQData !== 'undefined')
                ? {...prevState.pagination, offset: 0} : prevState.pagination
        }), ()=>{
            // console.log(this.state.pagination)
            func()
        })
    }

    getAllCategory () {
        API.getAllCategories()
            .then(res => {
                const optionCategory = res.category.rows.map(category => 
                    <option key={category.id} value={category.id} >{category.name}</option>
                )
                if(res.success){
                    this.setState(()=>({
                        optionCategory 
                    }))
                }
            })
    }

    componentDidMount(){
        this.getAllCategory()
    }

    render() {
        const tabs = [
            {'text': 'Rules', 'url': '/list/rules'},
            {'text': 'Products', 'url': '/list/products'},
            {'text': 'Product Categories', 'url': '/list/product_categories'},
            {'text': 'Areas', 'url': '/list/areas'},
        ]
        
        const {category, pagination, searchQ, optionCategory} = this.state

        return (
            <div className='bottom-pad'>
                {/* <ProductModal isOpen={isOpen} optionCategory={optionCategory} getAllProduct={this.getAllProduct} toggle={this.toggleModal}  type="add" /> */}
                <Banner 
                    header="List of Rules &amp; Products"
                    contents="Contains information about rules and products." 
                />
                <Container>
                    <Tabs links={tabs} resetPaginationAndSearch={this.resetQueries} />
                    <Switch>
                        <Route path="/list/rules" render={()=>(
                            <Rules 
                                updateQuery={this.updateQuery} 
                                searchQ={searchQ}
                                pagination={pagination}/>
                        )}/>
                        <Route exact path="/list/products" render={()=>(
                            <Products 
                                updateQuery={this.updateQuery} 
                                updateCategory={this.updateCategory} 
                                optionCategory={optionCategory}
                                searchQ={searchQ}
                                category={category}
                                pagination={pagination}/>
                        )}/>
                        <Route path="/list/products/view/:id" component={ ViewProduct } />
                        <Route exact path="/list/areas" render={()=>(
                            <Areas updateQuery={this.updateQuery} searchQ={searchQ} pagination={pagination}/>
                        )}/>
                        <Route path="/list/areas/view/:id" component={ ViewArea } />
                        <Route exact path="/list/product_categories" render={()=>(
                            <Categories updateQuery={this.updateQuery} optionCategory={optionCategory} getAllCategory={this.getAllCategory} searchQ={searchQ} pagination={pagination}/>
                        )}/>
                        <Route path="/list/product_categories/view/:id" render={ ()=>(
                            <ViewCategory getAllCategory={this.getAllCategory}/>
                        ) } />
                        
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
