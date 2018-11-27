import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';

import Banner from '../Banner';
import DashUser from './DashUser'
import DashTopList from './DashTopList'
import DashTransaction from './DashTransaction'

import moment from 'moment'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.repopulate = this.repopulate.bind(this)
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
    
    render() {
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Dashboard"
                    contents={moment().format('MMMM D, YYYY')} 
                />
                <Container>
                    <DashTransaction />
                    <DashUser />
                    <DashTopList />
                </Container>
            </div>
        );
    }
}

export default Dashboard;