import React, { Component } from 'react';
import { AvForm, AvInput,AvGroup } from 'availity-reactstrap-validation';
import { Row, Col, Button, FormGroup, Label, FormText } from 'reactstrap';

import '../../styles/style.css'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import * as Session from '../../services/session'

import { css } from 'react-emotion';
import { PulseLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class AccountSetting extends Component {
  constructor(props){
    super(props);
    this.state = {
        password : '',
        vpassword : '',
        username : '',
        oldPass : '',
        err : '',
        loading : false

    }
    this.changePass = this.changePass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.changePass();
    }
  }
  componentWillMount(){
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
    const { password, vpassword, oldPass, loading} = this.state
    this.setState({
      loading : true
    })
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
            err : '',
            loading : false
          })
          Help.toastPop({message: 'Change Password Successfully.', type: 'success'})
      }
      else{        
          this.setState({
            err : response.error.message,
            loading : false
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
      const { password , vpassword, username, oldPass ,loading, err} = this.state;
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
                          className={err ? 'inputFieldError' : 'inputField'}
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
                          className={err ? 'inputFieldError' : 'inputField'}
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
                          className={err ? 'inputFieldError' : 'inputField'}
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
                  
                  <Button className='float-right button' onClick={this.changePass} style={{width : '180px'}}>
                    <div>
                      {loading ? 
                      <PulseLoader
                      className={override}
                      sizeUnit={"px"}
                      size={3}
                      color={'white'}
                      loading={loading}
                    />
                    :
                    'Save Changes'
                    }
                    </div> 
                  </Button>
                  </Col></Row>
                </AvForm>
                </div>
        );
    }
}

export default AccountSetting;
