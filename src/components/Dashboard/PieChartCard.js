import React, { Component } from 'react'
import { ResponsiveContainer, Tooltip, Pie, PieChart, Cell} from 'recharts';
import { Col, Row, Card, CardHeader, CardBody, Input, InputGroupAddon, InputGroup} from 'reactstrap';
import { css } from 'react-emotion';
import { SyncLoader } from 'react-spinners';
import PieChartLegend from './PieChartLegend'

const override = css`
    display: inlineBlock;
    margin: 0;
    border-color: red;
`;

const colors = ['#17C1BC', '#ECEEEF', '#505050'];

class PieChartCard extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {

  //   }
  // }
  render() {
    const { userData, isLoading } = this.props

    return (
        <Card>
          <CardHeader className="bg-transparent">Current Users</CardHeader>
          <CardBody style={{'minHeight': '240px'}}>
            <Row>
                <Col xs="6">
                  {
                    isLoading
                      ? 
                        <div className='d-inline-block mx-auto'>
                            <SyncLoader
                                className={override}
                                sizeUnit={"px"}
                                size={5}
                                color={'#17C1BC'}
                                loading={true}/>
                        </div> 

                      : <ResponsiveContainer height={200} style={{'background': 'pink'}}>
                          <PieChart>
                            <Pie
                            data={userData}
                            dataKey='value' 
                            cx='50%' 
                            cy='50%' 
                            labelLine={true}
                            outerRadius="90%" 
                            fill="#8884d8">
                            {
                              userData.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]}/>)
                            }
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                  }
                </Col>
                <Col xs="6" className="d-flex align-items-center">
                  <PieChartLegend data={userData} colors={colors} />
                </Col>
            </Row>
          </CardBody>
        </Card>
    )
  }
}

export default PieChartCard
