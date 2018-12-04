import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class PostCompose extends Component{ 
    render(){
        return(
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    HELLO
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        this.props.postAnnouncement
                        this.props.toggle();
                    }}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle} type='submit' >Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}


export default PostCompose