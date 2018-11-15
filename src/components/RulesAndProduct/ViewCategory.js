import React, { Component } from 'react'
import {  Form, InputGroupAddon, InputGroup, Input, Button } from 'reactstrap';
import { withRouter, NavLink, Link } from 'react-router-dom'
import '../../styles/rule.css'
import * as API from '../../services/API'
import moment from 'moment'
import * as Help from '../../toastify/helpers'
import editIcon from '../../assets/edit-solid.svg'


class ViewCategory extends Component{
    constructor(props){
        super(props)
        this.state = {
            productTypes : [],
            productCategory: {},
            aliases: [],
            loading: true,
            categoryInput: '',
            edit: false
        }

        this.goBack = this.goBack.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getCategory = this.getCategory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this) 

    }

    handleChange (e) {
        const value = e.target.value
        this.setState((prevState)=>({
            categoryInput: value 
        }))
    }

    handleSubmit (e) {
        e.preventDefault()
        const { categoryInput } = this.state

        if(categoryInput.trim() !== ''){
            const id = this.props.match.params.id
            API.updateCategory(id, categoryInput)
                .then(res => {
                    if(res.success){
                        this.getCategory()
                        Help.toastPop({message: 'Changes Saved!', type: 'success'})
                        this.toggleEdit()
                        
                        
                        // update the options in category filter 
                        this.props.getAllCategory()
                    }
                }).catch(err => console.log(err))
        }
    }

    toggleEdit () {
        // console.log('edit')
        this.setState((prevState)=> ({
            edit: !prevState.edit
        }), ()=>{
            console.log(this.state.edit)
        })
    }

    componentDidMount(){
        this.getCategory()
    }
    getCategory () {
        const id = this.props.match.params.id

        API.getCategoryById(id)
            .then(res => {
                if(res.success){
                    console.log(res)
                    const productTypes = res.product_category.rows[0].product_type
                    const category = {name: res.product_category.rows[0].name}
                    this.setState((prevState)=>({
                        productTypes: productTypes, 
                        productCategory: {...category},
                        categoryInput: category.name,
                        loading: false
                    }), ()=>{console.log(this.state)})
                }
            }).catch(err => console.log(err))
    }

    goBack (){
        this.props.history.goBack()
    }

    render(){
        // const momentFormat = (data) => moment(data).format('MMMM D, YYYY')
        // const { match } = this.props
        const {productCategory, productTypes, loading, categoryInput, edit} = this.state

        const productTypeList = productTypes.length ? productTypes.map(productType => {
            return(
                <li key={productType.id}>
                    <Link to={`/list/products/view/${productType.id}`} >
                        {productType.name}
                    </Link>
                    {/* <p className="font-weight-normal m-0">{productType.name}</p> */}
                    {/* <small className=" text-muted">Created: {momentFormat(alias.createdAt)} · Updated: {momentFormat(alias.updatedAt)}</small> */}
                </li>
            ) 
        }) : <div>No Products in this Category</div>

        return(
            loading 
            ?<div>loading...</div> 
            : <div className='rule-body'> 
                <div className="my-3">
                    <NavLink to='#' activeClassName='gback' className="my-3" onClick={ (e)=>{
                        e.preventDefault()
                        this.goBack()
                    }}>
                        &lang; &nbsp; Go Back
                    </NavLink>
                </div>
                <div>
                    {
                        (edit)
                        ?(  <React.Fragment>
                                <Form onSubmit={this.handleSubmit}>
                                    <InputGroup>
                                        <Input 
                                            name="categoryInput"
                                            onChange={this.handleChange}    
                                            defaultValue={categoryInput}
                                        />
                                        <InputGroupAddon addonType="append"><Button color="primary">Save</Button></InputGroupAddon>
                                        <InputGroupAddon addonType="append"><Button type="button" color="secondary" onClick={this.toggleEdit}>Cancel</Button></InputGroupAddon>
                                    </InputGroup>
                                </Form>
                                {/* <button onClick={this.toggleEdit}>Save</button> */}
                            </React.Fragment>
                        )
                        :(  <React.Fragment>
                                <span className="d-inline-block productName">
                                    <h4>{productCategory.name}</h4>
                                    <span className="d-inline-flex align-items-center editIcon" onClick={this.toggleEdit}>
                                        edit <img src={editIcon} style={{'width': '18px', 'height': '18px', 'paddingLeft': '3px'}}/>
                                    </span>
                                </span>
                                
                            </React.Fragment>
                        )
                    }

                    {/* <h4 className="text-capitalize">Category: {productCategory.name}</h4> */}
                    <hr/>
                    <p className="m-0 mb-2">Products under <span className="font-weight-bold">{productCategory.name}</span> category:</p>
                    <ul>
                        { productTypeList }
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(ViewCategory)