import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
// import { connect } from 'react-redux'
import FoodCard from './FoodCard';

class FoodList extends Component {
    render() {
        const { foodItems, addMode = true, placeholder = "Start by searching popular food ingredient" } = this.props
        return (
            <div>
                {foodItems.length === 0 && (
                    <Col>
                        <br />
                        <p className="text-center">{placeholder}</p>
                    </Col>
                )}
                {foodItems.length !== 0 && (
                    <div>
                        <br />
                        <p className="text-center">
                            Showing <strong>{foodItems.length}</strong> results 
                        </p>
                        <Row>
                            {foodItems.map((recipe, index) => (
                                <FoodCard key={index} recipe={recipe} shouldAdd={addMode}/>
                            ))}
                        </Row>      
                    </div>
                )}
            </div>
        );
    }
}

export default FoodList;