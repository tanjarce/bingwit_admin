import React, { Component } from 'react';
import { Button } from 'reactstrap';
import * as API from '../services/API';

import Modal from '../components/Modal';

class UserDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this)
    }
    
    onConfirm() {
        const { selectedRow, deleteRule } = this.props
        deleteRule(selectedRow.id)
        this.props.toggle(null)
    }

    render() {
        const { isOpen, toggle, selectedRow } = this.props
        let message = selectedRow ? selectedRow.message : ''
        console.log(message)
        return (
            <div>
                <Modal
                    isOpen={isOpen}
                    toggle={()=>{toggle(null)}}
                    modalTitle={`Delete`}
                    modalBody={<div>{message}</div>}
                    modalFooter={
                        <React.Fragment>
                            <Button color="primary" onClick={this.onConfirm}>Confirm</Button>
                            <Button color="secondary" onClick={()=>{toggle(null)}}>Cancel</Button>
                        </React.Fragment>
                    }>
                </Modal>
            </div>
        );
    }
}
export default UserDeleteModal;