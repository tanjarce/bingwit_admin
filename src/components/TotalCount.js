import React, { Component } from 'react';

class TotalCount extends Component {
    render() {
        const rule = {
            text : 'Total of Rules',
            count : '6'
        }
        return (
            <div className='border'>
                {rule.text}{':'}{rule.count}
            </div>
        );
    }
}

export default TotalCount;