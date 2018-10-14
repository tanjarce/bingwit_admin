import React from 'react'
import { Button, Label, Input, FormGroup } from 'reactstrap';
import Modal from '../components/Modal';

class SuspensionModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            suspensionPeriod : "5 days"
        }
        this.suspend = this.suspend.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        const target = e.target
        this.setState(()=>({
            suspensionPeriod : target.value
        }))
    }
    
    suspend (data) {
        // API POST request
        console.log(this.state.suspensionPeriod)
        this.props.toggle()
    }

    render(){
        const { isOpen, toggle, userData = null} = this.props
        return(
            <Modal 
                isOpen={isOpen} 
                toggle={toggle} 
                modalTitle= {`Suspend  ${ userData ? userData.username : '' }'s Account.`}
                modalBody= {
                    <FormGroup>
                        <Label for="suspension_period" className="text-muted">Suspension Period</Label>
                        <Input type="select" name="suspension_period" id="suspension_period" onChange={this.handleChange}>
                            <option>5 days</option>
                            <option>10 days</option>
                            <option>15 days</option>
                            <option>20 days</option>
                            <option>25 days</option>
                            <option>30 days</option>
                            <option>35 days</option>
                            <option>Until I activate it.</option>
                        </Input>
                    </FormGroup>
                }
                modalFooter= {
                    <React.Fragment>
                        <Button color="primary" onClick={this.suspend}>Suspend</Button>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </React.Fragment>
                }
            />
        
        )
    }

}

export default SuspensionModal

