import React, { Component } from 'react';
import Banner from '../Banner.js';
import AnnouncementBody from './AnnouncementBody'

class Announcement extends Component {
    render() {
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Announcement"
                    contents="A public and typically formal statement about a fact, occurrence, or intention." 
                />
                <AnnouncementBody />
            </div>
        );
    }
}

export default Announcement;