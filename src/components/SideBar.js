import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'

import SidebarItemLink from './SideItemLink'
import * as permissions from '../permissions/permissions'
import logo from '../assets/Bingwit.svg'
import * as Session from '../services/session'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false,
            iconSize: 60
        }

        this.isOpen = this.isOpen.bind(this)
        this.handleMobileLink = this.handleMobileLink.bind(this)
    }

    handleMobileLink() {
        const width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
        if (width < 500) {
            this.props.expand()
        }
    }
    isOpen() {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    render() {
        const { isOpen } = this.state;
        return (
            <div>
                <div className="area"></div>
                <nav className={isOpen ? "main-menu onexpand" : "main-menu"}>
                    <ul>
                        <li className="header">
                            <NavLink
                                className="noHover" 
                                to="#">
                                <i>
                                    <img
                                        className="nav-logo"
                                        src={logo}
                                        alt="Bingwit logo"/>
                                </i>
                                <span className="nav-header-text text-muted">
                                    Bingwit
                                </span>
                            </NavLink>
                        </li>
                        <li className="bars"
                            title="Menu"
                            onClick={this.isOpen}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                            <span className="bar-text">
                                Menu
                            </span>
                        </li>
                        {permissions.bingwitmenus.map(item => (
                            <SidebarItemLink menu={item} key={item.title} didNavigate={this.handleMobileLink}/>
                        ))}
                    </ul>

                    <ul className="logout">
                        <li>
                            <NavLink to='/logout' activeClassName="active" onClick={()=> {
                            Session.removeUser(null)}}>
                                <i className='fa'>
                                {permissions.logout.src}
                                </i>
                                <span className="nav-text">
                                    Logout
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Sidebar;