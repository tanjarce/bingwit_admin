import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';

import Tables from '../Tables'
import Banner from '../Banner';
import CardUser from './CardUser'
import SearchAndCount from '../SearchAndCount'
import '../../styles/manage.css'
import * as API from '../../services/API'

import dots from '../../images/show_more.svg'
import SuspensionModal from '../../modals/SuspensionModal'
import UserDeleteModal from '../../modals/UserDeleteModal'



class ManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            dataUsers : [],
            count : '',
            userInfo : []
        }
        this.updateTable = this.updateTable.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.viewUser = this.viewUser.bind(this)
    }

    toggleModal () {
        this.setState({isOpen: !this.state.isOpen})
    }
    viewUser (id){
        this.props.history.push(`/mnguser/${id}`)
        
    }
    componentDidMount(){
        this.updateTable();
    }

    updateTable(search){
        var tmp = ''
        if(search === undefined){
            tmp = ' ' 
        }
        else{
            tmp = search
        }
        API.getAllUser(tmp)
        .then((response) => {
            response.success === true ?
            
            this.setState({
                dataUsers : response.users.rows,
                count : response.users.count,
            })
            :
            console.log(response.error.message)
        })
    }
    setModal (data, type) {
        this.setState({
            modalType: type,
            userData: {...data}
        }, () => {
            this.toggleModal()
        }
    )
    }
    render() {
        const { dataUsers, count } = this.state;
        
        const Users = dataUsers.map((user)=>{
            return ({
                'id' : user.id,
                'name': user.full_name,
                'username': user.username,
                'role': user.type,
                'address': user.address,
                'ratings': user.rating === null ? '- -' : user.rating,
                'account_status': user.status,
                'action': {...user}
            })
        })
        
        const columnsRules = [{
                Header: 'Account User',
                accessor: 'username',
                width: 200
            },
            {
                Header: 'Full Name',
                accessor: 'name',
                width: 200
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                accessor: 'ratings',
                Header: 'Ratings',
                width: 120
            },
            {
                Header: 'Account Status',
                accessor: 'account_status',
                width: 150
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
                            <DropdownItem onClick={() => {this.viewUser(rowInfo.value.id)}}>View</DropdownItem>
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
                                <SearchAndCount updateTable={this.updateTable} text="Users" count={count}/>
                                <Tables
                                    columns={columnsRules} 
                                    data={Users} />
                            </React.Fragment>
                        )}/>
                        <Route path="/mnguser/:id" component={CardUser}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(ManageUser);