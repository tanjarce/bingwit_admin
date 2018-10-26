import React, { Component } from 'react'
import Banner from '../Banner'
import { Container } from 'reactstrap'
import Tabs from '../Tabs'
import { Route, Redirect, Switch } from 'react-router-dom'
import Feedback from './Feedback'
import Report from './Report'
import ViewFeedback from './ViewFeedback'


class Notification extends Component {
  render() {
    const tabs = [
        {'text': 'Feedback', 'url': '/notif/feedback', 'notif': 0},
        {'text': 'Report', 'url': '/notif/report', 'notif': 4},
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
                    <Route exact path="/notif/feedback" render={()=>(
                        <Feedback /> 
                    )}/>
                    <Route path="/notif/report" render={()=>(
                        <Report />
                    )}/>
                    <Route path="/notif/feedback/view/:id" component={ ViewFeedback } />
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