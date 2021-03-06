import React, { Component } from 'react';
import { Col, Row } from 'reactstrap'
import Search from './Search'
import TotalCount from './TotalCount'

class SearchAndCount extends Component {

    render() {
        const { text, count, children } = this.props
        const childs = 
            children ?        
                children.length === undefined
                ? children
                : children.map((child, indx) => child)
                : ''
        return (
                <div className="tableTop_container">
                    <Row>
                    <Col xs={children === undefined ? '' : '12'}>
                    <div className="tableTop_row">
                        <Search updateTable={this.props.updateTable} />
                        {childs}
                    </div>
                    </Col>
                    <Col xs='auto' className='align-self-end ml-auto'>
                        <TotalCount text={text}  count={count}/>      
                    </Col>
                    </Row>
                </div>
            
                
                // <div className="tableTop_container">
                //     <div className="tableTop_row">
                //         <Search updateTable={this.props.updateTable} />
                //         {childs}
                //     </div>
                //     <div className="tableTop_row">
                //         <TotalCount text={text}  count={count}/>      
                //     </div>
                // </div>
        );
    }
}
export default SearchAndCount;