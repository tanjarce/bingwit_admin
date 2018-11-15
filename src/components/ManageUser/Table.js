import React from "react";
// Import React Table
import ReactTable from "react-table";
import '../../styles/table.css'

import { css } from 'react-emotion';
import { SyncLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class Table extends React.Component {
  constructor() {
    super();
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    let { columns, data, loading, dataCount, defaultRow} = this.props

    return (
      <div>
        <ReactTable
          loading={false}
          data={data}
          columns={columns}
          defaultPageSize={defaultRow}
          showPagination={false}
          style={{
            height: "200px"
          }}
          className="-highlight text-center"
          noDataText="No Database Found!"
          loadingText={
            <div className='sweet-loading'>
              <SyncLoader
                className={override}
                sizeUnit={"px"}
                size={5}
                color={'#17C1BC'}
                loading={false}
              /></div> 
          }
        />
      </div>
    );
  }
}

export default Table


// import React, { Component } from 'react';
// import ReactTable from 'react-table'


// class Tables extends Component {
//   render() {
//     let { columns, data, loading, dataCount} = this.props
    
//     return(
//           <ReactTable
//           loading={true}
          
//           data={data}
//           dataCount={dataCount}
//           columns={columns}
//           defaultPageSize={10}
//           
//           />
//     );
//   }
// }

// export default Tables;