import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';
import '../styles/Login.css'

import * as Session from '../services/session'
import LoginForm from './LoginForm.js'

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
        this.reset = this.reset.bind(this)
        this.navigateToHome = this.navigateToHome.bind(this)
        this.navigateToForgotPassword = this.navigateToForgotPassword.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
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
    handleValidation (value) {
        const fields = ['username', 'password'];
        const inputedFields = Object.keys(value)
        let valid = true;

        fields.map(field => {
            if(!inputedFields.includes(field)){
                this.setState((oldState)=>({
                    isInvalid: {
                        ...oldState.isInvalid, [field]: true
                    },
                    errorMessage: {
                        ...oldState.errorMessage, [field]: `${field} is required.`
                    }    
                }))
                valid = false
            } else {
                this.setState((oldState)=>({
                    isInvalid: {
                        ...oldState.isInvalid, [field]: false
                    },
                    errorMessage: {
                        ...oldState.errorMessage, [field]: null
                    }
                }))    
            }
            return false
        })
        return valid
    }

    // LOGIN METHODS
    handleSignInSuccess (response) {
        Session.saveUser(response);
        this.navigateToHome()

    }
    
    handleSignInFail (error) {
        this.setState(()=>({
            isInvalid: {
                'username': true,
                'password': true
            },
            errorMessage: {
                'username' : null,
                'password' : error
            }
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
        const { isInvalid, errorMessage, onLogin } = this.state
        const hasAccess = Session.hasAccess()
        return !hasAccess ? (
            <div className="login" style={{'height': '100vh'}}>
                <Card className="login-window bg-transparent border-0">
                    <LoginForm
                        onLogin={onLogin}
                        isInvalid={isInvalid} 
                        errorMessage={errorMessage}
                        onSuccess={this.handleSignInSuccess}
                        onError={this.handleSignInFail}
                        validation={this.handleValidation}
                    />
                </Card>
            </div>
        ) : (
            <Redirect to="/dashboard"/>
        );
    }
}

export default withRouter(Login);