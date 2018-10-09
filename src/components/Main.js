import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { MenuAction } from '../actions'

import * as API from '../services/API';
import * as Session from '../services/session';
import * as permissions from '../permissions/permissions';

import SideBar from './SideBar';

//PAGES
import Dashboard from './Dashboard'
import Food from './Food'
import Cart from './Cart'
import Users from './Users'
import Accounts from './Accounts'
import Billings from './Billings'
import Maps from './Maps'

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            menuexpand: false,
            menus: []
        }

        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleMenuExpand = this.handleMenuExpand.bind(this)
    }
    
    handleLogOut () {
        API.logout()
            .then(response => {
                Session.removeUser()
                this.props.history.push('/login')
            })
    }

    handleMenuExpand () {
        console.log('menu expand')
        this.setState((oldState) => ({
            menuexpand: !oldState.menuexpand
        }))
    }
    render() {
        const { menuexpand } = this.state

        const type = Session.getRole()
        const menus = permissions.getPermission(type)
        const hasAccess = Session.hasAccess()

        return hasAccess ? (
            <div style={{height: '100vh'}}>   
                {hasAccess && (
                    <SideBar
                        menus={menus}
                        onexpand={menuexpand}
                        onLogOut={this.handleLogOut}
                        expand={this.handleMenuExpand}
                    />
                )}
        
                <div className={menuexpand ? 'content onexpand' : 'content'}>
                    <Switch>
                        <Route path="/dashboard" render={()=>(
                            <Dashboard />
                        )}/>
                        <Route path="/food" render={() => (
                            <Food 
                                food={this.props.food}
                                updateQuery={this.props.updateQuery}
                                updateItems={this.props.updateItems}/>
                        )}/>
                        <Route path="/cart" render={()=>(
                            <Cart />
                        )}/>
                        <Route path="/users" render={()=>(
                            <Users />
                        )}/>
                        <Route path="/accounts" render={()=>(
                            <Accounts />
                        )}/>
                        <Route path="/billings" render={()=>(
                            <Billings />
                        )}/>
                        <Route path="/maps" render={()=>(
                            <Maps />
                        )}/>
                        <Route render={()=>(
                            <Redirect to="/dashboard" />
                        )}/>
                    </Switch>
                </div>
            </div>
        ) : (!hasAccess && this.props.location.pathname !== '/login') && (
            <Redirect to="/login"/>
        );
    }
}


function mapStateToProps ( {menu} ) {
    return {menu}
}

function mapDispatchToProps (dispatch) {
    return {
        populateMenu: (data) => dispatch(MenuAction.applyItems(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main));