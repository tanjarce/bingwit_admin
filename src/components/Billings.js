import React, { Component } from 'react';
import Banner from './Banner.js';

class Billings extends Component {
    render() {
        return (
            <div>
                <Banner 
                    header="Billings"
                    contents="Manage all your bills here" 
                />
            </div>
        );
    }
}

export default Billings;