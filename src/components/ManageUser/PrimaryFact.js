import React, { Component } from 'react';

class PrimaryFact extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className='main-facts'>
                <div>
                    <h4 className='font-weight-bold'>{user.name}</h4>
                    <p className='text-muted role'>{user.role}</p>
                </div>
                <div className='space'>
                    <p className='d-inline align-top'>Username: <span className='px-4'>{user.username}</span></p><br/>
                    <p className='d-inline align-top'>Address: <span className='px-4'>{user.address}</span></p><br/>
                    <p className='d-inline'>Province: <span className='px-4'>{user.province}</span></p><br/>
                </div>
                <div className='space'>
                    <p className='d-inline'>Contact: <span className='px-4'>{user.contact}</span></p><br/>
                    <p className='d-inline'>Status: <span className='px-4'>{user.status}</span></p><br/>
                    <p className='d-inline'>Ratings: <span className='px-4'>{user.ratings}</span></p><br/>
                    <p className='d-inline'>Total Sales: <span className='px-4'>&#8369; {user.sales}</span></p>
                </div>
            </div>
        );
    }
}

export default PrimaryFact;