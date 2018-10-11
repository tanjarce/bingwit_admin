import React, { Component } from 'react'
<<<<<<< HEAD
import { Container } from 'reactstrap'
import Tables from './Tables'
import Search from './Search'


=======
import { Container, Button } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'
import Tabs from './Tabs'
import Banner from './Banner'
import RulesTables from './RulesTables'
class Rules extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        console.log('add product')
    }
>>>>>>> 1c0b47fa0a7f0d10c4f2aef3534d2bd38467fcc0

class Rules extends Component {
  render() {
    return (
<<<<<<< HEAD
        <React.Fragment>
            <Search />
            <Tables />
        </React.Fragment>
=======
        <div>
            <Banner 
                header="Rules &amp; List of Products"
                contents="hehehe" 
            />
            <Container>
                <Tabs links={tabs}>
                    <Button color="primary" className="ml-auto" size="sm" onClick={this.handleClick}>Add Product</Button>
                </Tabs>
                <Switch>
                    <Route path="/rules/rules" render={()=>(
                        <RulesTables/>
                    )}/>
                    <Route path="/rules/products" render={()=>(
                        <div>Products</div>
                    )}/>
                </Switch>

            </Container>
        </div>
>>>>>>> 1c0b47fa0a7f0d10c4f2aef3534d2bd38467fcc0
    )
  }
}

export default Rules
