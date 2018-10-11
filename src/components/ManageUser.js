import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import TableSearch from './TableSearch'
import { Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Banner from './Banner';
import CardUser from './CardUser'
import '../styles/manage.css'
// import * as permissions from '../permissions/permissions'
import users from './dummyJSONdata/users.json'
import dots from '../images/show_more.svg'

const Users = users.reduce((final, user)=>{
    final.push({
        'username': user.username,
        'address': `${user.address.street}, ${user.address.suite}, ${user.address.city}`,
        'ratings': user.ratings,
        'account_status': (user.account_status)? 'active': 'inactive',
        'action': {...user}
    })
    return final
}, [])

// console.log(Users)

const columnsRules = [{
    Header: 'Account User',
    accessor: 'username',
    width: 300
  },
  {
    Header: 'Address',
    accessor: 'address',
    // width: 400
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    width: 100
  },{
    Header: 'Account Status',
    accessor: 'account_status',
    width: 220
  },{
    Header: ' ',
    accessor: 'action',
    width: 50,
    Cell: row => 
    {
        console.log(row)
        return (
            <UncontrolledDropdown className="text-muted" size="sm">
                <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
                    <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag={Link} to="/mnguser/prim">View</DropdownItem>
                    <DropdownItem>Suspend</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
  }]



class ManageUser extends Component {
    render() {
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Manage User"
                    contents="List of Registered Users."/>
                <Container>
                    <Switch>
                        <Route exact path="/mnguser" render={()=>(
                            <TableSearch columns={columnsRules} data={Users} />
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