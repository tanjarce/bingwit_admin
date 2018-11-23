import React, { Component, Fragment } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Route, Switch, withRouter } from 'react-router-dom'

import Banner from '../Banner';
import DashUser from './DashUser'
import DashTopList from './DashTopList'
import DashTransaction from './DashTransaction'
import DashExpandView from './DashExpandView'

import moment from 'moment'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.repopulate = this.repopulate.bind(this)
        this.expand = this.expand.bind(this) 
    }
    repopulate () {
        const { items } = this.state

        const newArray = items.map(items => {
            return {
                ...items,
                pv: this.random(10000, 2000),
                uv: this.random(10000, 2000)
            }
        })

        this.setState({
            items: newArray
        })
    }
    random (num, base = 1) {
        return Math.floor(Math.random() * num) + base
    }

    expand(type){
        console.log(type)
        const { location: { pathname } } = this.props
        this.props.history.push(`${pathname}/${type}_expand`)
    }
    
    render() {
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Dashboard"
                    contents={moment().format('MMMM D, YYYY')} 
                />
                <Container>
                    <Switch>
                        <Route exact path="/dashboard" render={()=>(
                            <Fragment>
                                <DashTransaction />
                                <DashUser />
                                <DashTopList expand={this.expand}/>
                            </Fragment>
                        )}/>
                        <Route exact path="/dashboard/:type" component={ DashExpandView }/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(Dashboard);