import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import DeleteModal from '../../modals/DeleteModal'
import ToggleAddForm from './ToggleAddForm'

import dots from '../../images/show_more.svg'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import moment from 'moment'


class Areas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRow: null,
            modalType: 'delete',
            isOpen: false,
            areas: [],
            areaCount: 0,
            loading: true,
            areaInput: '',
        }
        this.deleteArea = this.deleteArea.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.getAllArea = this.getAllArea.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.viewArea =  this.viewArea.bind(this)
    }

    componentDidMount(){
        this.getAllArea();
    }

    handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        this.setState(()=>({
            [name]: value
        }))
    }
    handleSubmit(areaInput){
        // const { areaInput } = this.state
        // e.preventDefault()
        if(areaInput.trim().length){
            API.addArea(areaInput)
                .then(res => {
                    if(res.success){
                        this.getAllArea()
                        Help.toastPop({message: 'Product added successfully', type: 'success'})
                        this.setState(()=>({
                            areaInput: ''
                        }))
                    }
                }).catch(err => console.log(err))
        }
        // console.log('fuck')
    }

    viewArea (rowInfo) {
        const { id } = rowInfo
        console.log(rowInfo)
        const { location: { pathname } } = this.props

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

    deleteArea () {
        const { selectedRow } = this.state
        console.log(selectedRow.id)
        API.deleteArea(selectedRow.id)
            .then(res => {
                if (res.success) {
                    Help.toastPop({message: 'Deleted successfully...', type: 'error'})
                    this.getAllArea();
                } else {
                    Help.toastPop({message: 'something went wrong', type: 'error'})
                }
            }).catch(err => console.log(err))
    }

    getAllArea(paginationData, searchQData){
        this.setState({loading: true})

        const func = () =>  {
            const {pagination, searchQ } = this.props 

            const data = {
                searchQ : searchQ,
                ...pagination
            }

            API.getAllAreas(data)
            .then((res) => {
                if(res.success){
                    console.log(res)
                    this.setState(()=>({
                        areaCount: res.area.count,
                        areas: res.area.rows,
                        loading: false
                    }), ()=>{ console.log( this.state )})           
                }
            }).catch(err => console.log(err))
        }

        this.props.updateQuery(paginationData, searchQData, func)

    }
    
    render() {
        const { areaCount, areas, isOpen, selectedRow, loading } = this.state
        const { pagination } = this.props
        // console.log(areas)
        
        const areaRow = areas.map((area)=>{
            return ({
                ...area,
                'createdAt': moment(area.createdAt).format('MMMM D, YYYY'),
                'action': {...area}
            })
        })
        // console.log(areaRow)
        
        const columnsAreas = [
            {
                Header: 'Area Address',
                accessor: 'area_address',
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

                                <DropdownItem onClick={()=>{this.viewArea(rowInfo.value)}}>View</DropdownItem>
                                <DropdownItem onClick={()=>{this.toggleModal(rowInfo.value)}}>Delete</DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }
        ]

        const deleteMessage = (selectedRow) ? `Are you sure you want to delete this?` : ''
        return (
            <React.Fragment>
                <DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteArea} message={deleteMessage}/>
                <SearchCount text="Area" count={ areaCount } updateTable={this.getAllArea}>
                        <ToggleAddForm handleSubmit={this.handleSubmit} text="Area" />
                </SearchCount>
                <Table
                    loading = {loading}
                    columns={columnsAreas}
                    dataCount={areaCount}   
                    paginationData={pagination}
                    updateTable={this.getAllArea}
                    data={areaRow} />
            </React.Fragment>
        );
    }
}
export default withRouter(Areas)
