import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from 'moment'
import 'moment-timezone'

import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import SetRules from './SetRules'
import DeleteModal from '../../modals/DeleteModal'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'
import * as Help from '../../toastify/helpers'




class RulesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            getRule: [],
            count : '',
            selectedRow : null
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.updateTable = this.updateTable.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }
    componentDidMount(){
       this.updateTable();
    }
    updateTable(){
        API.getAllRules()
        .then((response) => {
            const error = response.error || ''
            if (!error) {
                const arr = response.map((item, key) => {
                    return ({
                        'description' : item.description,
                        'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                        'no' : key+1,
                        'action' : {...item}
                    })
                })
                this.setState({
                    getRule : arr,
                    count : arr.length
                })
                return
            } else {
                console.log(response.error.message)
            }


           
    })
    }
    toggleModal (rowInfo) {
        console.log(rowInfo)
        this.setState((prevState)=>({
            isOpen: !this.state.isOpen,
            selectedRow : rowInfo ? {...rowInfo} : prevState.selected
        }), ()=>{
            console.log(this.state.selectedRow)
        })
    }
    deleteItem (id) {
        API.deleteRules(id)
        .then((response) => {
            const error = response.err || ''
            if (!error) {

                Help.toastPop({message: 'Deleted successfully...', type: 'error'})
                this.updateTable();
                return
            } else {
                this.props.onError(response.err.message)
            }
        })
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
        const { getRule, isOpen, count, selectedRow } = this.state;
        const columnsRules = [{
                Header: 'No.',
                accessor: 'no',
                width: 80
            },
            {
                Header: 'Description',
                accessor: 'description',
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
                                <DropdownItem onClick={()=>{console.log('view')}}>View</DropdownItem>
                                <DropdownItem onClick={() => this.toggleModal(rowInfo.row)}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }]

        
        const rowInfo = selectedRow 
        ? { 
            'message': `Are you sure you want to delete rule no. ${selectedRow.no}.`,
            'id': selectedRow.action.id
        } : null

        return (
                <React.Fragment>
                    <DeleteModal isOpen={isOpen} toggle={this.toggleModal} selectedRow={rowInfo} deleteItem={this.deleteItem}/>
                <SearchCount count={count} text="Rules"/>
                <Table
                    columns={columnsRules} 
                    data={getRule} />
                <SetRules updateTable={this.updateTable}/>
            </React.Fragment>
        );
    }
}
export default RulesTable;
