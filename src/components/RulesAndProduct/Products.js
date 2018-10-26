import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.viewProduct = this.viewProduct.bind(this)

    }

    viewProduct (rowInfo) {
        const { id } = rowInfo
        console.log(rowInfo)
        const { history: { push, goBack } , location: { pathname } } = this.props

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
            selectedRow: {
                ...data,
            },
        }, () => {
            this.toggleModal()
        }
    )}

    deleteProduct () {
        API.deleteProductType(this.state.selectedRow.id)
        .then(res => {
            if(res.success){
                this.props.getAllProduct()
                Help.toastPop({message: `${res.product_type.name} Deleted`, type: 'error'})
            }
        }).catch(err => console.log(err))
    }

    componentDidMount(){
        console.log('get all product')
        this.props.getAllProduct()
    }
    


    render() {
        const { isOpen, selectedRow, modalType } = this.state
        const { productRow, productCount } = this.props

        const Products = productRow.map((product)=>{
            const aliases = product.product_type_alias.length ? product.product_type_alias.map(alias => alias.alias).join(", ") : '--'
            return (
                {
                    ...product,
                    'alias_names': aliases,
                    'updatedAt':  moment(product.updatedAt).format('MMMM D, YYYY'),
                    'action': {...product}}
            )
        })
        const columnsRules = [{
                Header: 'Product Name',
                accessor: 'name',
            },
            {
                Header: 'Alias Name',
                accessor: 'alias_names',
            },
            {
                Header: 'Date Created/Updated',
                accessor: 'updatedAt',
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
            : (<ProductModal isOpen={isOpen} toggle={this.toggleModal} selectedRow={selectedRow} type="edit" getAllProduct={this.props.getAllProduct}/>)
    
        return (
            <React.Fragment>
                    {
                        modal
                    }
                <SearchCount text="Product" count={productCount}/>
                <Table
                    columns={columnsRules} 
                    data={Products} />
            </React.Fragment>
        );
    }
}
export default withRouter(Products)
