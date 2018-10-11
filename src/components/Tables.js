import React, { Component } from 'react';
// import { Row, Col } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ReactTable from 'react-table'
import '../styles/table.css'
import Pagination from "./Pagination";
import dots from '../images/show_more.svg'
import { Link } from 'react-router-dom'


class Tables extends Component {
  render() {
    let { columns, data } = this.props
    // if(!this.props.action){
    //   console.log("walang action")
    // }
    // console.log(data)
    // columns.push({
    //   Header: ' ',
    //   accessor: 'action',
    //   width: 50,
    //   Cell: row => (
    //     <UncontrolledDropdown className="text-muted" size="sm">
    //         <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
    //             <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
    //         </DropdownToggle>
    //         <DropdownMenu>
    //             <DropdownItem tag={Link} to="/mnguser/prim">View</DropdownItem>
    //             <DropdownItem>Suspend</DropdownItem>
    //             <DropdownItem>Delete</DropdownItem>
    //         </DropdownMenu>
    //     </UncontrolledDropdown>
    //   )
    // })
    
    return(
          <ReactTable
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