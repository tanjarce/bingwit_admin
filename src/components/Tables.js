import React, { Component } from 'react';
import ReactTable from 'react-table'
import * as permissions from '../permissions/permissions'

class Tables extends Component {
render() {
    
  const data = permissions.data;

  const columns = [{
    Header: 'No:',
    accessor: 'number', // String-based value accessors!
    width: 80,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: 'Date Created',
    accessor: 'date',
    width: 200
  },
  {
    Header: ' ',
    accessor: ' ',
    width: 50
  }]
return(
  <ReactTable
  data={data}
  columns={columns}
  defaultPageSize={10}
  className="-highlight"
/>
);
}
}

export default Tables;