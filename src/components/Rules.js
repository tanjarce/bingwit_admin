import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch, Redirect } from 'react-router-dom'
import Tabs from './Tabs'
import Banner from './Banner'
import RulesTables from './RulesTables'
import * as permissions from '../permissions/permissions'
class Rules extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        console.log('add product')
    }

  render() {
    const columns = permissions.columnsReports;
    console.log(columns)
    const data = permissions.data;
    const tabs = permissions.tabs;
    return (
        <div className='bottom-pad'>
            <Banner 
                header="Rules &amp; List of Products"
                contents="hehehe" 
            />
            <Container>
                <Tabs links={tabs}>
                {/* <Button color="primary" className="ml-auto" size="sm" onClick={this.handleClick}>Add Product</Button> */}
                </Tabs>
                <Switch>
                    <Route path="/list/rules" render={()=>(
                        <RulesTables columns={columns} data={data}/>
                    )}/>
                    <Route path="/list/products" render={()=>(
                        <div>Products</div>
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

export default Rules