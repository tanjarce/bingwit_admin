import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap';

import TableUser from './UserTable'
import Tabs from '../Tabs'
import Banner from '../Banner';
import CardUser from './CardUser'
import SuspendedUser from './SuspendedUser'
import '../../styles/manage.css'

import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'

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
            searchQ: '',
            prevPath : ''
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
          this.setState({ prevPath: this.props.location })
        }
    }
    toggleModal () {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    viewUser (rowInfo){
        this.props.history.push(`/mnguser/users/${rowInfo.id}`)
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
        const { dataUsers, isOpen, pagination, count, userData, modalType, loading } = this.state
        const tabs = [
            {'text': 'Users', 'url': '/mnguser/users', 'notif': 0},
            {'text': 'Suspended Users', 'url': '/mnguser/suspended', 'notif': 0},
        ]
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <Container>
                    <Tabs links={tabs} />
                    <Switch>
                        <Route exact path="/mnguser/users" render={()=>(
                            <TableUser
                            dataUsers = {dataUsers}
                            isOpen = {isOpen}
                            updateTable={this.updateTable}
                            pagination={pagination}
                            count = {count}
                            userData = {userData}
                            modalType = {modalType}
                            loading = {loading}
                            orderSort = {this.orderSort}
                            toggleModal = {this.toggleModal}
                            suspendUser = {this.suspendUser}
                            viewUser = {this.viewUser}
                            setModal = {this.setModal}
                            />
                        )}/>
                        <Route path="/mnguser/suspended" component={SuspendedUser}/>
                        <Route path="/mnguser/users/:id" render={(props) => (
                            <CardUser {...props} prevPath={this.state.prevPath}/>
                        )}/>
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