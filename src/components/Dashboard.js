import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';

import Banner from './Banner';
import PieChartCard from './PieChartCard'
import TopListCard from './TopListCard'
import LineChartCard from './LineChartCard'


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
                    contents="Sample charts. See http://recharts.org/" 
                />
                <Container>
                    <Row className="mb-5">
                        <Col xs="12" lg="7" className="mb-3 mb-lg-0">
                            <LineChartCard />
                        </Col>
                        <Col xs="12" lg="5" className="mb-3 mb-lg-0">
                            <PieChartCard />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <h4>Top List</h4>
                        </Col>
                    </Row>
                    <Row  className="mb-5">
                        <Col xs="12" md="4" className="mb-3 mb-md-0">
                            <TopListCard />
                        </Col>
                        <Col xs="12" md="4" className="mb-3 mb-md-0">
                            <TopListCard />
                        </Col>
                        <Col xs="12" md="4" className="mb-3 mb-md-0">
                            <TopListCard />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Dashboard;