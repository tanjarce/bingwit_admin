import React, { Component } from 'react'
import { Input , Row , Col , Button } from 'reactstrap'
import '../../styles/style.css'
import * as API from '../../services/API'

class SetRules extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle : true,
            InputRules : '',
            test : this.props.data
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this)
        this.addRules = this.addRules.bind(this)
    }

    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value})
    };

    addRules(){
        const { updateTable } = this.props
        const values = this.state.InputRules
        API.addRules({
            'description' : values})
            .then((response) => {
                const error = response.err || ''
                if (!error) {
                    this.setState({
                        InputRules : ''
                    })
                    updateTable();
                    return
                } else {
                    this.props.onError(response.err.message)
                }
            })
    }
    
    handleToggle(){
        const { toggle } = this.state;
        this.setState({
            toggle : !toggle
        })
    }
    render() {
    const { toggle } = this.state;
    return (
        <Row className="SR_main">
        <Col></Col>
        {toggle &&
        <Col xs='auto'>
            <Button 
            className="SR_button"
            onClick={this.handleToggle}
            >Set New Rules </Button>
        </Col>}
        {!toggle &&
        <div className='d-flex align-items-center'>
        <Col xs='auto'>Set new Rules:</Col>
        <Col xs='auto'>
        <div className='d-inline-flex'>
            <Input type='text' placeholder='Type something...' name='InputRules' value={this.state.InputRules} onChange={this.handleChange}/>
            <Button className='SR_cancel' onClick={this.handleToggle}>Cancel<span>X</span></Button>
            <Button className='SR_add' onClick={this.addRules}>Add <span>&#10003;</span></Button>
        </div>
        </Col>
        </div>}
        </Row>
    )
  }
}

export default SetRules