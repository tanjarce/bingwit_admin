import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import ReactTable from 'react-table'
import '../styles/table.css'
import Pagination from "./Pagination";

class Tables extends Component {
render() {
  const { columns, data } = this.props
return(
  <Row>
    <Col>
  <ReactTable
  PaginationComponent={Pagination}
  data={data}
  columns={columns}
  defaultPageSize={10}
  className="-highlight text-center"
  />
    </Col>
  </Row>
);
}
}

export default Tables;