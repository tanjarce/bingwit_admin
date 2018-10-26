import React, { Component } from 'react';
import ReactTable from 'react-table'
import '../styles/table.css'
import Pagination from "./Pagination";


class Tables extends Component {
  render() {
    let { columns, data } = this.props
    
    return(
          <ReactTable
          noDataText="No Database Found!"
          PaginationComponent={Pagination}
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-highlight text-center"
          
          />
    );
  }
}

export default Tables;