import React, { Component } from 'react'
import { ResponsiveContainer, Tooltip, Area as AR, Pie, PieChart, Cell} from 'recharts';
import { Col, Row, Card, CardHeader, CardBody} from 'reactstrap';

import PieChartLegend from './PieChartLegend'

const data = [
    {name: 'Active', value: 6034}, 
    {name: 'Inactive', value: 753},
    {name: 'Banned', value: 300}];

const colors = ['#17C1BC', '#ECEEEF', '#505050'];

class PieChartCard extends Component {
  render() {
    return (
        <Card>
          <CardHeader className="bg-transparent">Users</CardHeader>
          <CardBody>
            <Row>
                <Col xs="6">
                  <ResponsiveContainer height={200} style={{'background': 'pink'}}>
                    <PieChart>
                      <Pie
                      data={data}
                      dataKey='value' 
                      cx='50%' 
                      cy='50%' 
                      labelLine={true}
                      outerRadius="90%" 
                      fill="#8884d8">
                      {
                        data.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]}/>)
                      }
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Col>
                <Col xs="6" className="d-flex align-items-center">
                  <PieChartLegend data={data} colors={colors} />
                </Col>
            </Row>
          </CardBody>
        </Card>
    )
  }
}

export default PieChartCard
