import React, { Component } from 'react';
import { Col, Row, Input } from 'reactstrap'
import '../styles/search.css'

import searchIco from '../assets/Search.svg'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue : ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
            },() => this.update()
        );
        
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.update();
        }
      }
      
    update(){
        const { updateTable } = this.props
        updateTable(this.state.searchValue)
    }

    render() {
        
        return (
            <Row className='main-search'>
                <Col xs='auto'>Search:</Col>
                <Col className='rel' xs='auto' >
                  <Input type='text' placeholder='Search something...' 
                  name='searchValue'
                  onChange={this.handleChange}
                  value={this.state.searchValue}
                  onKeyPress={this._handleKeyPress}
                  />
                  <img className='img' src={searchIco} alt='search'/>
                </Col>
            </Row>
        );
    }
}

export default Search;
