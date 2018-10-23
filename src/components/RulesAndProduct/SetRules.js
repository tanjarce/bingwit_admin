import React, { Component } from 'react'
import { Input , Row , Col , Button } from 'reactstrap'
import '../../styles/style.css'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'

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
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.addRules();
        }
      }
    addRules(){
        const { updateTable } = this.props
        const values = this.state.InputRules.trim()
        if(values === ''){
            Help.toastPop({message: 'Please Input something...', type: 'error'})
        }
        else{
            API.addRules({
                'description' : values})
                .then((response) => {
                    if (response.success) {
                        this.setState({
                            InputRules : ''
                        })
                        Help.toastPop({message: 'New rule added.', type: 'success'})
                        updateTable();
                    }
                }).catch(err => console.log(err))
        }
        
    }
    
    handleToggle(){
        const { toggle } = this.state;
        this.setState({
            toggle : !toggle,
            InputRules : ''
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
            <Input type='text' placeholder='Type something...' 
            name='InputRules' 
            value={this.state.InputRules} 
            onChange={this.handleChange}
            onKeyPress={this._handleKeyPress}
            autoFocus
            />
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