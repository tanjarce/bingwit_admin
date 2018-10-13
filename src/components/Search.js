import React, { Component } from 'react';
import { Col, Row, Input } from 'reactstrap'
import '../styles/search.css'
import searchIco from '../assets/Search.svg'

class Search extends Component {
    render() {
        return (
            <Row className='main-search border'>
                <Col xs='auto'>Search:</Col>
                <Col className='rel' xs='auto' >
                  <Input type='text' placeholder='Search something...' />
                  <img className='img' src={searchIco} alt='search'/>
                </Col>
            </Row>
        );
    }
}

export default Search;
