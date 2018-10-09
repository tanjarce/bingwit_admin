import React, { Component } from 'react';
import { Button, Card, CardImg} from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';
import '../styles/Login.css'


import * as Session from '../services/session'
import LoginForm from './LoginForm.js'
import LoginForgot from './LoginForgot';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            onLogin: true,
            isInvalid: {},
            errorMessage: {},
        }

        this.handleSignInSuccess = this.handleSignInSuccess.bind(this)
        this.handleSignInFail = this.handleSignInFail.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.reset = this.reset.bind(this)
        this.navigateToHome = this.navigateToHome.bind(this)
        this.navigateToForgotPassword = this.navigateToForgotPassword.bind(this)
    }
    
    handleOnBlur (e) {
        const name = e.target.name
        const value = e.target.value
        
        if (!value){
            this.setState((oldState)=>({
                isInvalid: {
                    ...oldState.isInvalid, [name]: true
                },
                errorMessage: {
                    ...oldState.errorMessage, [name]: `${name} is required.`
                }    
            }))
        } else {
            this.setState((oldState)=>({
                isInvalid: {
                    ...oldState.isInvalid, [name]: false
                },
                errorMessage: {
                    ...oldState.errorMessage, [name]: null
                }    
            }))    
        }
    }

    // LOGIN METHODS
    handleSignInSuccess (response, role) {
        Session.saveUser(response, role);
        this.navigateToHome()
    }
    handleSignInFail (error) {
        this.setState(() => ({
            isInvalid: true,
            errorMessage: error.context
        }))
    }

    handleForgotPasswordSubmit (e) {
        e.preventDefault()
        // const values = serializeForm(e.target, { hash: true })
    }
    reset (value) {
        this.setState((state) => ({
            ...state,
            isInvalid: value
        }))
    }
    navigateToHome () {
        this.props.history.push('/dashboard')
    }
    navigateToForgotPassword () {
        this.reset(false)
        this.setState((oldState) => ({
            ...this.state,
            onLogin: !oldState.onLogin
        }))
    }
    
    render() {
        const { isInvalid, errorMessage, onLogin, isEmailInvalid } = this.state
        const hasAccess = Session.hasAccess()
        return !hasAccess ? (
            <div className="login" style={{'height': '100vh'}}>
                    <Card className="login-window bg-transparent border-0">
                        {onLogin && (
                            // Login Form
                            <LoginForm 
                                onLogin={onLogin}
                                isInvalid={isInvalid} 
                                errorMessage={errorMessage}
                                onSuccess={this.handleSignInSuccess}
                                onError={this.handleSignInFail}
                                onBlur={this.handleOnBlur}
                                />
                        )}
                        {!onLogin && (
                            <LoginForgot 
                                onLogin={onLogin}
                                isEmailInvalid={isEmailInvalid}
                                handleSubmit={this.handleForgotPasswordSubmit}
                                />
                        )}
                        {/* <Button color="link" block onClick={() => {
                            this.navigateToForgotPassword()
                        }}>
                            {onLogin && (
                                "Forgot Password"
                            )}
                            {!onLogin && (
                                "Go Back"
                            )}
                        </Button> */}
                    </Card>
                
            </div>
        ) : (
            <Redirect to="/dashboard"/>
        );
    }
}

export default withRouter(Login);