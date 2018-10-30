import React, { Component } from 'react';
import ReactTable from 'react-table'
import '../styles/table.css'
import Pagination from "./Pagination";

import { css } from 'react-emotion';
import { SyncLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Tables extends Component {
  render() {
    let { columns, data, loading, dataCount } = this.props
    
    return(
          <ReactTable
            loading={loading}
            loadingText={
              <div className='sweet-loading'>
                <SyncLoader
                  className={override}
                  sizeUnit={"px"}
                  size={8}
                  color={'#17C1BC'}
                  loading={true}
                />
              </div> 
            }
            noDataText="No Database Found!"
            PaginationComponent={Pagination}
            data={data}
            dataCount={dataCount}
            columns={columns}
            defaultPageSize={10}
            className="-highlight text-center"
          />
    );
  }
}

export default Tables;