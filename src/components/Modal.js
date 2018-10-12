import React, { Component } from 'react';
import { Modal as Mod, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class Modal extends Component {
    isOnLast = () => {
        return this.props.onStep === this.props.length
    }
    render() {
        const { size, height, isOpen, toggle, modalTitle, modalBody, modalFooter } = this.props
        return (
            <div>
                <Mod isOpen={isOpen} toggle={toggle} size={size}>
                    <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                    <ModalBody style={{
                        height: `${height ? height : "auto"}`
                    }}>
                        {modalBody}
                    </ModalBody>
                    <ModalFooter>
                        {modalFooter}
                    </ModalFooter>
                </Mod>
            </div>
        );
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    buttons: PropTypes.array,
    modaTitle: PropTypes.string,
    modalBody: PropTypes.element,
    modalFooter: PropTypes.element,
    next: PropTypes.func,
    prev: PropTypes.func,
};

export default Modal;