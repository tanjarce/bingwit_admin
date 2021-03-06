import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { MenuAction } from '../actions'

import * as API from '../services/API';
import * as Session from '../services/session';
import * as permissions from '../permissions/permissions';

import SideBar from './SideBar';
import Accounts from './AccountSetting/Accounts'
//PAGES
import Dashboard from './Dashboard/Dashboard'
import ManageUser from './ManageUser/ManageUser'
import List from './RulesAndProduct/List'
import Notification from './Notifications/Notification'
import Announcement from './Announcement/Announcement'
import AllTransaction from './Transaction/AllTransaction';

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
                        <Route path="/account" render={() => (
                            <Accounts />
                        )}/>
                        <Route path="/mnguser" render={()=>(
                            <ManageUser />
                        )}/>
                        <Route path="/notif" render={()=>(
                           <Notification />
                        )}/>
                        <Route path="/list" render={()=>(
                            <List />
                        )}/>
                        <Route path="/announcement" render={()=>(
                            <Announcement />
                        )}/>
                        <Route path="/alltransaction" render={()=>(
                            <AllTransaction />
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