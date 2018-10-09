import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SignOut from 'react-icons/lib/fa/sign-out'
import Cart from 'react-icons/lib/fa/shopping-cart'


import cdiLogo from '../assets/logo-small.svg'

import '../styles/Sidebar.css'
import SidebarItemLink from './SidebarItemLink';

class SideBar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            iconSize: 60
        }
        
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
    render() {
        const { onLogOut, menus, onexpand } = this.props
        return (
            <div>
                <div className="area"></div>
                <nav className={onexpand ? "main-menu onexpand" : "main-menu"}>
                    <ul>
                        <li className="header">
                            <NavLink
                                className="noHover" 
                                to="/dashboard">
                                <i className='fa'>
                                {/* style={{width: this.state.iconSize + 'px'}} */}
                                    <img
                                        className="nav-logo"
                                        src={cdiLogo}
                                        alt="cdi logo"/>
                                </i>
                                <span className="nav-header-text">
                                    ReactJS - BoilerPlate
                                </span>
                            </NavLink>
                        </li>
                        <li className="bars"
                            title="Menu"
                            onClick={this.props.expand}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                            <span className="bar-text">
                                Menu
                            </span>
                        </li>
                        {menus.map(item => (
                            <SidebarItemLink menu={item} key={item.title} didNavigate={this.handleMobileLink}/>
                        ))}
                    </ul>

                    <ul className="logout">
                        <li>
                            <NavLink to='/cart' activeClassName="active">
                                <i className='fa'>
                                    <Cart/>
                                </i>
                                <span className="nav-text">
                                    View Cart
                                </span>
                            </NavLink>
                        </li>
                        <li>
                        <a href="#logout" onClick={() => {
                            this.handleMobileLink()
                            onLogOut()
                        }}>
                                <i className="fa">
                                    <SignOut />
                                </i>
                                <span className="nav-text">
                                    Logout
                                </span>
                            </a>
                        </li>  
                        <li>
                            <a href="http://codedisruptors.com" rel="noopener noreferrer" target="_blank" style={{height: "60px"}} title="Official CDI Website"
                                onClick={this.handleMobileLink}>
                                <i className='fa'>
                                    <img
                                        className="nav-logo"
                                        src={cdiLogo}
                                        style={{
                                            width: "28px"
                                        }}
                                        alt="CODE DISRUPTORS, INC."/>
                                </i>
                                <div className="rights-container">
                                    <p style={{margin: 0, fontSize: "12px"}}>
                                        powered by:
                                    </p>
                                    <p className="rights">CODE DISRUPTORS, INC.</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default SideBar;