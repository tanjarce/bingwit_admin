import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import SetRules from './SetRules'
import DeleteModal from '../../modals/DeleteModal'
import ProductModal from '../../modals/ProductModal'

import products from '../dummyJSONdata/products.json'
import dots from '../../images/show_more.svg'


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: null,
            modalType: 'delete',
            isOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
    }

    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }

    setModal (data, type) {
        this.setState({
            modalType: type,
            userData: {
                ...data,
            }
        }, () => {
            this.toggleModal()
        }
    )}

    render() {
        const Products = products.map((product)=>{
            return (
                {
                    ...product, 
                    'alias_names': product.alias_names.join(', '),
                    'action': {...product}}
            )
        })
        const columnsRules = [{
                Header: 'Product Name',
                accessor: 'product_name',
            },
            {
                Header: 'Alias Name',
                accessor: 'alias_names',
            },
            {
                Header: 'Date Created',
                accessor: 'date_created',
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
                                <DropdownItem onClick={()=>{console.log('view')}}>View</DropdownItem>
                                <DropdownItem onClick={() => {this.setModal(rowInfo.value, 'edit') }}>Edit</DropdownItem>
                                <DropdownItem onClick={()=>{this.setModal(rowInfo.value, 'delete')}}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }]

        const { isOpen, userData, modalType} = this.state
        // checking what modal to be use
        const modal = (modalType === 'edit')
            ? (<ProductModal isOpen={isOpen} toggle={this.toggleModal} userData={userData} type="edit" />)
            : (<DeleteModal isOpen={isOpen} toggle={this.toggleModal} userData={userData} />)
    
        return (
                <React.Fragment>
                    {modal}
                <SearchCount />
                <Table
                    columns={columnsRules} 
                    data={Products} />
                <SetRules/>
            </React.Fragment>
        );
    }
}
export default Products;
