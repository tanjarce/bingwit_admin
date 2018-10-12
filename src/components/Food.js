import React, { Component } from 'react';
import { connect } from 'react-redux';

import Banner from './Banner.js';
import { Container } from 'reactstrap';

import FoodSearch from './FoodSearch.js';
import FoodList from './FoodList.js';

class Food extends Component {
    
    render() {
        const { food : { foodItems } } = this.props
        return (
            <div>
                <Banner 
                    header="Food Recipes"
                    contents="High quality food at it's best." 
                />
                <Container> 
                    <FoodSearch 
                        didChangeQuery={(query) => {
                            this.props.updateQuery({value: query})
                        }}
                        didSearch={() => {
                            this.toggleLoading(true)
                        }}
                        hasResult={(items) => {
                            this.toggleLoading(false)
                            this.props.updateItems({items: items})
                        }}/>
                    <FoodList foodItems={foodItems}/>
                    
                </Container>
            </div>
        );
    }
}

function mapStateToProps ({food}) {
    return {food}
}

export default connect(mapStateToProps, null)(Food)