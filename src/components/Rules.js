import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'
import Tabs from './Tabs'
import Banner from './Banner'
import RulesTables from './RulesTables'
class Rules extends Component {
    constructor(props){
        super(props)
        this.state = {
            'hehehe': true
        }
        this.handleClick = this.handleClick.bind(this)

        this.state = {
            'Error' : 'Error'
        }
    }
    handleClick () {
        console.log('add product')
    }

  render() {
    const tabs = [
        {'text': 'Rules', 'url': '/rules/rules'},
        {'text': 'Products', 'url': '/rules/products'},
    ]
    return (
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
    )
  }
}

export default Rules
