import React, { Component } from 'react';
import { Col, Row, Input } from 'reactstrap'

class Search extends Component {
    render() {
        return (
            <Row style={{
                display : 'inline-flex',
                alignItems : 'center',
                margin: '5px 0px',
                color : '#363636'
            }}>
                <Col xs='auto'>Search:</Col><Col ><Input type='text' placeholder='Search something...'/></Col>
            </Row>
        );
    }
}

export default Search;