import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Dashboard from 'react-icons/lib/md/dashboard'
import Fork from 'react-icons/lib/io/fork'
import User from 'react-icons/lib/fa/user'
import Account from 'react-icons/lib/fa/odnoklassniki'
import Billing from 'react-icons/lib/fa/money'
import Maps from 'react-icons/lib/fa/map'
import Products from 'react-icons/lib/fa/product-hunt'

class SidebarItemLink extends Component {
    getIcon = (title) => {
        switch(title) {
            case 'food':
                return <Fork />
            case 'products':
                return <Products />
            case 'users':
                return <User />
            case 'accounts':
                return <Account />
            case 'billings':
                return <Billing />
            case 'dashboard':
                return <Dashboard />
            default:
                return <Maps />
        }
    }
    render() {
        const { menu, didNavigate } = this.props
        return (
            <li>
                <NavLink to={menu.url} activeClassName="active" onClick={didNavigate}>
                    <i className='fa'
                        title={menu.title}>
                        {this.getIcon(menu.title)}
                    </i>
                    <span className="nav-text text-capitalize">
                        {menu.title}
                    </span>
                </NavLink>
            </li>
        );
    }
}

export default SidebarItemLink;