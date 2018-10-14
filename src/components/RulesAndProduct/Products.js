import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import SetRules from './SetRules'
import DeleteModal from '../../modals/DeleteModal'

import products from '../dummyJSONdata/products.json'
import dots from '../../images/show_more.svg'


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            userData: {...data}
        }, () => {
            this.toggleModal()
        }
    )}

    render() {
        const Products = products.map((product)=>{
            return (
                {...product, 'action': {...product}}
            )
        })
        const columnsRules = [{
                Header: 'Product Name',
                accessor: 'product_name',
            },
            {
                Header: 'Alias Name',
                accessor: 'alias_name',
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
                                <DropdownItem onClick={this.toggleModal}>Edit</DropdownItem>
                                <DropdownItem onClick={this.toggleModal}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }]

        const { isOpen } = this.state
        return (
                <React.Fragment>
                    <DeleteModal isOpen={isOpen} toggle={this.toggleModal}/>
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
