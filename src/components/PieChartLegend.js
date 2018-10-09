import React, { Component } from 'react'
import {Badge} from 'reactstrap';


class PieChartLegend extends Component {
  render() {
    const { data, colors } = this.props
    const legends = data.map((data, index)=>{
        return(
            <li key={index}>
                <Badge style={{'background': colors[index]}}>&nbsp;&nbsp;</Badge>
                &nbsp;{data.name}: {data.value}
            </li>
        )
    })
    const totalValue = data.reduce((total, data) =>{
        return total += data.value
    }, 0)

    return (
      <div>
        <ul>{ legends }</ul>
        <h3>Total</h3>
        <h4>{ totalValue }</h4>    
      </div>
    )
  }
}

export default PieChartLegend
