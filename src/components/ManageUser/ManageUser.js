import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';


import Tabs from '../Tabs'
import Tables from '../Tables'
import Banner from '../Banner';
import CardUser from './CardUser'
import SuspendedUser from './SuspendedUser'
import SearchAndCount from '../SearchAndCount'
import '../../styles/manage.css'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'

import dots from '../../images/show_more.svg'
import SuspensionModal from '../../modals/SuspensionModal'
import UserDeleteModal from '../../modals/UserDeleteModal'
import userDefafult from '../../assets/userDefault.svg'

class ManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            dataUsers : [],
            count : '',
            userInfo : [],
            idSuspend : '',
            roleStat : '',
            loading : true,
            order : 'username',
            sort : 'ASC',
            pagination: {
                offset: 0,
                limit: 10
            },
            searchQ: ''
        }
        this.orderSort = this.orderSort.bind(this)
        this.loading = this.loading.bind(this)
        this.suspendUser = this.suspendUser.bind(this)
        this.updateTable = this.updateTable.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.viewUser = this.viewUser.bind(this)
    }
    componentDidMount(){
        this.updateTable();
    }
    loading(){
        this.setState({
            loading : true
        })
    }
    updateTable(paginationData, searchQData){
        this.setState((prevState)=>({
            loading: true,
            searchQ: (typeof searchQData !== 'undefined') ? searchQData.trim() : prevState.searchQ,
            pagination: paginationData ? {...paginationData} : prevState.pagination
        }), ()=>{
            const { pagination, searchQ, order, sort } = this.state 
            const data = (typeof searchQData === 'undefined')
            ? {
                order : order,
                sort : sort,
                searchQ : searchQ,
                ...pagination
            }
            : {
                order : order,
                sort : sort,
                searchQ: searchQ,
                ...pagination,
                offset: 0
            }
            API.getAllUser(data)
            .then((response) => {
                response.success === true ?
                    
                this.setState({
                    dataUsers : response.users.rows,
                    count : response.users.count,
                    loading : false
                })
                :
                console.log(response.error.message)
            })
        })

    }

    suspendUser(){        
        const { roleStat } = this.state
        if((roleStat.role !== 'admin' && roleStat.status !== 'inactive')){
        const { idSuspend } = this.state
        API.suspendUser(idSuspend)
        .then((response) => {
            response.success ? 
            (
            this.updateTable(),
            Help.toastPop({message: `Suspended successfully`, type: 'success'})
            )
            :
            Help.toastPop({message: response.error.message, type: 'error'})
        })
        }
        else{
            Help.toastPop({message: `You can't suspend this type.`, type: 'error'})
        }
    }

    toggleModal () {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    viewUser (rowInfo){
        this.props.history.push(`/mnguser/${rowInfo.id}`)
    }
    orderSort(order){
        const { sort } = this.state
            this.setState({
                order : order,
                sort : sort === 'ASC' ? 'DESC' : 'ASC'
            }, this.updateTable())
    }
    setModal (data, type) {
        console.log(data)
        this.setState({
            modalType: type,
            userData: {...data},
            idSuspend : data.id,
            roleStat : {
                role : data.type,
                status : data.status
            }
        }, () => {
            this.toggleModal()
        }
    )
    }
    render() {
        const tabs = [
            {'text': 'Users', 'url': '/mnguser/users', 'notif': 0},
            {'text': 'Suspended Users', 'url': '/mnguser/suspended', 'notif': 0},
        ]
        const { dataUsers, count, pagination } = this.state;
        
        const Users = dataUsers.map((user)=>{
            return ({
                'id' : user.id,
                'name': user.full_name,
                'username': user,
                'role': user.type,
                'address': user.address,
                'ratings': user.rating === null ? '- -' : user.rating,
                'account_status': user.status,
                'action': {...user}
            })
        })
        
        const columnsRules = [
            {
                Header: <div onClick={()=> {this.orderSort('username')}}>Account User</div>,
                accessor: 'username',
                width: 200,
                sortable : false,
                 Cell: rowInfo =>  {
                    return (
                        <div>
                            <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px'}}>
                                <img 
                                width="25px" height="25px" 
                                src={rowInfo.value.image_url ? rowInfo.value.image_url : userDefafult} 
                                className="m-auto rounded-circle"/>
                            </span>
                            {rowInfo.value.username}
                        </div>
                    )
                }
            },
            {
                Header: <div onClick={()=> {this.orderSort('full_name')}}>Full Name</div>,
                accessor: 'name',
                sortable : false,
                width: 200
            },
            {
                Header: <div onClick={()=> {this.orderSort('address')}}>Address</div>,
                accessor: 'address',
                sortable : false,
            },
            {
                Header: <div onClick={()=> {this.orderSort('rating')}}>Ratings</div>,
                accessor: 'ratings',
                sortable : false,
                width: 120
            },
            {
                Header: <div onClick={()=> {this.orderSort('type')}}>Role</div>,
                accessor: 'role',
                width: 150,
                sortable : false
            },
            {
                Header: <div onClick={()=> {this.orderSort('status')}}>Account Status</div>,
                accessor: 'account_status',
                sortable : false,
                width: 150
            },
            {
                Header: ' ',
                accessor: 'action',
                width: 50,
                sortable : false,
                resizable: false,
                Cell: rowInfo =>  
                (
                    <UncontrolledDropdown className="text-muted" size="sm">
                        <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
                            <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => {this.viewUser(rowInfo.value)}}>View</DropdownItem>
                            {/* <DropdownItem onClick={() => {this.setModal(rowInfo.value, 'suspend') }}>Suspend</DropdownItem> */}
                            <DropdownItem onClick={()=>{this.setModal(rowInfo.value, 'delete')}}>Suspend</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }]
        
        const { isOpen, userData, modalType, loading } = this.state
        
        // checking what modal to be use
        const modal = (modalType === 'suspend') 
            ? (<SuspensionModal isOpen={isOpen} toggle={this.toggleModal} userData={userData} />)
            : (<UserDeleteModal suspendUser={this.suspendUser} isOpen={isOpen} toggle={this.toggleModal} userData={userData} />)
        
        return (
            <div className='bottom-pad'>
                { modal }
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <Container>
                    <Tabs links={tabs} />
                    <Switch>
                        <Route exact path="/mnguser/users" render={()=>(
                            <React.Fragment>
                                <SearchAndCount updateTable={this.updateTable} text="Users" count={count}/>
                                <Tables
                                    loading={loading}
                                    columns={columnsRules} 
                                    dataCount={count}
                                    paginationData={pagination}
                                    updateTable={this.updateTable} 
                                    data={Users} />
                            </React.Fragment>
                        )}/>
                        <Route path="/mnguser/suspended" component={SuspendedUser}/>
                        <Route path="/mnguser/:id" component={CardUser}/>
                        <Route render={()=>(
                        <Redirect to="/mnguser/users" />
                    )}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(ManageUser);