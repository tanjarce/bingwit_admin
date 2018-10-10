import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'
import Tabs from './Tabs'
import Banner from './Banner'

class Rules extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
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
                        <div>Rules</div>
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

<<<<<<< HEAD
export default Rules
=======
export default Rules
>>>>>>> 429385634300258191a8dfe28619982d3df3b161
