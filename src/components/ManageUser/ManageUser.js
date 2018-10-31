import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';

import Tables from '../Tables'
import Banner from '../Banner';
import CardUser from './CardUser'
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
            pagination: {
                offset: 0,
                limit: 10
            },
            searchQ: ''
        }
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
            const { pagination, searchQ } = this.state 

            console.log(searchQ)

            const data = (typeof searchQData === 'undefined')
            ? {
                searchQ : searchQ,
                ...pagination
            }
            : {
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
    viewUser (id){
        this.props.history.push(`/mnguser/${id}`)
        
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
                Header: 'Account User',
                accessor: 'username',
                width: 200,
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
                Header: 'Role',
                accessor: 'role',
                width: 150
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
                resizable: false,
                Cell: rowInfo =>  
                (
                    <UncontrolledDropdown className="text-muted" size="sm">
                        <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
                            <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => {this.viewUser(rowInfo.value.id)}}>View</DropdownItem>
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
                    <Switch>
                        <Route exact path="/mnguser" render={()=>(
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
                        <Route path="/mnguser/:id" component={CardUser}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(ManageUser);