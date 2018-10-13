import React, { Component } from 'react';

import Search from './Search'
import Table from './Tables'
import TotalCount from './TotalCount'
<<<<<<< HEAD
class RulesTable extends Component {
=======
class TableSearch extends Component {
>>>>>>> master
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
<<<<<<< HEAD
export default RulesTable;
=======
export default TableSearch;
>>>>>>> master
