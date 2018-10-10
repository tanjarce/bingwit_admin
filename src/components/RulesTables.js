import React, { Component } from 'react';

import Search from './Search'
import Table from './Tables'
class RulesTable extends Component {
    render() {
        return (
            <div>
                <Search />
                <Table />
            </div>
        );
    }
}

export default RulesTable;