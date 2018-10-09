import React, { Component } from 'react';
import Banner from './Banner';
// import Construction from 'components/Construction';

class Maps extends Component {
    render() {
        return (
            <div>
                <Banner 
                    header="Maps"
                    contents="Hello I'm the map!" 
                />
            </div>
            // <Construction
            //     propFlag={true}
            //     title="Hey!"
            //     message={
            //         (
            //         <div>
            //             <p>Page under construction</p>
            //             <p>Patience is a virtue!</p>
            //         </div>
            //         )
            // }/>
        );
    }
}

export default Maps;