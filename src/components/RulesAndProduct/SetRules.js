import React, { Component } from 'react'
import { Input , Row , Col , Button } from 'reactstrap'
import '../../styles/style.css'
class SetRules extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle : true
        }
        this.handleToggle = this.handleToggle.bind(this)
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
            <Input type='text' placeholder='Type something...'/>
            <Button className='SR_cancel' onClick={this.handleToggle}>Cancel<span>X</span></Button>
            <Button className='SR_add'>Add <span>&#10003;</span></Button>
        </div>
        </Col>
        </div>}
        </Row>
    )
  }
}

export default SetRules