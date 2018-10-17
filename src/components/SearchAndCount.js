import React, { Component } from 'react';
import { Col } from 'reactstrap'
import Search from './Search'
import TotalCount from './TotalCount'
import * as API from '../services/API'

class SearchAndCount extends Component {
    constructor(props) {
    super(props)
    this.state = {
        count : ''
    }}
    
    componentDidMount(){
    API.getCountRules()
    .then((response) => {
        console.log(response)
        this.setState({
            count : response.count
        })
    })
    }
    render() {
        const { count } = this.state
        console.log(count)
        return (
                <div className='d-flex'>
                <Search />
                <Col></Col>
                <TotalCount count={count} />      
                </div>
        );
    }
}
export default SearchAndCount;