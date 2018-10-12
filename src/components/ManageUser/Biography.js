import React, { Component } from 'react';

class Biography extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className='main-facts'>
                <div>
                    <h4 className='font-weight-bold'>{user.name}</h4>
                    <p className='text-muted role'>{user.role}</p>
                </div>
                    <p className='text-muted'>Biography:</p>
                    <div className='bio'>
                        <p className='text-justify'>{user.bio}</p>
                    </div>
            </div>
        );
    }
}

export default Biography;