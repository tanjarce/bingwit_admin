import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Label, Input, FormGroup } from 'reactstrap';

import TableSearch from '../TableSearch'
import Banner from '../Banner';
import CardUser from './CardUser'
import ModalSuspend from '../../modals/SuspensionModal'
import '../../styles/manage.css'

import users from '../dummyJSONdata/users.json'
import dots from '../../images/show_more.svg'
import SuspensionModal from '../../modals/SuspensionModal'
import UserDeleteModal from '../../modals/UserDeleteModal'



class ManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modaltype: 'delete',
            isOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.openModal = this.openModal.bind(this)
    }

    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }

    openModal (data, type) {
        this.setState({
            modaltype: type,
            UserData: {...data}
        }, ()=>{
            this.setState({
                isOpen: !this.state.isOpen,
            })
        })
    }

    render() {
        const Users = users.map((user)=>{
            return ({
                'username': user.username,
                'address': `${user.address.street}, ${user.address.suite}, ${user.address.city}`,
                'ratings': user.ratings,
                'account_status': (user.account_status)? 'active': 'inactive',
                'action': {...user}
            })
        })
        
        const columnsRules = [{
                Header: 'Account User',
                accessor: 'username',
                width: 300
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                accessor: 'ratings',
                Header: 'Ratings',
                width: 100
            },{
                Header: 'Account Status',
                accessor: 'account_status',
                width: 220
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
                            <DropdownItem onClick={() => {this.openModal(rowInfo.value, 'suspend') }}>Suspend</DropdownItem>
                            <DropdownItem onClick={()=>{this.openModal(rowInfo.value, 'delete')}}>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }]

        const { isOpen, UserData } = this.state
        
        const modal = (this.state.modaltype === 'suspend') 
            ? (<SuspensionModal isOpen={isOpen} toggle={this.toggleModal} userData={UserData} />)
            : (<UserDeleteModal isOpen={isOpen} toggle={this.toggleModal} userData={UserData} />)
        
        return (
            <div className='bottom-pad'>
                { modal }
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <Container>
                    <Switch>
                        <Route exact path="/mnguser" render={()=>(
                            <TableSearch 
                                columns={columnsRules} 
                                data={Users} />
                        )}/>
                        <Route path="/mnguser/prim" render={()=>(
                            <CardUser />
                        )}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default ManageUser;