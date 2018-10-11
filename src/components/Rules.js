import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Tables from './Tables'
import Search from './Search'

class Rules extends Component {
  render() {

    return (
        <React.Fragment>
            <Search />
            <Tables />
        </React.Fragment>
    )
  }
}

export default Rules