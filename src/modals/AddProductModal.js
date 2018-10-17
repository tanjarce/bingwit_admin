import React from 'react'
import { Button, Label, Input, FormGroup, ListGroup, ListGroupItem, InputGroup, InputGroupAddon } from 'reactstrap';
import Modal from '../components/Modal';

class SuspensionModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            suspensionPeriod : "5 days",
            alias_names: []
        }
        this.addProduct = this.addProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        const target = e.target
        this.setState(()=>({
            suspensionPeriod : target.value
        }))
    }
    
    addProduct (data) {
        // API POST request
        console.log(this.state.suspensionPeriod)
        this.props.toggle()
    }

    render(){
        const { isOpen, toggle, userData = null } = this.props
        const { alias_names } = this.state

        const list_alias_names = (alias_names.length > 0)
            ? (alias_names.map( (name, index) => (
                <ListGroupItem key={index} className="d-inline-flex align-items-center">
                    <span className="mr-auto">{name}</span>
                    <span onClick={()=>{console.log('ekis')} } style={{'cursor': 'pointer', 'fontSize': '20px'}}>&times;</span></ListGroupItem>
            )))
            : <ListGroupItem
            > There is no Alias... </ListGroupItem
            >

        return(
            <Modal 
                isOpen={isOpen} 
                toggle={toggle} 
                modalTitle= 'Add new product'
                modalBody= {
                    <React.Fragment>
                        <FormGroup>
                            <Label for="product_name" className="text-muted">Product Name:</Label>
                            <Input type="text" placeholder="product name" name="product_name" id="product_name" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="alias_name" className="text-muted">Alias Name:</Label>
                            <InputGroup className="mb-3">
                                <Input placeholder="alias name" />
                                <InputGroupAddon addonType="append">
                                    <Button>Add Alias</Button>
                                </InputGroupAddon>
                            </InputGroup>
                            <ListGroup style={{'maxHeight': '200px', 'overflow': 'auto'}}>
                                { list_alias_names }
                            </ListGroup>
                        </FormGroup>
                    </React.Fragment>
                }
                modalFooter= {
                    <React.Fragment>
                        <Button color="primary" onClick={this.addProduct}>Add</Button>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </React.Fragment>
                }
            />
        
        )
    }

}

export default SuspensionModal

