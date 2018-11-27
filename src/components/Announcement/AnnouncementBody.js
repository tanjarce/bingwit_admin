import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import { Route , Switch , Redirect, withRouter} from 'react-router-dom'
import trash from '../../assets/trash.svg'
import '../../styles/style.css'

import SubContainer from './SubContainer'
import Compose from './Compose'
import ViewAnnouncement from './ViewAnnouncement';

class Accounts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDelete : false
        }
        this.isDelete = this.isDelete.bind(this)
    }
    isDelete(){
        const { isDelete } = this.state
        this.setState({
            isDelete : !isDelete
        })
    }
    render() {
        const { isDelete } = this.state
        const arr = []
        for(let x = 0 ; x<100 ; x++){
            arr.push(<SubContainer isDelete={isDelete} x={x}/>)
        }
        return (
            <div className='all_padding'>
            <Row className='p-1'>
                <Col xs='3'>
                        <small className='text-muted' style={{cursor : 'pointer'}}>
                        Sort by: Date &#9662; </small>
                </Col>
                <Col xs='auto' onClick={this.isDelete} 
                style={{color : isDelete ? 'red' : '#7B8F9E', cursor : 'pointer'}}>
                        <img src={trash} alt='delete'/>
                        <small> Delete </small>
                </Col>
                <Col/>
                {this.props.location.pathname === "/announcement/compose" ? '' : 
                <Col xs='auto' onClick={()=>{
                    this.props.history.push('/announcement/compose')}}>
                    <small style={{cursor: 'pointer', color : '#17C1BC'}}>+ Compose</small></Col>}
            </Row>
            <Row>
                <Col xs='4'>
                <div className='scroll'>
                    {arr}
                </div>
                </Col>
                <Col>
                    <Switch>
                        <Route path='/announcement/compose' render={(props) => (
                            <Compose/>
                        )}/>
                        <Route path='/announcement/view-id' render={(props) => (
                            <ViewAnnouncement/>
                        )}/>
                        <Redirect to="/announcement/compose" />
                    </Switch>
                </Col>
            </Row>
            </div>
        );
    }
}

export default withRouter(Accounts);