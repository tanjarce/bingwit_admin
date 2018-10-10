import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import * as permissions from '../permissions/permissions'
import Banner from './Banner';

class Rules extends Component {
    render() {
        return (
            <div>
                <Banner 
                header="Rules"
                contents="List of rules that has been set." />
                <div className='all_padding'>
                
            </div>
        </div>
        );
    }
}

export default Rules;
