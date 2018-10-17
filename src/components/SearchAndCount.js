import React, { Component } from 'react';
import { Col } from 'reactstrap'
import Search from './Search'
import TotalCount from './TotalCount'

class SearchAndCount extends Component {
    render() {
        const { count } = this.props
        return (
                <div className='d-flex'>
                <Search />
                <Col></Col>
                <TotalCount count={count}/>      
                </div>
        );
    }
}
export default SearchAndCount;