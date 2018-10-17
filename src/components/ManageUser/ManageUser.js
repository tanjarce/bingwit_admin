import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';

import Tables from '../Tables'
import Search from '../Search'
import Banner from '../Banner';
import CardUser from './CardUser'
import '../../styles/manage.css'

import users from '../dummyJSONdata/users.json'
import dots from '../../images/show_more.svg'
import SuspensionModal from '../../modals/SuspensionModal'
import UserDeleteModal from '../../modals/UserDeleteModal'



class ManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.viewUser = this.viewUser.bind(this)
    }

    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }
    viewUser (){
        console.log(this.props)
        this.props.history.push('/mnguser/user')
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
                            <DropdownItem onClick={this.viewUser}>View</DropdownItem>
                            <DropdownItem onClick={() => {this.setModal(rowInfo.value, 'suspend') }}>Suspend</DropdownItem>
                            <DropdownItem onClick={()=>{this.setModal(rowInfo.value, 'delete')}}>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }]
        
        const { isOpen, userData, modalType} = this.state
        
        // checking what modal to be use
        const modal = (modalType === 'suspend') 
            ? (<SuspensionModal isOpen={isOpen} toggle={this.toggleModal} userData={userData} />)
            : (<UserDeleteModal isOpen={isOpen} toggle={this.toggleModal} userData={userData} />)
        
        return (
            <div className='bottom-pad'>
                { modal }
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <Container>
                    <Switch>
                        <Route exact path="/mnguser" render={()=>(
                            <React.Fragment>
                                <Search />
                                <Tables
                                    columns={columnsRules} 
                                    data={Users} />
                            </React.Fragment>
                        )}/>
                        <Route path="/mnguser/user" render={()=>(
                            <CardUser />
                        )}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(ManageUser);