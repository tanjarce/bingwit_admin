import React, { Component } from 'react';

import Search from './Search'
import Table from './Tables'
import TotalCount from './TotalCount'
class RulesTable extends Component {
    render() {
        const { columns, data } = this.props; 
        return (
            <div>
                <Search />
                <TotalCount />
                <Table columns={columns} data={data}/>
            </div>
        );
    }
}

export default RulesTable;