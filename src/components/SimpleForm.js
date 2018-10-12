import React, { Component } from 'react';
// import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FormGroup, Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class SimpleForm extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit (event, errors, values) {
        // this.setState({errors, values});
        const { onRequestSubmit } = this.props
        if (errors.length !== 0) {
            return this.props.onFormError(errors)
        }
        onRequestSubmit(values)
      }
    render() {
        const { inputs, data, formErrorVisible, formOnDismissError, formErrorMessage } = this.props
        return (
            <div>
                <Alert color="danger" isOpen={formErrorVisible} toggle={() => {
                    formOnDismissError(false)
                }}>
                    {formErrorMessage}
                </Alert>
                <AvForm 
                    ref={instance => { this.form = instance}}
                    onSubmit={this.handleSubmit}>
                    {Object.keys(inputs).map((key, idx) => (
                        <div key={idx}>
                            <strong>{key}</strong>
                            {inputs[key].map((input, idx) => (
                                <div key={idx}>
                                    {input.type === 'select' && (
                                        <AvField
                                            required={input.isRequired}
                                            name={input.name}
                                            type={input.type}
                                            label={input.label}
                                            placeholder={input.label}
                                            autoComplete={input.name}
                                            value={data ? data[input.name] : ""}
                                        >
                                            {input.options.map((option, idx) => (
                                                <option key={idx}>{option}</option>
                                            ))}
                                        </AvField>
                                    )}
                                    {input.type !== 'select' && (
                                        <AvField
                                            required={input.isRequired}
                                            name={input.name}
                                            type={input.type}
                                            label={input.label}
                                            placeholder={input.label}
                                            autoComplete={input.name}
                                            value={data ? data[input.name] : ""}
                                            validate={input.validators || {}}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <FormGroup style={{
                        display: "none"
                    }}>
                        <Button>Submit</Button>
                    </FormGroup>
                    <Alert color="danger" isOpen={formErrorVisible} toggle={() => {
                        formOnDismissError(false)
                    }}>
                        {formErrorMessage}
                    </Alert>
                </AvForm>
            </div>
        );
    }
}

SimpleForm.propTypes = {
    inputs: PropTypes.object.isRequired
};

export default SimpleForm;