import React, { Component } from 'react';
import '../styles/search.css'

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
        updateTable(null, this.state.searchValue)
    }

    render() {
        
        return (
            // <Row className='main-search'>
                // {/* <Col xs='auto'>Search:</Col> */}
                // <Col className='rel' xs='auto' >
                //   <div>
                    <input type='text' placeholder='Search something...' 
                        name='searchValue'
                        onChange={this.handleChange}
                        value={this.state.searchValue}
                        onKeyPress={this._handleKeyPress}
                        className='inpt searchInput'    
                    />
                    // {/* <img className='img' src={searchIco} alt='search'/> */}
                // </div>
                // </Col>
            // </Row>
        );
    }
}

export default Search;
