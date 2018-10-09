import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Banner from './Banner';

import CardUser from './CardUser'
import * as permissions from '../permissions/permissions'

class Maps extends Component {
    render() {
        return (
            <div>
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <div className='main-body'>
                <NavLink to=''>
                    <span className='gback'>
                        &lang; &nbsp; Go Back
                    </span>
                </NavLink>
                <div>
                <CardUser/>
                </div>
                </div>
                </div>
        );
    }
}

export default Maps;