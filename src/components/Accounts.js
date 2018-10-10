import React, { Component } from 'react';
import Banner from './Banner.js';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class Accounts extends Component {
    render() {
        return (
            <div>
                <Banner 
                    header="Account Setting"
                    contents="Informations of Admin." 
                />
                <div className='all_padding'>
                <Form>
                    <FormGroup row>
                      <Label for="exampleUsername" sm={2}>USERNAME:</Label>
                      <Col sm={10} lg='6'>
                        <Input type="text" name="text" id="exampleEmail" placeholder="Type username..." />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleName" sm={2}>NAME: </Label>
                      <Col sm={10} lg='6'>
                        <Input type="text" name="text" id="examplePassword" placeholder="Type name..." />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleName" sm={2}>PASSWORD: </Label>
                      <Col sm={10} lg='6'>
                        <Input type="password" name="password" id="examplePassword" placeholder="Type password..." />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleName" sm={2}>VERIFY PASSWORD: </Label>
                      <Col sm={10} lg='6'>
                        <Input type="password" name="password" id="examplePassword" placeholder="Verify Password..." />
                        <FormText color="muted">
                            Re-enter your password to save changes to your account.
                        </FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleName" sm={2}>OLD PASSWORD: </Label>
                      <Col sm={10} lg='6'>
                        <Input type="password" name="password" id="examplePassword" placeholder="Type old password..." />
                      </Col>
                    </FormGroup>
                  <Row><Col sm={10} lg='8'><Button color='success' className='float-right' >Save Changes</Button></Col></Row>
                </Form>
                </div>
            </div>
        );
    }
}

export default Accounts;