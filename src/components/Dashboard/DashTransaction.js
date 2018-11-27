import React, { Component, Fragment } from 'react';
import { Col, Row, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer    } from 'recharts'
import Select from 'react-select';
import * as API from '../../services/API'

class DashTransaction extends Component {
    render(){
        const { areaOptions } = this.props
        const data = [
            {name: 'Jan', 'No. Transaction': 2400, 'Total Sales': 4000, amt: 2400},
            {name: 'Feb', 'No. Transaction': 1398, 'Total Sales': 3000, amt: 2210},
            {name: 'Mar', 'No. Transaction': 9800, 'Total Sales': 2000, amt: 2290},
            {name: 'Apr', 'No. Transaction': 3908, 'Total Sales': 2780, amt: 2000},
            {name: 'May', 'No. Transaction': 4800, 'Total Sales': 1890, amt: 2181},
            {name: 'Jun', 'No. Transaction': 3800, 'Total Sales': 2390, amt: 2500},
            {name: 'Jul', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
            {name: 'Aug', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
            {name: 'Sep', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
            {name: 'Oct', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
            {name: 'Nov', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
            {name: 'Dec', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
        ];

        return(
            <Fragment>
                <Row className="mb-3">
                    <Col>
                        <h4>Transaction</h4>
                    </Col>
                </Row>
                <Row noGutters className="mb-3">
                    <Col xs="12" lg="5">
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            isDisabled={false}
                            // isLoading={true}
                            isClearable={true}
                            // isRtl={isRtl}
                            isSearchable={true}
                            name="color"
                            options={areaOptions}
                            onChange={this.handleChange}
                            placeholder="Search for Area"
                        />
                    </Col>
                    <Col sm={{ size: 2, offset: 5 }}>
                        <Input className="d-inline-block" type="select" name="usertype" id="usertype">
                            <option>This Year</option>
                            <option>This Month</option>
                            <option>This Week</option>
                        </Input>
                    </Col>
                </Row>
                <Row  className="mb-5">
                    <Col>
                    <ResponsiveContainer height={300}>
                        <BarChart width={600} height={300} data={data}
                                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis yAxisId="left" orientation="left" stroke="#17C1BC"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#7B8F9E"/>
                        <Tooltip/>
                        <Legend />
                        <Bar yAxisId="left" dataKey="Total Sales" fill="#17C1BC" />
                        <Bar yAxisId="right" dataKey="No. Transaction" fill="#7B8F9E" />
                        </BarChart>
                    </ResponsiveContainer>
                    </Col>

                </Row>
            </Fragment>
        )
    }
}

export default DashTransaction