import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Modal from '../components/Modal';

class UserDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this)
    }
    
    onConfirm() {
        const { deleteFunc } = this.props
        deleteFunc()
        this.props.toggle(null)
    }

    render() {
        const { isOpen, toggle, message } = this.props

        return (
            <div>
                <Modal
                    isOpen={isOpen}
                    toggle={()=>{toggle(null)}}
                    modalTitle={`Delete`}
                    modalBody={<span className="d-inline-block text-truncate" style={{maxWidth : '450px'}}>{message}</span>}
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