import React, { Component } from 'react';

import { Container, Col, Row, Button, Card, CardTitle, CardBody, Badge} from 'reactstrap';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area as AR, Pie, PieChart, Cell} from 'recharts';
import PieChartGraph from './PieChartGraph'
import PieChartLegend from './PieChartLegend'

const deta = [{name: 'Group A', value: 6034}, {name: 'Group B', value: 753},
                  {name: 'Group C', value: 300}];
const COLORS = ['#17C1BC', '#ECEEEF', '#505050'];

class Area extends Component {
    render() {
        const { data } = this.props
        return (
            <Container>
                {/* <Row>
                    <Col xs="6">
                        <Button onClick={this.props.repopulate} color="primary"> Repopulate data </Button>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <ResponsiveContainer height={300}>
                            <AreaChart data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#17C1BC" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#17C1BC" stopOpacity={0}/>
                                    </linearGradient>
                                    {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1"> */}
                                    {/* <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/> */}
                                    {/* <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/> */}
                                    {/* </linearGradient> */}
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <AR type="monotone" dataKey="uv" stroke="#17C1BC" fillOpacity={1} fill="url(#colorUv)" />
                                {/* <AR type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                            </AreaChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col xs="6">
                        <Card>
                            <Row>
                                <Col xs="6">
                                    <PieChartGraph data={deta} colors={COLORS} />
                                </Col>
                                <Col xs="6">
                                    <PieChartLegend data={deta} colors={COLORS} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <h4>Top List</h4>
                </Row>
                <Row>
                    <Col xs="4">
                        <TopListCard title="Groups" data={deta} />
                    </Col>
                    <Col xs="4">
                        <TopListCard title="Groups" data={deta} />
                    </Col>
                    <Col xs="4">
                        <TopListCard title="Groups" data={deta} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const TopListCard = ({ title, data }) => {
    const list = data.map((data, index)=>{
        return(
            <li key={index}>{data.name} {data.value}</li>
        )
    })
    return(
        <Card>
            <CardBody>
                <CardTitle>{ title }</CardTitle>
            </CardBody>
            <CardBody>
                {list}
            </CardBody>
        </Card>
    )
}

export default Area;