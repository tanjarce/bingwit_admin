import React from 'react'
import { Button, Label, Input, FormGroup } from 'reactstrap';
import Modal from '../components/Modal';



class SuspensionModal extends React.Component{
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
                        <Input type="select" name="suspension_period" id="suspension_period">
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
                        <Button color="primary" onClick={this.toggle}>Suspend</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </React.Fragment>
                }
            />
        
        )
    }

}

export default SuspensionModal

