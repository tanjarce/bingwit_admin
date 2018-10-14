import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch, Redirect } from 'react-router-dom'
import Tabs from '../Tabs'
import Rules from './Rules'
import Products from './Products'
import Banner from '../Banner'
import DeleteModal from '../../modals/DeleteModal'

import * as permissions from '../../permissions/permissions'

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    
    }
    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }
    handleClick () {
        console.log('add product')
    }

  render() {
    const tabs = [
        {'text': 'Rules', 'url': '/list/rules'},
        {'text': 'Products', 'url': '/list/products'},
    ]
    
    const { isOpen } = this.state
    return (
        <div className='bottom-pad'>
            <DeleteModal isOpen={isOpen} toggle={this.toggleModal}/>
            <Banner 
                header="List of Rules &amp; Products"
                contents="hehehe" 
            />
            <Container>
                <Tabs links={tabs}>
                    <Button color="primary" className="ml-auto" size="sm" onClick={this.toggleModal}>Add Product</Button>
                </Tabs>
                <Switch>
                    <Route path="/list/rules" render={()=>(
                        <Rules />
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
