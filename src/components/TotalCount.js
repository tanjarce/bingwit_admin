import React, { Component } from 'react';

class TotalCount extends Component {
    render() {
        const rule = {
            text : this.props.text,
            count : this.props.count ? this.props.count : 0
        }
        return (
            <div className='ml-auto'>
                <small>
                    {
                        `Total of ${rule.text} : ${rule.count}`
                    }
                </small>
            </div>
        );
    }
}

export default TotalCount;