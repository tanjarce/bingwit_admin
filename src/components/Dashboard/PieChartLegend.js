import React, { Component } from 'react'
import '../../styles/style.css'


class PieChartLegend extends Component {
  render() {
    const { data, colors } = this.props
    const legends = data.map((data, index)=>{
        return(
            <li key={index} className="piechart_colorLegend_li">
                <span className="piechart_colorLegend" style={{'background': colors[index] }}></span>
                {data.name}: {data.value}
            </li>
        )
    })
    const totalValue = data.reduce((total, data) =>{
        return total += data.value
    }, 0)

    return (
      <div>
        <ul className="piechart_legends">{ legends }</ul>
        <h6>Total Users:</h6>
        <h4>{ totalValue }</h4>    
      </div>
    )
  }
}

export default PieChartLegend
