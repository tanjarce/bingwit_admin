import React, { Component } from 'react';
import {  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Badge, Col } from 'reactstrap';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';

import { connect } from 'react-redux';
import { CartAction } from '../actions';

class FoodCard extends Component {
    render() {
        const { recipe, shouldAdd = true } = this.props
        const { add, remove } = this.props // redux actions
        return (
            <Col 
                sm="4"
            >
                <Card className="food-item">
                    <CardImg width="100%" src={recipe.image} alt={recipe.label}/>
                    <CardBody>
                        <CardTitle>{recipe.label}</CardTitle>
                        <CardSubtitle>{recipe.source}</CardSubtitle>
                        { shouldAdd && (
                            <Button size="sm" color="primary" onClick={() => {
                                add({item: recipe})
                            }}>
                                <FaShoppingCart/> Add to cart
                            </Button>
                        )}
                        { !shouldAdd && (
                            <Button size="sm" color="danger" onClick={() => {
                                remove({item: recipe})
                            }}>
                                <FaShoppingCart/> Remove to cart
                            </Button>
                        )}
                        <CardText>Health Labels:</CardText>
                        {recipe.healthLabels.map(label=> (
                            <Badge
                                color="info"
                                key={label}>
                                {label}
                            </Badge>
                        ))}
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        add: (data) => dispatch(CartAction.addToCart(data)),
        remove: (data) => dispatch(CartAction.removeFromCart(data))
    }
} 

export default connect(null, mapDispatchToProps)(FoodCard);