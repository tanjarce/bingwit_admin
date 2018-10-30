import React, { Component, Fragment } from 'react'
// import { Container } from 'reactstrap';

// import * as API from '../../services/API'



class ViewFeedback extends Component{
    constructor(props){
        super(props)

        this.goBack = this.goBack.bind(this)
    }
    goBack (){
        this.props.history.goBack()
    }

    render(){
        return(
            <Fragment>
                <button onClick={this.goBack} >back</button>
                <h1>feedback view</h1>
            </Fragment>
        )
    }
}

export default ViewFeedback 