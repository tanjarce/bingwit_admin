import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Banner from './Banner.js';
import FoodList from './FoodList.js';

import { connect } from 'react-redux';

class Cart extends Component {
    render() {
        const { cart : { items } } = this.props
        return (
            <div>
                <Banner 
                    header="Cart"
                    contents="Your items will be displayed here." 
                />
                <Container>
                    <FoodList foodItems={items} addMode={false} placeholder="Cart items are displayed here."/>
                </Container>
            </div>
        );
    }
}
function mapStateToProps ({cart}) {
    return {cart}
}

export default connect(mapStateToProps, null)(Cart)