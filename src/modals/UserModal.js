import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Modal from '../components/Modal';

import SimpleForm from '../components/SimpleForm';
import * as API from '../services/API';
import * as Help from '../helpers/helpers';

class UserModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            formErrorVisible: false,
            formErrorMessage: ""
        }

        this.onRequestSubmit = this.onRequestSubmit.bind(this)
        this.apiCreate = this.apiCreate.bind(this)
        this.toggleDismisErr = this.toggleDismisErr.bind(this)
        this.handleFormErrors = this.handleFormErrors.bind(this)
        this.apiCreate = this.apiCreate.bind(this)
    }

    onRequestSubmit (data) {
        const { mode } = this.props
        delete data.confirmPassword
        switch (mode) {
            case "UPDATE":
                this.apiUpdate()
                break
            default: 
                this.apiCreate(data)
                break
        }
    }

    apiCreate (data) {
        API.createUser(data)
        .then( response => {
            if (response.errors) {
                this.toggleDismisErr(true,response.errors[0].message)
                return
            }
            this.props.toggle()
            this.props.onSuccess()
        });
    }

    apiUpdate () {
        Help.toastPop({message: 'Not implemented yet', type: 'error'})
    }

    toggleDismisErr (flag, err = "") {
        this.setState({
            formErrorVisible:flag,
            formErrorMessage: err
        })
    }
    handleFormErrors (e) {
        this.toggleDismisErr(true,"Please fix all invalid field(s).")
    }
    sampleData () {
        return {
            username: "niel03",
            emailAddress: "corn@cor.com",
            firstName: "Fernan",
            lastName: "Principe",
            password: "asdasd",
            confirmPassword: "asdasd",
            role: "1",
            contactNo: "09932223333",
            addressLine1: "",
            addressLine2: "",
            addressProvince: "",
            addressCity: ""
        }
    }
    render() {
        const { isOpen, modalTitle, inputs, toggle, size, userData  } = this.props
        const { formErrorMessage, formErrorVisible } = this.state
        // const sampData = this.sampleData() // DEBUG
        return (
            <div>
                <Modal
                    size={size}
                    isOpen={isOpen}
                    toggle={toggle}
                    modalTitle={modalTitle}
                    modalBody={
                        (    
                            <SimpleForm 
                                ref={el => { this.simpleForm = el }}
                                inputs={inputs}
                                data={userData ? userData : null} // DEBUG
                                formErrorMessage={formErrorMessage}
                                formOnDismissError={this.toggleFormDismissError}
                                formErrorVisible={formErrorVisible}
                                onRequestSubmit={this.onRequestSubmit}
                                onFormError={this.handleFormErrors}
                            />
                        )
                    }
                    modalFooter={
                        (
                            <Button
                                title="Submit"
                                onClick={() => {
                                    this.simpleForm.form.submit()
                                }}>
                                Submit
                            </Button>
                        )
                    }
                />
            </div>
        );
    }
}

export default UserModal;