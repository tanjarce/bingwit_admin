import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { Form, FormGroup, FormFeedback, Input, Label, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button,  Label, FormGroup, Col, Input, Fade  } from 'reactstrap';

import PropTypes from 'prop-types';

class MultiStepForm extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentWillUnmount = () => {
        console.log('will unmount')
    }
    handleSubmit (event, errors, values) {
        let value = JSON.stringify(values, null, 2)
        // unfinished
    }
    render() {
        const { onStep, steps, data, manualStep, onValueDidChange } = this.props
        return (
            <div>
                <Breadcrumb>
                {steps.map((step, idx) => (
                    <BreadcrumbItem 
                        key={idx} 
                        tag="span" 
                        active={idx === onStep}
                        onClick={() => {
                            manualStep(idx)
                        }}>
                        {step.title}
                    </BreadcrumbItem>
                ))}
                </Breadcrumb>
                <Col>
                    {/* <AvForm onSubmit={this.handleSubmit}> */}
                    {steps.map((step, idx) => (
                        <AvForm 
                            onSubmit={this.handleSubmit}
                            key={idx}>
                            {onStep === idx && (
                                <div>
                                {step.inputs.map((input, idx) => (
                                    <AvGroup row key={idx}>
                                        <Label for={input.name} sm={3}>{input.label}</Label>
                                        <Col sm={9}>
                                            {input.type === 'select' && (
                                                <AvInput required
                                                    id={input.name}
                                                    type={input.type} 
                                                    name={input.name} 
                                                    placeholder={input.label}
                                                    autoComplete={input.name} 
                                                    >
                                                    {input.options.map((option, idx) => (
                                                        <option key={idx}>{option}</option>
                                                    ))}
                                                </AvInput>
                                            )}
                                            {input.type !== 'select' && (
                                                <AvInput required
                                                        id={input.name}
                                                        type={input.type} 
                                                        name={input.name} 
                                                        placeholder={input.label}
                                                        autoComplete={input.name} 
                                                        />
                                            )}
                                            <AvFeedback>This is an error!</AvFeedback>
                                        </Col>
                                    </AvGroup>
                                ))}
                                    <FormGroup style={{
                                        visibility: "hidden"
                                    }}>
                                        <Button>Submit</Button>
                                    </FormGroup>
                                </div>
                            )}
                        </AvForm>
                    ))}
                    {/* </AvForm> */}
                 </Col>
                    {/* <Form
                        onSubmit={
                            () => {
                                console.log('onSubmit!')
                            }
                        }>
                        {steps[onStep].inputs.map((step, idx) => (
                            <FormGroup row key={idx}>
                                <Label for={step.name} sm={3}>{step.label}</Label>
                                <Col sm={9}>
                                    {step.type === 'select' && (
                                        <Input 
                                            id={step.name}
                                            type={step.type} 
                                            name={step.name} 
                                            placeholder={step.label}
                                            autoComplete={step.name} 
                                            value={data[step.name]}
                                            onChange={(e) => {
                                                onValueDidChange(step.name, e.target.value)
                                            }}
                                        >
                                            {step.options.map((option, idx) => (
                                                <option key={idx}>{option}</option>
                                            ))}
                                        </Input>
                                    )}
                                    {step.type !== 'select' && (
                                        <Input 
                                            invalid
                                            id={step.name}
                                            type={step.type} 
                                            name={step.name} 
                                            autoComplete={step.name}
                                            placeholder={step.label} 
                                            value={data[step.name]}
                                            onChange={(e) => {
                                                onValueDidChange(step.name, e.target.value)
                                            }} 
                                        />
                                    )}
                                    <FormFeedback>{`${step.invalidMessage}`}</FormFeedback>
                                </Col>
                            </FormGroup>
                        ))}
                    </Form> */}
            </div>
        );
    }
}

MultiStepForm.propTypes = {
    onStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired
};

export default MultiStepForm;