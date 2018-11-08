import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap';

import TableUser from './UserTable'
import Tabs from '../Tabs'
import Banner from '../Banner';
import CardUser from './CardUser'
import SuspendedUser from './SuspendedUser'
import '../../styles/manage.css'

class ManageUser extends Component {
    render() {
        const tabs = [
            {'text': 'Users', 'url': '/mnguser/users', 'notif': 0},
            {'text': 'Suspended Users', 'url': '/mnguser/suspended', 'notif': 0},
        ]
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <Container>
                    <Tabs links={tabs} />
                    <Switch>
                        <Route exact path="/mnguser/users" render={()=>(
                            <TableUser />
                        )}/>
                        <Route path="/mnguser/suspended" component={SuspendedUser}/>
                        <Route path="/mnguser/:id" component={CardUser}/>
                        <Route render={()=>(
                        <Redirect to="/mnguser/users" />
                    )}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}
export default withRouter(ManageUser);