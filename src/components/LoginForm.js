import React, { Component } from 'react';
import { CardBody, Form, FormGroup, Label, Input, Fade, FormFeedback } from 'reactstrap';
import serializeForm from 'form-serialize'
import showpassword from '../images/eye-solid.svg'
import hidepassword from '../images/eye-slash-solid.svg'
import logo from '../images/bingwit_logo.svg'

// import * as API from '../services/API'

import LoadingButton from './ButtonSpinner'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            dropdownOpen: false,
            type: 'ADMIN',
            showPassword: false,
        }

        this.handleSignIn = this.handleSignIn.bind(this)
        this.toggleLoading = this.toggleLoading.bind(this)
        this.toggleShowPassword = this.toggleShowPassword.bind(this)
        
    }
    
    handleSignIn (e) {
        this.toggleLoading()
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true }) // returns an object from input values based on name e.g. {name: "name", email: "email@.e.com"}
        
        if(this.props.validation(values)) {
            if(values.username === 'admin' && values.password === 'secret'){
                // setTimeout(()=> {
                    this.props.onSuccess(values, 'ADMIN')
                    this.toggleLoading()
                // }, 1000)
            } else { 
                this.props.onError()
                this.toggleLoading()
            }
        } else{
            this.toggleLoading()
        }

        // console.log(values)
        // API.login(values)
        // .then((response) => {
        //     this.toggleLoading()
        //     if (response.errors) {
        //         console.log(response.errors)
        //         this.props.onError(response.errors[0])
        //         return
        //     }
        //     // go to home page
        //     // simple way to redirect to a page
        //     this.props.onSuccess(response, values.type.toUpperCase())
        // })
    }
    toggleLoading () {
        this.setState((oldState) => ({
            loading: !oldState.loading
        }))
    }
    toggleShowPassword () {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }))
    }
    render() {
        const {loading, showPassword } = this.state;
        const {onLogin, isInvalid, errorMessage} = this.props
        return (
            <div>
                <Fade 
                    in={onLogin}> 
                    <CardBody className="login-form">
                        <div className="text-center mb-5">
                            <img src={logo} alt="bingwit"/>
                            <h2 className="font-weight-bold">Bingwit</h2>
                            <h6 className="text-muted">Admin Login</h6>
                        </div>
                        <Form 
                            onSubmit={(e) => {
                                this.handleSignIn(e)
                            }}
                            >
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input name="username"
                                        placeholder="Username"
                                        type="text"
                                        invalid={isInvalid.username}
                                        autoFocus
                                        />
                                <FormFeedback className="text-capitalize" >{errorMessage.username}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input name="password"
                                        placeholder="Password"
                                        type={ (showPassword) ? 'text' : 'password' }
                                        style={{'paddingRight': '40px'}}
                                        invalid={isInvalid.password}/>
                                <FormFeedback className="text-capitalize" >{errorMessage.password}</FormFeedback>
                                <span 
                                    className="toggle_show_password" 
                                    onClick={this.toggleShowPassword}>
                                    <img src={ (showPassword) ? showpassword : hidepassword } alt="eye"/>
                                </span>
                            </FormGroup>
                            <LoadingButton 
                                color="primary"
                                text="Login"
                                isLoading={loading}
                                spinnerColor="#fff"
                                spinnerSize={2}
                                >
                            </LoadingButton>
                        </Form>
                    </CardBody>
                </Fade>
            </div>
        );
    }
}

export default LoginForm;