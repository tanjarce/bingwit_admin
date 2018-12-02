import React, { Component } from 'react'
import { Card, CardHeader, CardBody} from 'reactstrap';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area as AR } from 'recharts';

// const data = [
//     {
//         name:"Jan",
//         pv:2400,
//         'uv shit':203
//     },
//     {
//         name:"Feb",
//         pv:1398,
//         'uv shit':421
//     },
//     {
//         name:"Mar",
//         pv:9800,
//         'uv shit':786
//     },
//     {
//         name:"Apr",
//         pv:3908,
//         'uv shit':918
//     },
//     {
//         name:"May",
//         pv:4800,
//         'uv shit':1443
//     },
//     {
//         name:"June",
//         pv:2400,
//         'uv shit':1856
//     },
//     {
//         name:"July",
//         pv:4800,
//         'uv shit':2522
//     },
//     {
//         name:"Aug",
//         pv:4800,
//         'uv shit':3013
//     },
//     {
//         name:"Sept",
//         pv:4800,
//         'uv shit':3803
//     },                {
//         name:"Oct",
//         pv:4800,
//         'uv shit':3989
//     },                {
//         name:"Nov",
//         pv:4800,
//         'uv shit':4583
//     },                {
//         name:"Dec",
//         pv:4800,
//         'uv shit':4832
//     },
// ]

class LineChartCard extends Component {
  render() {
    const { registeredData } = this.props
    return (
        <Card>
            <CardHeader className="bg-transparent">Registered Users</CardHeader>
            <CardBody>
                <ResponsiveContainer height={200}>
                    <AreaChart data={registeredData}
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
                        {/* <Legend /> */}
                        <AR type="monotone" dataKey="registered user" stroke="#17C1BC" fillOpacity={1} fill="url(#colorUv)" />
                        {/* <AR type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                    </AreaChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>        
    )
  }
}

export default LineChartCard
