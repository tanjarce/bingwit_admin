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
        // const { userData } = this.props
        // if (!userData) 
        //     return
        // //API CALL
        // API.deleteUser(userData)
        // .then( response => {
        //     if (response.errors)
        //         return console.error(`ERROR ON UserDeleteModal line: 16 ${response.errors}`);
        //     this.props.onDeleteUser()
        //     this.props.toggle()
        // })
        console.log(`delete`)
        this.props.toggle()
    }

    render() {
        const { isOpen, toggle, userData = null} = this.props
        return (
            <div>
                <Modal
                    isOpen={isOpen}
                    toggle={toggle}
                    modalTitle={`Delete`}
                    modalBody={<div>{`Are you sure you want to delete this` }</div>}
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