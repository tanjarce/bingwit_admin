import React, { Component } from 'react';
import { Button } from 'reactstrap';
import * as API from '../services/API';

import Modal from '../components/Modal';

class UserDeleteModal extends Component {
    constructor(props) {
        super(props);
        
        this.onConfirm = this.onConfirm.bind(this)
    }
    
    onConfirm () {
        const { userData } = this.props
        if (!userData) 
            return
        //API CALL
        API.deleteUser(userData)
        .then( response => {
            if (response.errors)
                return console.error(`ERROR ON UserDeleteModal line: 16 ${response.errors}`);
            this.props.onDeleteUser()
            this.props.toggle()
        })
    }
    render() {
        const { isOpen, size, modalTitle, modalBody } = this.props
        return (
            <div>
                <Modal
                    size={size}
                    isOpen={isOpen}
                    toggle={this.props.toggle}
                    modalTitle={modalTitle}
                    modalBody={modalBody}
                    modalFooter={
                        (
                            <div style={
                                {
                                    height: "38px"
                                }
                            }>
                                <Button 
                                    style={
                                        {
                                            "position": "absolute",
                                            "left": "18px"
                                        }
                                    }
                                    onClick={this.props.toggle}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    color="primary"
                                    style={
                                        {
                                            "position": "absolute",
                                            "right": "18px"
                                        }
                                    }
                                    onClick={this.onConfirm}
                                >
                                    Confirm
                                </Button>
                            </div>
                        )
                    }>
                </Modal>
            </div>
        );
    }
}

export default UserDeleteModal;