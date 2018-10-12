import React, { Component } from 'react';
import logo from 'assets/logo.svg';

class Construction extends Component {
    render() {
        const { message, title } = this.props
        return (
            <div className="construction">
                <div className="construction-body">
                    <img src={logo} alt="Flag" className="img-construction" />
                    <h2>{title}</h2>
                    {message}
                </div>
                {/* <p>We're working hard to bring you </p> */}
            </div>
        );
    }
}

export default Construction;