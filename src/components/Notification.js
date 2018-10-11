import React, { Component } from 'react'
import Banner from './Banner'
import { Container } from 'reactstrap'
import Tables from './Tables'
import Tabs from './Tabs'
import { Route, Redirect, Switch } from 'react-router-dom'
import * as permissions from '../permissions/permissions'

class Notification extends Component {
  render() {
    const tabs = [
        {'text': 'Feedback', 'url': '/notif/feedback'},
        {'text': 'Report', 'url': '/notif/report'},
    ]
    return (
        <div>
            <Banner 
                header="Notification"
                contents="List of feedbacks, Reports of Users." 
            />
            <Container>
                <Tabs links={tabs} />
                <Switch>
                    <Route path="/notif/feedback" render={()=>(
                        <Tables 
                            columns={permissions.columnsRules} 
                            data={permissions.data} 
                        />
                    )}/>
                    <Route path="/notif/report" render={()=>(
                        <Tables 
                            columns={permissions.columnsRules} 
                            data={permissions.data} 
                        />
                    )}/>
                    <Route render={()=>(
                        <Redirect to="/notif/feedback" />
                    )}/>
                </Switch>
            </Container>
        </div>
    )
  }
}

export default Notification