import React, { Component } from 'react';
import { Form, InputGroupAddon, InputGroup, Input, Row, Col, Button } from 'reactstrap';
import serializeForm from 'form-serialize'

import { connect } from 'react-redux'
import { FoodAction } from '../actions'

import * as FoodAPI from '../services/FoodAPI';

import { SyncLoader } from 'react-spinners';

class FoodSearch extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }

        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeText (e) {
        const { updateQuery } = this.props
        const text = e.target.value
        updateQuery({value: text})
    }
    
    handleSubmit (e) {
        const { updateItems } = this.props
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true }) 

        this.toggleLoading()
        FoodAPI.fetchFood(values.food)
        .then(recipes => {
            updateItems({ items: recipes })
            this.toggleLoading()
        })
        .catch(err => {
            this.toggleLoading()
        })
    }
    toggleLoading () {
        this.setState(oldState => ({
            loading : !oldState.loading
        }))
    }
    render() {
        const { food : { query } } = this.props
        const { loading } = this.state
        return (
            <div>
                <Row>
                    <Col>
                        <Form
                            onSubmit={(e) => {
                                this.handleSubmit(e)
                            }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Search: </InputGroupAddon>
                                <Input 
                                    name="food"
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        this.handleChangeText(e)
                                    }}
                                    placeholder="e.g: pizza, eggs, etc."/>
                                <InputGroupAddon addonType="append">
                                    <Button
                                        disabled={loading}
                                        color="warning"
                                        >
                                    {!loading && (<span>GO</span>)}
                                    {loading && (
                                        <SyncLoader
                                            size={4}
                                            loading={loading}>
                                        </SyncLoader>
                                    )}
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps ({food}) {
    return {food}
}

function mapDispatchToProps (dispatch) {
    return {
        updateQuery: (data) => dispatch(FoodAction.updateQuery(data)),
        updateItems: (data) => dispatch(FoodAction.updateItems(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodSearch)