import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, Form, InputGroupAddon, Input, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import DeleteModal from '../../modals/DeleteModal'

import dots from '../../images/show_more.svg'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import moment from 'moment'


class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRow: null,
            modalType: 'delete',
            isOpen: false,
            categories: [],
            categoryInput: '',
            categoryCount: 0,
            loading: true,
        }
        this.deleteCategory = this.deleteCategory.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.getAllCategories = this.getAllCategories.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.viewCategory =  this.viewCategory.bind(this)
    }

    componentDidMount(){
        this.getAllCategories();
    }

    handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        this.setState(()=>({
            [name]: value
        }))
    }

    handleSubmit(e){
        const { categoryInput } = this.state
        e.preventDefault()
        if(categoryInput.trim().length){
            console.log(categoryInput)
            API.addCategory(categoryInput)
                .then(res => {
                    if(res.success){
                        this.getAllCategories()

                        // this one is to update the category filter in product table
                        this.props.getAllCategory()
                        Help.toastPop({message: 'Product added successfully', type: 'success'})
                        this.setState(()=>({
                            categoryInput: ''
                        }))
                    }
                }).catch(err => console.log(err))
        }
        // console.log('fuck')
    }

    viewCategory (rowInfo) {
        const { id } = rowInfo
        console.log(rowInfo.id)
        const { history: { push, goBack } , location: { pathname } } = this.props

        console.log(pathname)
        this.props.history.push(`${pathname}/view/${id}`)
    }

    toggleModal (rowInfo) {
        this.setState((prevState)=>({
            isOpen: !this.state.isOpen,
            selectedRow : rowInfo ? {...rowInfo} : null
        }), ()=>{
            console.log(this.state.selectedRow)
        })
    }

    deleteCategory () {
        const { selectedRow } = this.state
        console.log(selectedRow.id)

        API.deleteCategory(selectedRow.id)
            .then(res => {
                if (res.success) {
                    Help.toastPop({message: 'Deleted successfully...', type: 'error'})
                    this.getAllCategories();

                    // this one is to update the category filter in product table
                    this.props.getAllCategory()
                } else {
                    Help.toastPop({message: 'something went wrong', type: 'error'})
                }
            }).catch(err => console.log(err))
    }

    getAllCategories(paginationData, searchQData){
        this.setState({loading: true})
     
        const func = () => {
            const {pagination, searchQ } = this.props 

            const data = {
                searchQ : searchQ,
                ...pagination
            }
            console.log(pagination)

            API.getCategories(data)
            .then((res) => {
                if(res.success){
                    console.log(res)
                    this.setState(()=>({
                        categoryCount: res.category.count,
                        categories: res.category.rows,
                        loading: false
                    }), ()=>{ console.log( this.state )})           
                }
            }).catch(err => console.log(err))
        }

        this.props.updateQuery(paginationData, searchQData, func)

    }
    
    render() {
        const { categoryCount, categories, isOpen, selectedRow, loading } = this.state
        const { pagination } = this.props
        // console.log(areas)
        
        const categoryRow = categories.map((category)=>{
            return ({
                ...category,
                'createdAt': moment(category.createdAt).format('MMMM D, YYYY'),
                'action': {...category}
            })
        })
        
        console.log(categories)
        // console.log(areaRow)
        
        const columnsAreas = [
            {
                Header: 'Product Category',
                accessor: 'name',
            },
            {
                Header: 'Created At',
                accessor: 'createdAt',
                width: 180
            },
            {
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

                                <DropdownItem onClick={()=>{this.viewCategory(rowInfo.value)}}>View</DropdownItem>
                                <DropdownItem onClick={()=>{this.toggleModal(rowInfo.value)}}>Delete</DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }
        ]
        const deleteMessage = (selectedRow) ? `Are you sure you want to delete ${selectedRow.name}?` : ''

        return (
            <React.Fragment>
                <DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteCategory} message={deleteMessage}/>
                <SearchCount text="Category" count={ categoryCount } updateTable={this.getAllCategories}/>
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input 
                            name="categoryInput"
                            onChange={this.handleChange}    
                        />
                        <InputGroupAddon addonType="append"><Button color="primary">Add Category</Button></InputGroupAddon>
                    </InputGroup>
                </Form>
                <Table
                    loading = {loading}
                    columns={columnsAreas}
                    dataCount={categoryCount}   
                    paginationData={pagination}
                    updateTable={this.getAllCategories}
                    data={categoryRow} />
            </React.Fragment>
        );
    }
}
export default withRouter(Categories)
