import React from "react";
import {
  Button,
  Label,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import * as toast from '../toastify/helpers'
import Modal from "../components/Modal";
import * as API from '../services/API'
import * as Help from '../toastify/helpers'

class ProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias_name_input: '',
            value: {
                product_name: "",
                alias_names: []
            }
        }
        this.aliasInput = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.addAlias = this.addAlias.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.reset = this.reset.bind(this)
        this.toggleOut = this.toggleOut.bind(this)    
    }
    addProduct () {
        const {value: {product_name}} = this.state
        this.props.getAllProduct()
        // API call here
        API.addProductType({'name': product_name})
            .then(res => {
                if(res.success){
                    this.toggleOut()
                    this.props.getAllProduct()
                    Help.toastPop({message: 'Product added successfully', type: 'success'})
                }

            })
            .catch(err => console.log(err))
    
    }

    saveEdit () {
        toast.toastPop({
            'message': 'successfully saved the changes',
            'type': 'success',
            'autoClose': '3000'
        })
        console.log('save changes')
    }

    handleChange(e){
        const target = e.target
        
        if(target.name === 'product_name'){
            this.setState((prevState)=>({
                value:{
                    ...prevState.value,
                    product_name: target.value
                }
            }))
        }
        else{
            this.setState(()=>({
                alias_name_input: target.value
            }))
        }
    }
    addAlias(e){
        e.preventDefault()
        const {alias_name_input, value: {alias_names}} = this.state
        const arr = [...alias_names]
        
        if(alias_name_input.trim() !== ''){
            arr.unshift(alias_name_input)
            this.setState((prevState)=>({
                alias_name_input: '',
                value: {
                    ...prevState.value,
                    alias_names: arr
                }
            }), ()=>{
                this.aliasInput.current.focus()
            })
        }
    }
    deleteAlias(index){
        const { value: {alias_names}} = this.state
        const copyAlias = alias_names
            .filter((name, indx)=> {
                return indx !== index && name
            })
        
        this.setState((prevState)=>({
            value: {
                ...prevState.value,
               alias_names: copyAlias 
            }
        }))    
    }
    

    toggleOut() {
        this.props.toggle()
        this.reset()
    }

    reset() {
        this.setState({
            alias_name_input: '',
            value: {
                product_name: "",
                alias_names: ""
            }
        })
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
    const { isOpen, type } = this.props;
    const {alias_name_input, value: { product_name, alias_names }} = this.state;


    const list_alias = (alias_names.length > 0)
        ? alias_names
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

    const btn = type === "add"
        ? (
            <Button
              color="primary"
              onClick={this.addProduct}>
              Add Product
            </Button>
        )
        : (
            <Button
              color="primary"
              onClick={this.saveEdit}>
              Save
            </Button>
        )

    return (
      <Modal
        isOpen={isOpen}
        toggle={this.toggleOut}
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
            <form onSubmit={this.addAlias}>
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
                        value={alias_name_input}
                        onChange={this.handleChange}
                        innerRef={this.aliasInput}
                    />
                    <InputGroupAddon addonType="append">
                    <Button onClick={this.addAlias}>Add Alias</Button>
                    </InputGroupAddon>
                </InputGroup>
                </FormGroup>
            </form>
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
            {
                btn
            }
            <Button color="secondary" onClick={this.toggleOut}>
              Cancel
            </Button>
          </React.Fragment>
        }
      />
    );
  }
}

export default ProductModal;
