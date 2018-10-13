import React, { Component } from 'react';
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import SetRules from './SetRules'

class RulesTable extends Component {
    render() {
        const { columns, data, actions } = this.props; 
        return (
            <React.Fragment>
                <SearchCount />
                <Table columns={columns} data={data} actions={actions}/>
                <SetRules/>
                </React.Fragment>
        );
    }
}
export default RulesTable;