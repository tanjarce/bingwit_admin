import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Tabs from '../Tabs'
import Rules from './Rules'
import Products from './Products'
import Banner from '../Banner'
import ProductModal from '../../modals/ProductModal'


class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
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
    // const { location } = this.props

    return (
        <div className='bottom-pad'>
            <ProductModal isOpen={isOpen} toggle={this.toggleModal} type="add" />
            <Banner 
                header="List of Rules &amp; Products"
                contents="Contains information about rules and products." 
            />
            <Container>
                <Tabs links={tabs}>
                    {
                        (this.props.location.pathname === '/list/products') && 
                        <Button color="primary" className="ml-auto" size="sm" onClick={this.toggleModal}>Add Product</Button>
                    }
                </Tabs>
                <Switch>
                    <Route path="/list/rules" render={()=>(
                        <Rules />
                    )}/>
                    <Route path="/list/products" render={()=>(
                        <Products />
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

export default withRouter(List)
