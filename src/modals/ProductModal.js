import React from "react";
import {
  Button,
  Label,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Card,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import Modal from "../components/Modal";

class ProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias_name_input: '',
            value: {
                product_name: "",
                alias_names: ""
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.addAlias = this.addAlias.bind(this)
        // this.addAlias = this.addAlias.bind(this)
    }
    handleChange(e){
        const target = e.target
        
        if(target.name === 'product_name'){
            this.setState((prevState)=>({
                value:{
                    ...prevState.value,
                    product_name: target.value
                }
            }), ()=>{
                console.log(this.state.value.product_name)
            })
        }
        else{
            this.setState(()=>({
                alias_name_input: target.value
            }))
        }
    }
    addAlias(){
        const {alias_name_input, value: {alias_names}} = this.state
        const arr = alias_names === '' ? [] : alias_names.split(',')
        arr.unshift(alias_name_input)
        this.setState((prevState)=>({
            value: {
                ...prevState.value,
                alias_names: arr.join(',')
            }
        }))
    }



    componentWillReceiveProps(){
        const { userData, type } = this.props

        if(type === 'edit'){
            this.setState(()=>({
                value: { 
                    ...userData,
                } 
            }))
        }
        
    }

  render() {
    const { isOpen, toggle, type, userData } = this.props;
    const {value: { product_name, alias_names }} = this.state;


    const list_alias = (alias_names !== '')
        ? alias_names
        .split(',')    
        .map((name, index) => (
            <ListGroupItem key={index}>
                <span>{name}</span>
                <span
                className="float-right text-muted"
                style={{ fontSize: "25px", cursor: "pointer", lineHeight: "100%" }}
                onClick={() => {
                    this.deleteAlias(index);
                }}
                >
                &times;
                </span>
            </ListGroupItem>
        ))
        : <ListGroupItem className="text-muted">Input Alias Names...</ListGroupItem>

    const title = type === "add" ? "Add New Product" : "Edit Product";

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        modalTitle={title}
        modalBody={
          <div>
            <FormGroup>
              <Label for="product_name" className="text-muted">
                Product Name
              </Label>
              <Input
                type="text"
                name="product_name"
                id="product_name"
                placeholder="product name"
                defaultValue={product_name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="alias_name" className="text-muted">
                Alias Name
              </Label>
              <InputGroup className="mb-2">
                <Input
                  type="text"
                  name="alias_name"
                  id="alias_name"
                  placeholder="alias name"
                  onChange={this.handleChange}
                />
                <InputGroupAddon addonType="append">
                  <Button onClick={this.addAlias}>Add Alias</Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <ListGroup
              style={{
                maxHeight: "200px",
                minHeight: "100px",
                overflow: "auto"
              }}
            >
              {list_alias}
            </ListGroup>
          </div>
        }
        modalFooter={
          <React.Fragment>
            <Button
              color="primary"
              onClick={() => {
                console.log("add product");
              }}
            >
              Add Product
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </React.Fragment>
        }
      />
    );
  }
}

export default ProductModal;
