import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import SetRules from './SetRules'
import DeleteModal from '../../modals/DeleteModal'

import rules from '../dummyJSONdata/rules.json'
import dots from '../../images/show_more.svg'


class RulesTable extends Component {
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
        const Rules = rules.map((rule)=>{
            return ({
                'number': rule.number,
                'description': rule.description,
                'date': rule.date,
                'action': {...rule}
            })
        })
        const columnsRules = [{
                Header: 'No.',
                accessor: 'number',
                width: 80
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Date Created',
                accessor: 'date',
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
                    data={Rules} />
                <SetRules/>
            </React.Fragment>
        );
    }
}
export default RulesTable;
