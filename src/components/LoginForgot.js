import React, { Component } from 'react';
import { CardBody, Form, FormGroup, Label, CardTitle, Input, Fade, Button } from 'reactstrap';

class LoginForgot extends Component {
    render() {
        const {onLogin, isEmailInvalid, handleSubmit} = this.props
        return (
            <div>
                <Fade 
                    in={!onLogin}>
                    <CardBody className="login-form">
                        <CardTitle className="text-center">Forgot Password</CardTitle>
                        <Form 
                            onSubmit={(e) => {
                                handleSubmit(e)
                            }}
                            >
                            <FormGroup>
                                <Label for="username">Email</Label>
                                <Input name="email"
                                        placeholder="Email Address"
                                        type="text"
                                        invalid={isEmailInvalid}/>
                            </FormGroup>
                            <Button color="primary" block>
                                SUBMIT
                            </Button>
                        </Form>
                    </CardBody>
                </Fade>
            </div>
        );
    }
}

export default LoginForgot;