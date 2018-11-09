import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


import SearchAndCount from '../SearchAndCount'
import Tables from '../Tables'
import '../../styles/manage.css'

import dots from '../../images/show_more.svg'
import SuspensionModal from '../../modals/SuspensionModal'
import UserDeleteModal from '../../modals/UserDeleteModal'
import userDefafult from '../../assets/userDefault.svg'

class TableUser extends Component {
   render() {
        const { dataUsers, count, pagination, isOpen, userData, modalType, loading, updateTable, orderSort, viewUser, setModal, toggleModal, suspendUser } = this.props
        
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
                Header: <div onClick={()=> {orderSort('username')}}>Account User</div>,
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
                Header: <div onClick={()=> {orderSort('full_name')}}>Full Name</div>,
                accessor: 'name',
                sortable : false,
                width: 200
            },
            {
                Header: <div onClick={()=> {orderSort('address')}}>Address</div>,
                accessor: 'address',
                sortable : false,
            },
            {
                Header: <div onClick={()=> {orderSort('rating')}}>Ratings</div>,
                accessor: 'ratings',
                sortable : false,
                width: 120
            },
            {
                Header: <div onClick={()=> {orderSort('type')}}>Role</div>,
                accessor: 'role',
                width: 150,
                sortable : false
            },
            {
                Header: <div onClick={()=> {orderSort('status')}}>Account Status</div>,
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
                            <DropdownItem onClick={() => {viewUser(rowInfo.value)}}>View</DropdownItem>
                            {/* <DropdownItem onClick={() => {this.setModal(rowInfo.value, 'suspend') }}>Suspend</DropdownItem> */}
                            <DropdownItem onClick={()=>{setModal(rowInfo.value, 'delete')}}>Suspend</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }]
        
        const modal = (modalType === 'suspend') 
            ? (<SuspensionModal isOpen={isOpen} toggle={toggleModal} userData={userData} />)
            : (<UserDeleteModal suspendUser={suspendUser} isOpen={isOpen} toggle={toggleModal} userData={userData} />)
        
        return (
            <React.Fragment>
            { modal }
                <SearchAndCount updateTable={updateTable} text="Users" count={count}/>
                <Tables
                    loading={loading}
                    columns={columnsRules} 
                    dataCount={count}
                    paginationData={pagination}
                    updateTable={updateTable} 
                    data={Users} />
            </React.Fragment>
        );
    }
}

export default withRouter(TableUser);