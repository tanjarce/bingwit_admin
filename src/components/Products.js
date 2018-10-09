import React, { Component } from 'react';
import Banner from './Banner';
import { Container } from 'reactstrap';

import * as API from 'services/API';
import ProductList from 'components/ProductList';

class Products extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            productArray: [] // product array
        }

        this.responseGetProducts = this.responseGetProducts.bind(this)
    }
    
    
    responseGetProducts (response) {
        this.setState({
            productArray: response.data.items
        })
    }
    componentDidMount () {
        API.getAllProducts()
        .then(response => {
            if (response.errors) return
            this.responseGetProducts(response)
        })
    }
    render() {
        const { productArray } = this.state
        return (
            <div>
                <Banner 
                    header="Products"
                    contents="Sample route nesting" 
                />
                <Container> 
                    <ProductList
                        items={productArray}/>
                </Container>
            </div>
        );
    }
}

export default Products;