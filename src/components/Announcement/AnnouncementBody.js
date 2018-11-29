import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import { Route , Switch , Redirect, withRouter} from 'react-router-dom'

import trash from '../../assets/trash.svg'
import '../../styles/style.css'
import SubContainer from './SubContainer'
import Compose from './Compose'
import ViewAnnouncement from './ViewAnnouncement';
import asc from '../../assets/asc.svg'
import desc from '../../assets/desc.svg'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'

import Moment from 'react-moment';
import 'moment-timezone';

import { css } from 'react-emotion';
import { SyncLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Announcement extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDelete : false,
            sortBy : true,
            data : [],
            loading : false,
            keyValue : ''
        }
        this.isDelete = this.isDelete.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.post = this.post.bind(this)
        this.getAllAnnouncement = this.getAllAnnouncement.bind(this)
        this.viewAnnouncement = this.viewAnnouncement.bind(this)
        this.delteAnnouncement = this.delteAnnouncement.bind(this)   
    }
    componentDidMount(){
        this.getAllAnnouncement()
    }
    getAllAnnouncement(){
        this.setState({
            loading : true
        })
        API.getAllAnnouncement()
        .then((response) => {
            if(response.success === true){ 
                const arr = []
                response.notifications.rows.map((item) => {
                    arr.push(item)
                })
            this.setState({
                data : arr,
                loading : false
            })
            }
            else
            {
            this.setState({
                loading : false
            })
            Help.toastPop({message: response.error.message, type: 'error'})
        }
        })
    }
    isDelete(){
        const { isDelete } = this.state
        this.setState({
            isDelete : !isDelete
        })
    }
    sortBy(){
        const { sortBy } = this.state
        this.setState({
            sortBy : !sortBy
        })
    }
    post(){
        alert('POST')
    }
    delteAnnouncement(id){
        API.delteAnnouncement(id)
        .then((response) => {
            if(response.success === true){
                this.props.history.push(`/announcement/compose`)
                Help.toastPop({message: 'Deleted Successfully', type: 'success'})
                this.getAllAnnouncement();
            }
            else
            {
            Help.toastPop({message: response.error.message, type: 'error'})
        }
        })
        
    }
    viewAnnouncement(e, id){
        this.props.history.push(`/announcement/${id}`)
        this.setState({
            keyValue : id
        })
        console.log('CLICKED')
    }
    render() {
        const { sortBy, data ,isDelete, loading, keyValue } = this.state;
        const arr = []
        data.map((item) => {
            arr.push(<SubContainer 
                delteAnnouncement={this.delteAnnouncement} 
                viewAnnouncement={this.viewAnnouncement} 
                keyValue={keyValue} isDelete={isDelete} 
                item={item}/>)   
        })
        return (
            <div className='all_padding'>
            <Row className='p-1'>
                <Col xs='3'>
                    <span onClick={this.sortBy}>
                        <small className='text-muted' style={{cursor : 'pointer'}}>
                        Sort by: Date {sortBy ? <img src={asc} style={{width : '15px', height : '15px'}}/> : <img src={desc} style={{width : '15px', height : '15px'}}/>} </small>
                    </span>
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
                {loading ? 
                    <SyncLoader
                    className={override}
                    sizeUnit={"px"}
                    size={5}
                    color={'black'}
                    loading={true}
                    />
                 : arr}
                    
                </div>
                </Col>
                <Col>
                    <Switch>
                        <Route path='/announcement/compose' render={(props) => (
                            <Compose post = {this.post} getAllAnnouncement={this.getAllAnnouncement}/>
                        )}/>
                        <Route path='/announcement/:id' render={(props) => (
                            <ViewAnnouncement {...props}/>
                        )}/>
                        <Redirect to="/announcement/compose" />
                    </Switch>
                </Col>
            </Row>
            </div>
        );
    }
}

export default withRouter(Announcement);