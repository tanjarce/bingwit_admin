import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import * as permissions from '../permissions/permissions'

class CardUser extends Component {
    render() {
        return (
            <div className='main-card'>
            <div >
                <div className='card-body'>
                    <img className='card-img' src={permissions.user1.src} alt={permissions.user1.name}
                    />
                </div>
                <div className='card-footer'>
                    <ul>
                        <li>Informations</li>
                        <li><NavLink to='prim'>Primary Facts</NavLink></li>
                        <li><NavLink to='bio'>Biography</NavLink></li>
                        </ul>
                </div>
                </div>
            </div>
        );
    }
}

export default CardUser;