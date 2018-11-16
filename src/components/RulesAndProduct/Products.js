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
            isLoading: true,
            selectedRow: null,
            modalType: 'delete',
            isOpen: false,
            productCount: 0,
            productRow: [],
            optionCategory: []
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.viewProduct = this.viewProduct.bind(this)
        this.getAllProduct = this.getAllProduct.bind(this)
        this.handleChangeFilterCategory = this.handleChangeFilterCategory.bind(this)
    }

    viewProduct (rowInfo) {
        const { id } = rowInfo
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
                this.getAllProduct()
                Help.toastPop({message: `${name} Deleted`, type: 'error'})
            }
        }).catch(err => console.log(err))
    }

    componentDidMount(){
        this.getAllProduct()
    }

    handleChangeFilterCategory(e){
        this.props.updateCategory(e.target.value, this.getAllProduct)
    }
    
    getAllProduct(paginationData, searchQData) {
        this.setState({
            isLoading: true
        })
        const updateTable = () => {
            const { pagination, searchQ, category} = this.props
            
            const data =  {
                searchQ : searchQ,
                category: category,
                ...pagination
            }
                
            API.getAllProductTypes(data)
            .then(res => {
                if(res.success){
                    this.setState(()=>({
                        productCount: res.product_type.count,
                        productRow: res.product_type.rows,
                        isLoading: false
                    }))
                }
                // return res.product_type.rows
            })
            .catch(err => {
                this.setState(()=>({
                    isLoading: false
                }))
                Help.toastPop({message: err, type: 'error'})
            })
        }

        // passing callback function so that it will update the table
        // after updating the queries in parent component
        this.props.updateQuery(paginationData, searchQData, updateTable)
    }

    render() {
        const { productRow, productCount, isOpen, selectedRow, modalType, isLoading } = this.state
        const { pagination, optionCategory} = this.props
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
            ? (<DeleteModal 
                isOpen={isOpen} 
                toggle={this.toggleModal} 
                deleteFunc={this.deleteProduct} 
                message={deleteMessage}/>)
            : (<ProductModal 
                isOpen={isOpen} 
                toggle={this.toggleModal} 
                optionCategory={optionCategory} 
                selectedRow={selectedRow} 
                type={modalType} 
                getAllProduct={this.getAllProduct}/>)
        return (
            <React.Fragment>
                {  
                    modal
                }
                <SearchCount text="Product" count={productCount} updateTable={this.getAllProduct}>
                    {/* <FormGroup> */}
                        {/* <Label for="exampleSelect" sm={2}>Category: </Label> */}
                            <Input type="select" name="select" id="exampleSelect" onChange={this.handleChangeFilterCategory} >
                                <option value="">All</option>
                                {
                                    optionCategory
                                }
                            </Input>
                    {/* </FormGroup> */}
                    <Button color="primary" className="ml-auto" size="sm" onClick={()=>{this.setModal(null, 'add')}}>&#43; Add Product</Button>

                </SearchCount>
                <Table
                    loading={isLoading}
                    columns={columnsProduct} 
                    dataCount={productCount}
                    paginationData={pagination}
                    updateTable={this.getAllProduct}
                    data={Products} 
                    />
            </React.Fragment>
        );
    }
}
export default withRouter(Products)
