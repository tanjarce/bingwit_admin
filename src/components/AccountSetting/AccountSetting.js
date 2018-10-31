import React, { Component } from 'react';
import { AvForm, AvInput,AvGroup } from 'availity-reactstrap-validation';
import { Row, Col, Button, FormGroup, Label, FormText } from 'reactstrap';

import '../../styles/style.css'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import * as Session from '../../services/session'

class AccountSetting extends Component {
  constructor(props){
    super(props);
    this.state = {
        password : '',
        vpassword : '',
        username : '',
        oldPass : '',
        err : ''

    }
    this.changePass = this.changePass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.changePass();
    }
  }
  componentDidMount(){
    const id = Session.getToken();
    API.getUserId(id.id)
    .then((response) => {
      if(response.success === true){
          this.setState({
            username : response.user.username
        })
      }
      else{
        Help.toastPop({message: response.error.message, type: 'error'})
      }
    })
  }
  changePass(){
    console.log('Change Pass')
    const { password, vpassword, oldPass } = this.state
    API.changePassword({
      'password' : oldPass,
      'new_password' : password,
      'confirm_new_password' : vpassword
    })
    .then((response) => {
      if(response.success === true){
          this.setState({
            vpassword : '',
            password : '',
            oldPass : '',
            err : ''
          })
          Help.toastPop({message: 'Change Password Successfully.', type: 'success'})
      }
      else{        
          this.setState({
            err : response.error.message
          })
          Help.toastPop({message: 'Error occured!.', type: 'error'})
      }
    })
  }
  handleChange(e){
    e.preventDefault();
    this.setState({[e.target.name] : e.target.value})
  };
    render() {
      const { password , vpassword, username, oldPass , err} = this.state;
      console.log(oldPass)
        return (
                <div className='all_padding'>
                <AvForm>
                    <FormGroup row>
                      <Label sm={3}>USERNAME:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput className="border" type='text' name="username" placeholder={username} required disabled />
                      </AvGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={3}>NEW PASSWORD:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput
                          className='inputField'
                          type='password' 
                          name="password" 
                          placeholder='Type password...' 
                          value={password} 
                          onChange={this.handleChange}   
                          onKeyPress={this._handleKeyPress}
                          required />
                          {/* <AvFeedback>Input valid password!</AvFeedback> */}
                      </AvGroup>
                      </Col>
                    </FormGroup>


                    <FormGroup row>
                      <Label sm={3}>VERIFY NEW PASSWORD:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput 
                          className='inputField'
                          type='password' 
                          name="vpassword" 
                          placeholder='Verify password...' 
                          value={vpassword} 
                          onChange={this.handleChange} 
                          onKeyPress={this._handleKeyPress}
                          required />
                          {/* <AvFeedback>Input valid password!</AvFeedback> */}
                      </AvGroup>
                      </Col>
                    </FormGroup>


                    <FormGroup row>
                      <Label sm={3}>CONFIRM OLD PASSWORD:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                           <FormText color="muted">
                            Re-enter your password to save changes to your account.
                          </FormText>
                          <AvInput
                          className='inputField'
                          type='password' 
                          name="oldPass" 
                          placeholder='Confirm old password...' 
                          value={oldPass} 
                          onChange={this.handleChange}               
                          onKeyPress={this._handleKeyPress}
                          required />
                          <FormText color="danger">{err}</FormText>
                      </AvGroup>
                      </Col>
                    </FormGroup>

                  <Row><Col sm={10} lg='9'>
                  
                  <Button className='float-right' onClick={this.changePass}>Save Changes</Button>
                  </Col></Row>
                </AvForm>
                </div>
        );
    }
}

export default AccountSetting;
