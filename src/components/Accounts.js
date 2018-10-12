import React, { Component } from 'react';
import Banner from './Banner.js';
import AccountSetting from './AccountSetting'
class Accounts extends Component {
    render() {
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Account Setting"
                    contents="Informations of Admin." 
                />
                <AccountSetting />
            </div>
        );
    }
}

export default Accounts;