import React, { Component } from 'react';
import { AvForm, AvInput,AvFeedback,AvGroup } from 'availity-reactstrap-validation';
import { Row, Col, Button, FormGroup, Label, FormText } from 'reactstrap';
import '../../styles/style.css'
class AccountSetting extends Component {
  constructor(props){
    super(props);
    this.state = {
        password : '',
        vpassword : ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({[e.target.name] : e.target.value})
  };
    render() {
      const { password , vpassword } = this.state;
        return (
                <div className='all_padding'>
                <AvForm>
                    
                    <FormGroup row>
                      <Label sm={3}>USERNAME:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput type='text' name="username" placeholder='Type username...' required />
                          <AvFeedback>Input valid username!</AvFeedback>
                      </AvGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={3}>NAME:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput type='text' name="name" placeholder='Type name...' required />
                          <AvFeedback>Input valid name!</AvFeedback>
                      </AvGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={3}>PASSWORD:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput type='password' name="password" placeholder='Type password...' value={password} onChange={this.handleChange} required />
                          <AvFeedback>Input valid password!</AvFeedback>
                      </AvGroup>
                      </Col>
                    </FormGroup>


                    <FormGroup row>
                      <Label sm={3}>VERIFY PASSWORD:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput type='password' name="vpassword" placeholder='Verify password...' value={vpassword} onChange={this.handleChange} required />
                          <AvFeedback>Input valid password!</AvFeedback>
                          <FormText color="muted">
                            Re-enter your password to save changes to your account.
                          </FormText>
                      </AvGroup>
                      </Col>
                    </FormGroup>


                    <FormGroup row>
                      <Label sm={3}>CONFIRM OLD PASSWORD:</Label>
                      <Col sm={10} lg='6'>
                      <AvGroup>
                          <AvInput type='password' name="password" placeholder='Confirm old password...' required />
                          <AvFeedback>Input valid password!</AvFeedback>
                      </AvGroup>
                      </Col>
                    </FormGroup>

                  <Row><Col sm={10} lg='9'>
                  
                  <Button color='success' className='float-right' >Save Changes</Button>
                  
                  </Col></Row>
                </AvForm>
                </div>
        );
    }
}

export default AccountSetting;
