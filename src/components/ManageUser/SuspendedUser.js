import React, { Component } from 'react'
import Tables from '../Tables'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import userDefafult from '../../assets/userDefault.svg'
import * as Help from '../../toastify/helpers'

import UserDeleteModal from '../../modals/UserDeleteModal'
import * as API from '../../services/API'
import dots from '../../images/show_more.svg'
import SearchAndCount from '../SearchAndCount'

class SuspendedUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalType: 'delete',
            isOpen: false,
            selectedRow: null,
            userReport : [],
            count : '',
            loading : true,
            bool : true,
            pagination: {
                offset: 0,
                limit: 10
            },
            searchQ: ''
        }
        this.viewItem = this.viewItem.bind(this)
        this.getSuspendUsers = this.getSuspendUsers.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.setModal = this.setModal.bind(this)
        this.suspendUser = this.suspendUser.bind(this)
    }

    componentWillMount(){
        this.getSuspendUsers();
    }

    suspendUser() {
        const { selectedRow } = this.state
        this.setState({
            loading : true
        })
        API.suspendUser( selectedRow.id )
        .then((response) => {
            response.success ? 
            (
            this.getSuspendUsers(),
            Help.toastPop({message: `Activate successfully`, type: 'success'})
            )
            :
            Help.toastPop({message: response.error.message, type: 'error'})
        })
    }

    viewItem (rowInfo) {
        this.props.history.push(`/mnguser/users/${rowInfo.id}`)
    }

    loading(){
        this.setState({
            loading : true
        })
    }
    getSuspendUsers(paginationData, searchQData){
        this.setState((prevState)=>({
            loading: true,
            searchQ: (typeof searchQData !== 'undefined') ? searchQData.trim() : prevState.searchQ,
            pagination: paginationData ? {...paginationData} : prevState.pagination
        }), ()=>{
            const { pagination, searchQ } = this.state 
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
            API.getSuspendUsers(data)
            .then((response) => {
                if(response.success){ 
                    this.setState({
                        userReport : response.users.rows,
                        count : response.users.count,
                        loading : false
                    })
                }
                else{
                    Help.toastPop({message: response.error.message, type: 'error'})
                }
            }).catch(error =>{
                Help.toastPop({message: error, type: 'error'})
            })
        })

    }    

    toggleModal (rowInfo) {
        this.setState((prevState)=>({
            isOpen: !this.state.isOpen,
            userData: rowInfo ? {...rowInfo} : prevState.selectedRow,
            selectedRow : rowInfo ? {...rowInfo} : prevState.selectedRow
        }))
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
    const { userReport, userData, count, isOpen, loading , pagination } = this.state;
    const Reports = userReport.map((user)=>{
        return ({
            'username': user.username,
            'full_name': user.full_name,
            'type': user.type,
            'status': user.status,
            'action': {...user}
            
        })
    })
    const columnsRules = [
        {
            Header: 'Username',
            accessor: 'username',
            width: 200,
            Cell: rowInfo =>  {
                return (
                    <div>
                        <span className="mr-3" style={{'display': 'inlineBlock', 'width': '25px', 'height': '25px'}}>
                            <img 
                            alt = 'img'
                            width="25px" height="25px" 
                            src={rowInfo.original.action.image_url ? rowInfo.original.action.image_url : userDefafult} 
                            className="m-auto rounded-circle"/>
                        </span>
                        {rowInfo.value}
                    </div>
                )
            }
        },
        {
            Header: 'Full Name',
            accessor: 'full_name',
        },
        {
            Header: 'Role',
            accessor: 'type',
        },
        {
            Header: 'Status',
            accessor: 'status',
            width: 180
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
                            <DropdownItem onClick={()=>{this.viewItem(rowInfo.value)}}>View</DropdownItem>
                            <DropdownItem onClick={() => this.toggleModal(rowInfo.value)}>Activate</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
        }]
    return (
        <React.Fragment>
            <SearchAndCount updateTable={this.getSuspendUsers} text="Suspend" count={count}/>
            <UserDeleteModal isOpen={isOpen} toggle={this.toggleModal} userData={userData}  suspendUser={this.suspendUser}/>
            <Tables 
                loading = {loading}
                columns={columnsRules} 
                dataCount={count}
                paginationData={pagination}
                updateTable={this.getReport} 
                data={Reports} />
            </React.Fragment>
    )
  }
}

export default SuspendedUser