import React, { Component } from 'react'
import { Card, CardHeader, CardBody} from 'reactstrap';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area as AR } from 'recharts';

const data = [
    {
        amt:2400,
        name:"Jan",
        pv:2400,
        uv:203
    },
    {
        amt:2210,
        name:"Feb",
        pv:1398,
        uv:421
    },
    {
        amt:2290,
        name:"Mar",
        pv:9800,
        uv:786
    },
    {
        amt:2000,
        name:"Apr",
        pv:3908,
        uv:918
    },
    {
        amt:2181,
        name:"May",
        pv:4800,
        uv:1443
    },
    {
        amt:2400,
        name:"June",
        pv:2400,
        uv:1856
    },
    {
        amt:2181,
        name:"July",
        pv:4800,
        uv:2522
    },
    {
        amt:2181,
        name:"Aug",
        pv:4800,
        uv:3013
    },
    {
        amt:2181,
        name:"Sept",
        pv:4800,
        uv:3803
    },                {
        amt:2181,
        name:"Oct",
        pv:4800,
        uv:3989
    },                {
        amt:2181,
        name:"Nov",
        pv:4800,
        uv:4583
    },                {
        amt:2181,
        name:"Dec",
        pv:4800,
        uv:4832
    },
]

class LineChartCard extends Component {
  render() {
    return (
        <Card>
            <CardHeader className="bg-transparent">Active Users</CardHeader>
            <CardBody>
                <ResponsiveContainer height={200}>
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
                        {/* <Legend /> */}
                        <AR type="monotone" dataKey="uv" stroke="#17C1BC" fillOpacity={1} fill="url(#colorUv)" />
                        {/* <AR type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                    </AreaChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>        
    )
  }
}

export default LineChartCard
