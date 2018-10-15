import React, { Component } from 'react';

import Search from './Search'
import Table from './Tables'
class TableSearch extends Component {
    render() {
        const { columns, data, actions } = this.props; 
        return (
            <div>
                <Search />
                <Table columns={columns} data={data} actions={actions}/>
            </div>
        );
    }
}
export default TableSearch;
