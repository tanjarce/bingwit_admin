import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
class SidebarItemLink extends Component {
    render() {
        const { menu , didNavigate } = this.props 
        return (
            <li>
                <NavLink to={menu.url} activeClassName="active" onClick={didNavigate}>
                    <i className='fa'
                        title={menu.title}>
                        {menu.src}
                    </i>
                    <span className="nav-text">
                        {menu.title}
                    </span>
                </NavLink>
            </li>
        );
    }
}

export default SidebarItemLink;