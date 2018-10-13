import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch, Redirect } from 'react-router-dom'
import Tabs from '../Tabs'
import Rules from './Rules'
import Products from './Products'
import Banner from '../Banner'
import * as permissions from '../../permissions/permissions'

class List extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        console.log('add product')
    }

  render() {
    const tabs = [
        {'text': 'Rules', 'url': '/list/rules'},
        {'text': 'Products', 'url': '/list/products'},
    ]
    
    return (
        <div className='bottom-pad'>
            <Banner 
                header="List of Rules &amp; Products"
                contents="hehehe" 
            />
            <Container>
                <Tabs links={tabs}>
                    <Button color="primary" className="ml-auto" size="sm" onClick={this.handleClick}>Add Product</Button>
                </Tabs>
                <Switch>
                    <Route path="/list/rules" render={()=>(
                        <Rules 
                            columns={permissions.columnsRules} 
                            data={permissions.data}
                        />
                    )}/>
                    <Route path="/list/products" render={()=>(
                        <Products 
                            columns={permissions.columnsRules} 
                            data={permissions.data}
                        />
                    )}/>
                        <Route render={()=>(
                            <Redirect to="/list/rules" />
                        )}/>
                </Switch>
            </Container>
        </div>
    )
  }
}

export default List
