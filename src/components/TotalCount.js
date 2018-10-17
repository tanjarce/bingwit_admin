import React, { Component } from 'react';

class TotalCount extends Component {
    render() {
        const rule = {
            text : 'Total of Rules',
            count : this.props.count
        }
        return (
            <div className='mt-auto'>
                {rule.text}{':'}{rule.count}
            </div>
        );
    }
}

export default TotalCount;