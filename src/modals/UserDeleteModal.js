import React, { Component } from 'react';
import { Button } from 'reactstrap';
// import * as API from '../services/API';

import Modal from '../components/Modal';

class UserDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this)
    }
    
    onConfirm () {
        this.props.suspendUser()
        this.props.toggle()
    }
    render() {
        const { isOpen, toggle, userData = null} = this.props
        return (
            <div>
                <Modal
                    isOpen={isOpen}
                    toggle={toggle}
                    modalTitle={userData && 
                        `${userData.status === 'suspended' ?
                         `Activate ${ userData ? userData.username : '' }'s Account` :
                          `Suspend ${ userData ? userData.username : '' }'s Account`}`}

                    modalBody={userData && 
                        `${userData.status === 'suspended' ?
                        `Are you sure you want to activate this account?` :
                        `Are you sure you want to suspend this account?`}`}
                    modalFooter={
                        <React.Fragment>
                            <Button color="primary" onClick={this.onConfirm}>Confirm</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </React.Fragment>
                    }>
                </Modal>
            </div>
        );
    }
}

export default UserDeleteModal;