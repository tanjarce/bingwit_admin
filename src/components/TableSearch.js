import React, { Component } from 'react';

import Search from './Search'
import Table from './Tables'
class RulesTable extends Component {
    render() {
        const { columns, data } = this.props; 
        return (
            <div>
                <Search />
                <Table columns={columns} data={data}/>
            </div>
        );
    }
}

export default RulesTable;