import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Media, Row, Col } from 'reactstrap';

class ProductList extends Component {
    render() {
        const { items } = this.props
        return (
            <div>
                {items.map((item, idx) => (
                    <Row key={idx}>
                        <Col>
                            <Media className="mt-1">
                                <Media left middle>
                                <Media className="product-img" object src={item.imageUrl} alt={item.name} />
                                </Media>
                                <Media body>
                                <Media heading>
                                    {item.name}
                                </Media>
                                    {item.description ? item.description : "No description at the moment."}
                                </Media>
                            </Media>
                            {/* <div className="divider"></div> */}
                            <br />
                        </Col>
                    </Row>
                ))}
            </div>
        );
    }
}

ProductList.propTypes = {
    items: PropTypes.array.isRequired
};

export default ProductList;