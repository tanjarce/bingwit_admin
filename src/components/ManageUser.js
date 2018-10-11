import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'

import TableSearch from './TableSearch'
import Banner from './Banner';
import CardUser from './CardUser'
import '../styles/manage.css'

import users from './dummyJSONdata/users.json'
import ActionDropdown from './ActionDropdown'

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
    Cell: rowInfo =>  
        <ActionDropdown info={rowInfo.value} options={[
            {'text': 'View', 'func': (info) => {console.log('view', info)}},
            {'text': 'Suspend', 'func': (info) => {console.log('view', info)}},
            {'text': 'Delete', 'func': (info) => {console.log('view', info)}},
        ]}/>
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