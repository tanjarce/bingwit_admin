import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, FormGroup, Input, Label, Button, DropdownMenu, DropdownItem, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import DeleteModal from '../../modals/DeleteModal'
import ProductModal from '../../modals/ProductModal'

import dots from '../../images/show_more.svg'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import moment from 'moment'


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRow: null,
            modalType: 'delete',
            isOpen: false,
            optionCategory: []
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.viewProduct = this.viewProduct.bind(this)
        this.getAllProduct = this.getAllProduct.bind(this)
    }

    viewProduct (rowInfo) {
        const { id } = rowInfo
        console.log(rowInfo)
        const { location: { pathname } } = this.props

        this.props.history.push(`${pathname}/view/${id}`)
    }

    toggleModal (close) {
        if(close){
            this.setState(()=>({
                selectedRow: null
            }))
        }
        this.setState(()=>({
            isOpen: !this.state.isOpen,
            
        }))
    }

    setModal (data, type) {
        this.setState({
            modalType: type,
            selectedRow: data ? {
                ...data,
            } : null ,
        }, () => {
            this.toggleModal()
        }
    )}

    deleteProduct () {
        const { selectedRow: {id, name} } = this.state
        API.deleteProductType(id)
        .then(res => {
            if(res.success){
                console.log(res)
                this.props.getAllProduct()
                Help.toastPop({message: `${name} Deleted`, type: 'error'})
            }
        }).catch(err => console.log(err))
    }


    componentDidMount(){
        this.getAllProduct()
    }
    
    getAllProduct(paginationData, searchQData) {
        this.setState({
            isLoading: true
        })
        this.props.updateQuery(paginationData, searchQData)
        setTimeout(()=>{
            const { pagination, searchQ, category} = this.props
            
            const data =  {
                searchQ : searchQ,
                category: category,
                ...pagination
            }
                
            API.getAllProductTypes(data)
            .then(res => {

                if(res.success){
                    // transforming data

                    const productTypes = res.category.rows
                        .map((product)=>{
                            return {category: {name: product.name, id: product.id  }, product_types: product.product_type} 
                        })
                        .reduce((productTypes, product)=>{
                            // console.log(product)
                            const productCategory = product.category
                            product.product_types.map(product => {
                                productTypes.push(
                                    {...product, 'product_category': {...productCategory}}
                                )
                            })
                            return productTypes
                        }, [])

                    console.log(productTypes)
                    this.setState(()=>({
                        productCount: res.product_type_count[1],
                        productRow: productTypes,
                        isLoading: false
                    }), ()=>{
                        console.log(this.state)
                    })
                }
                // return res.product_type.rows
            })
            .catch(err => {
                this.setState(()=>({
                    isLoading: false
                }))
                Help.toastPop({message: err, type: 'error'})
            })
        },10)
    }

    render() {
        const { isOpen, selectedRow, modalType,  } = this.state
        const {   productRow, productCount, isLoading, getAllProduct, paginationData, optionCategory} = this.props
        const Products = productRow.map((product)=>{
            const aliases = product.product_type_alias.length ? product.product_type_alias.map(alias => alias.alias).join(", ") : '--'
            // console.log(product.product_category)
            return (
                {
                    ...product,
                    'alias_names': aliases,
                    'product_category': product.product_category.name,
                    'createdAt':  moment(product.createdAt).format('MMMM D, YYYY'),
                    'action': {...product}}
            )
        })

        const categoryOptions = optionCategory.map(category => {
            return(
                <option key={category.id} value={category.name} >{category.name}</option>
            )
        })

        const columnsProduct = [{
                Header: 'Product Name',
                accessor: 'name',
            },
            {
                Header: 'Aliases',
                accessor: 'alias_names',
            },
            {
                Header: 'Category',
                accessor: 'product_category',
            },
            {
                Header: 'Date Created',
                accessor: 'createdAt',
                width: 180
            },{
                Header: ' ',
                accessor: 'action',
                width: 50,
                Cell: rowInfo =>  
                    (
                        <UncontrolledDropdown className="text-muted" size="sm">
                            <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
                                <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={()=>{this.viewProduct(rowInfo.value)}}>View</DropdownItem>
                                <DropdownItem onClick={() => {this.setModal(rowInfo.value, 'edit') }}>Edit</DropdownItem>
                                <DropdownItem onClick={() => {this.setModal(rowInfo.value, 'delete') }}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }]


        const deleteMessage = (selectedRow) ? `Are you sure you want to delete ${selectedRow.name}?` : ''
        
        // checking what modal to be use
        const modal = (modalType === 'delete')
            ? (<DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteProduct} message={deleteMessage}/>)
            : (<ProductModal isOpen={isOpen} optionCategory={optionCategory} toggle={this.toggleModal} selectedRow={selectedRow} type={modalType} getAllProduct={this.props.getAllProduct}/>)
        return (
            <React.Fragment>
                    {  
                        modal
                    }
                <SearchCount text="Product" count={productCount} updateTable={this.props.getAllProduct}>
                    <FormGroup>
                        {/* <Label for="exampleSelect" sm={2}>Category: </Label> */}
                            <Input type="select" name="select" id="exampleSelect" onChange={this.props.updateCategory} >
                                <option value="">All</option>
                                {
                                    categoryOptions
                                }
                            </Input>
                    </FormGroup>
                    <Button color="primary" className="ml-auto" size="sm" onClick={()=>{this.setModal(null, 'add')}}>Add Product</Button>

                </SearchCount>
                <Table
                    loading={isLoading}
                    columns={columnsProduct} 
                    dataCount={productCount}
                    paginationData={paginationData}
                    updateTable={getAllProduct}
                    data={Products} />
            </React.Fragment>
        );
    }
}
export default withRouter(Products)
