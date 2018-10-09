import React, { Component } from 'react';
import Banner from './Banner.js';

class Accounts extends Component {
    render() {
        return (
            <div>
                <Banner 
                    header="Accounts"
                    contents="Manage all generated customer accounts." 
                />
            </div>
        );
    }
}

export default Accounts;