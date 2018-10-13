import React, { Component } from 'react';

class TotalCount extends Component {
    render() {
        const rule = {
            text : 'Total of Rules',
            count : '6'
        }
        return (
<<<<<<< HEAD
            <div className='border'>
=======
            <div className='mt-auto'>
>>>>>>> master
                {rule.text}{':'}{rule.count}
            </div>
        );
    }
}

export default TotalCount;