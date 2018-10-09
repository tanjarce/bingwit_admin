import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class ForgotPassword extends Component {
    render() {
        return (
            <div>
                Forgot Password
                
                <Col className="text-center">
                    <Button color="primary" onClick={() => {
                        this.props.history.goBack()
                    }}>
                        Go Back
                    </Button>
                </Col>
            </div>
        );
    }
}

export default withRouter(ForgotPassword);