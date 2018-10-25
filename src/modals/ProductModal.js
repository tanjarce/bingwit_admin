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
            },
            addedAliases : [],
            deletedAliases : [],
        }
        this.aliasInput = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.addAlias = this.addAlias.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.reset = this.reset.bind(this)
        this.toggleOut = this.toggleOut.bind(this)    
        this.addAliasNames = this.addAliasNames.bind(this)
        this.AddedSuccessfully = this.AddedSuccessfully.bind(this)
    }

    componentWillReceiveProps(){
        const { selectedRow, type } = this.props
        console.log(selectedRow)
        if(type === 'edit'){
            this.setState({
                value: {
                    product_name: selectedRow.name
                }
            })
            API.getAliasName(selectedRow.id)
                .then(res => {
                    if(res.success){
                        this.setState((prevState)=>({
                            value: {
                               ...prevState.value,
                                // product_name: selectedRow.name,
                                alias_names: res.aliases || []
                            }
                        }), ()=>{
                            // console.log(this.state.value)
                        })
                    }
                }).catch(err => console.log(err))
        
        }
    }   

    // add aliases integrated to backend
    addAliasNames (id, aliases) {
        return API.addAliasName(id, aliases)
            .then(res => {
                if(res.success){
                    return {success: true}
                }
            })
    }

    AddedSuccessfully () {
        this.toggleOut()
        this.props.getAllProduct()
        Help.toastPop({message: 'Product added successfully', type: 'success'})
    }

    addProduct () {
        const {value: {product_name, alias_names}} = this.state

        // add product type
        API.addProductType({'name': product_name})
            .then(res => {
                if(res.success){
                    // checked if there is inputed aliases
                    if(alias_names.length > 0){
                        const id = res.product_type.id
                        const aliases = alias_names.map( alias => alias.alias).join(',') 

                        this.addAliasNames(id, aliases)
                            .then(res => {
                                if(res.success){
                                    this.AddedSuccessfully()
                                }
                            }).catch(err => console.log(err))
                    }
                    else{
                        this.AddedSuccessfully()
                    }
                }

            })
            .catch(err => console.log(err))
    
    }

    saveEdit () {
        const { deletedAliases, addedAliases} = this.state
        const { selectedRow: {id} } = this.props

        console.log(deletedAliases)
        console.log(addedAliases)

        if(addedAliases.length > 0){
            const addedAliasesString = addedAliases.map(alias => alias.alias).join(',')
            
            this.addAliasNames(id, addedAliasesString)
            .then(res => {
                if(res.success){
                    this.toggleOut()
                    this.reset()
                    this.props.getAllProduct()
                    console.log(res)
                    Help.toastPop({message: 'Edit Save', type: 'success'})
                }
            }).catch(err => console.log(err))
        }
        // toast.toastPop({
        //     'message': 'successfully saved the changes',
        //     'type': 'success',
        //     'autoClose': '3000'
        // })
        // console.log('save changes')
        // this.toggleOut()
    }

    getProductType(){

    }

    getAliases(){
        
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

    // adding aliases in state only
    addAlias(e){
        e.preventDefault()
        const {alias_name_input, addedAliases} = this.state
        
        const copyAddedAliases = addedAliases ? [...addedAliases] : []

        if(alias_name_input.trim() !== ''){
            const addedAlias = {'alias': alias_name_input, 'index': addedAliases.length}
            copyAddedAliases.push(addedAlias)
            this.setState((prevState)=>({
                value: {
                    ...prevState.value,
                    alias_names: [ addedAlias, ...prevState.value.alias_names ]
                },
                addedAliases: copyAddedAliases,
                alias_name_input: ''
            }), ()=>{
                this.aliasInput.current.focus()
            })
        }
    }

    // deleting aliases in state only
    deleteAlias(index, data){
        const { value: {alias_names}, addedAliases} = this.state

        const copyAlias = alias_names
            .filter((name, indx)=> {
                return index !== indx
            })
        
        this.setState((prevState)=>({
            value: {
                ...prevState.value,
                alias_names: copyAlias 
            }
        }))    
        
        if(data.id){
            // console.log('push to pending deleted')
            // console.log(data)
            this.setState((prevState)=>({
               deletedAliases: [...prevState.deletedAliases, {'alias_id': data.id, 'productType_id': data.product_typeId }]
            }),()=>{
                // console.log(this.state.deletedAliases)
            })
        } else{
            const copyAddedAliases = addedAliases.filter((aliases, indx) => {
                return indx !== data.index
            })
            this.setState(()=>({
                addedAliases: copyAddedAliases
            }), () => {
                // console.log(this.state.addedAliases)
            })
        }

        // console.log(copyAlias)
        
        // console.log(index, data.index)

        // if(this.props.type === 'edit' && data.id & data.product_typeId){
        //     // console.log(data)
        //     const aliasId = data.id
        //     const productTypeId = data.product_typeId

        //     console.log(aliasId)
        //     console.log(productTypeId)
        //     API.deleteAliasName(productTypeId, aliasId)
        //         .then(res => console.log(res))
        // }
        
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
            },
            addedAliases : [],
            deletedAliases : []
        })
    }

  render() {
    const { isOpen, type } = this.props;
    const {alias_name_input, value: { product_name, alias_names }} = this.state;

    const list_alias = (alias_names)
        ? alias_names
        .map((name, index) => {
            return(
            <ListGroupItem key={index}>
                <span>{name.alias}</span>
                <span
                className="float-right text-muted"
                style={{ fontSize: "25px", cursor: "pointer", lineHeight: "100%" }}
                onClick={() => {
                    this.deleteAlias(index, name);
                }}
                >
                &times;
                </span>
            </ListGroupItem>
        )})
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
