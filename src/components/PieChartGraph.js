import React, { Component } from 'react'
import { ResponsiveContainer, Tooltip, Area as AR, Pie, PieChart, Cell} from 'recharts';


class PieChartGraph extends Component {
  render() {
    const { data, colors } = this.props
    return (
      <div>
        <ResponsiveContainer height={300} style={{'background': 'pink'}}>
            <PieChart>
                <Pie
                data={data}
                dataKey='value' 
                cx='50%' 
                cy='50%' 
                labelLine={true}
                outerRadius="90" 
                fill="#8884d8"
                >
                {
                    data.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]}/>)
                }
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default PieChartGraph
