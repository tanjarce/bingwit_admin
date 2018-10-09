import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container } from 'reactstrap';
import '../styles/manage.css'
class Banner extends Component {
    render() {
        const { header, contents } = this.props
        return (
            <div>
                <Jumbotron fluid className='main'>
                    <Container>
                        <span className='header'>{header}</span>
                        <p className='body'>{contents}</p>
                    </Container>
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