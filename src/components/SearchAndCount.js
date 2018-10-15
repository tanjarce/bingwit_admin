import React, { Component } from 'react';
import { Col } from 'reactstrap'
import Search from './Search'
import TotalCount from './TotalCount'

class SearchAndCount extends Component {
    render() {
        return (
                <div className='d-flex'>
                <Search />
                <Col></Col>
                <TotalCount />      
                </div>
        );
    }
}
export default SearchAndCount;