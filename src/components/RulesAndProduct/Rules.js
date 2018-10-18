import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import SetRules from './SetRules'
import DeleteModal from '../../modals/DeleteModal'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'
import Moment from 'react-moment';
import 'moment-timezone';

class RulesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            getRule: [],
            count : '',
            id : ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.updateTable = this.updateTable.bind(this)
    }
    componentDidMount(){
       this.updateTable();
    }
    updateTable(){
        API.getAllRules()
        .then((response) => {
<<<<<<< HEAD
            const error = response.error || ''
            if (!error) {
                const arr = response.map((item, key) => {
                    return ({
                        'description' : item.description,
                        'createdAt' : <Moment format="MMMM D, YYYY">{item.createdAt}</Moment>,
                        'no' : key+1,
                        'action' : {...item}
                    })
=======
            console.log(response)
            const arr = response.map((item, key) => {
                return ({
                    'description' : item.description,
                    'createdAt' : <Moment format="MMMM D, YYYY">{item.createdAt}</Moment>,
                    'no' : key+1,
                    'action' : {...item}
>>>>>>> master
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
    toggleModal (id) {
        this.setState({
            isOpen: !this.state.isOpen,
            id : id
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
        const { getRule, isOpen, count, id } = this.state;
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
                                <DropdownItem onClick={() => this.toggleModal(rowInfo.value.id)}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
            }]
        return (
                <React.Fragment>
                    <DeleteModal updateTable={this.updateTable} isOpen={isOpen} toggle={this.toggleModal} id={id} />
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
