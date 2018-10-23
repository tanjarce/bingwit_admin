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
        this.updateTable = this.updateTable.bind(this)
        this.deleteRule = this.deleteRule.bind(this)
    }
    
    componentDidMount(){
       this.updateTable();
    }

    updateTable(){
        API.getAllRules()
        .then((response) => {
          const error = response.error || ''
            if (!error) {
                const arr = response.rule.rows.map((item, key) => {
                    return ({
                        'no' : key+1,
                        'description' : item.description,
                        'createdAt' : moment(item.createdAt).format('MMMM D, YYYY'),
                        'action' : {...item, 'no': key+1}
                    })
                })
                this.setState({
                    ruleRow : arr,
                    count : response.rule.count
                })
                return
            } else {
                console.log(response.error.message)
            }
        })
    }

    toggleModal (rowInfo) {
        this.setState((prevState)=>({
            isOpen: !this.state.isOpen,
            selectedRow : rowInfo ? {...rowInfo} : prevState.selectedRow
        }))
    }

    deleteRule () {
        const { selectedRow } = this.state

        API.deleteRules(selectedRow.id)
        .then((response) => {
            if (response.success) {
                Help.toastPop({message: `Rule no. ${selectedRow.no} deleted.`, type: 'error'})
                this.updateTable();
            }
        }).catch(err => {
            Help.toastPop({message: err , type: 'error'})
        })
    }
    
    render() {
        const { ruleRow, isOpen, count, selectedRow } = this.state;
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
                                <DropdownItem onClick={() => this.toggleModal(rowInfo.value)}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }]
        const message = selectedRow ? `Are you sure you want to delete rule no. ${selectedRow.no}.` : ''
        return (
                <React.Fragment>
                    <DeleteModal isOpen={isOpen} toggle={this.toggleModal} deleteFunc={this.deleteRule} message={message}/>
                <SearchCount count={count} text="Rules"/>
                <Table
                    columns={columnsRules} 
                    data={ruleRow} />
                <SetRules updateTable={this.updateTable}/>
            </React.Fragment>
        );
    }
}
export default RulesTable;
