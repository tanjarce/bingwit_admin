import React, { Component } from 'react';
import { Col, Row, Input } from 'reactstrap'
import '../styles/search.css'

import searchIco from '../assets/Search.svg'

class Search extends Component {

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            alert("Search Processed");
        }
      }
    render() {
        return (
            <Row className='main-search'>
                <Col xs='auto'>Search:</Col>
                <Col className='rel' xs='auto' >
                  <Input type='text' placeholder='Search something...' onKeyPress={this._handleKeyPress}/>
                  <img className='img' src={searchIco} alt='search'/>
                </Col>
            </Row>
        );
    }
}

export default Search;
