import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container } from 'reactstrap';

class Banner extends Component {
    render() {
        const { header, contents } = this.props
        return (
            <div>
                <Jumbotron className="p-3 px-5">
                    {/* <Container className="p-0 m-0"> */}
                        <h1 className="display-5">{header}</h1>
                        <p className="lead">{contents}</p>
                    {/* </Container> */}
                </Jumbotron>
            </div>
        );
    }
}

Banner.propTypes = {
    header: PropTypes.string.isRequired,
    contents: PropTypes.string,
};

export default Banner;