import React, { Component } from 'react';
import { Button } from 'reactstrap';
import * as API from '../services/API';

import * as Help from '../toastify/helpers'
import Modal from '../components/Modal';

class UserDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this)
    }
    
    onConfirm() {
        const { updateTable } = this.props
        const { id } = this.props
        API.deleteRules(id)
        .then((response) => {
            const error = response.err || ''
            if (!error) {

                Help.toastPop({message: 'Deleted successfully...', type: 'error'})
                updateTable();
                return
            } else {
                this.props.onError(response.err.message)
            }
        })
        this.props.toggle()
    }

    render() {
        const { isOpen, toggle } = this.props
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