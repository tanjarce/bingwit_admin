import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Banner from './Banner';
import CardUser from './CardUser'
import '../styles/manage.css'
class Maps extends Component {
    render() {
        return (
            <div>
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <CardUser/>
            </div>
        );
    }
}

export default Maps;