import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import { Route , Switch , Redirect, withRouter} from 'react-router-dom'

import trash from '../../assets/trash.svg'
import '../../styles/style.css'
import SubContainer from './SubContainer'
import Compose from './Compose'
import ViewAnnouncement from './ViewAnnouncement';
import desc from '../../assets/asc.svg'
import asc from '../../assets/desc.svg'
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
            keyValue : '',
            sort : 'desc',
            sortHandle : true
        }
        this.isDelete = this.isDelete.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.getAllAnnouncement = this.getAllAnnouncement.bind(this)
        this.viewAnnouncement = this.viewAnnouncement.bind(this)
        this.delteAnnouncement = this.delteAnnouncement.bind(this)  
        this.firstSort = this.firstSort.bind(this) 
    }
    componentDidMount(){
        this.getAllAnnouncement()
        async function f() {
            let result = Promise.resolve(
                API.getAllAnnouncement()
                .then((response) => {
                    return response
                }))

            let resultPromise = await result;

            console.log(resultPromise)
        }
    }
    firstSort(){
        this.setState({
            sortHandle : true
        })
    }
    getAllAnnouncement(){
        const { sortHandle , sortBy} = this.state
        // console.log(sortHandle ? 'sortHandle: ' + sortHandle + ' || desc ' + sortBy 
        // :'sortHandle: ' + sortHandle + ' || asc ' + sortBy )

        this.setState({
            loading : true
        })
        API.getAllAnnouncement( '' , sortHandle ? 'desc' : 'asc')
        .then((response) => {
            if(response.success === true){ 
                const arr = []
                response.notifications.rows.map((item) => {
                    arr.push(item)
                })
            this.setState({
                data : arr,
                loading : false,})
            }
            else{
            this.setState({
                loading : false})

            Help.toastPop({message: response.error.message, type: 'error'})
        }
        })
    }

    isDelete(){
        const { isDelete , sortBy, sort} = this.state
        this.setState({
            isDelete : !isDelete,
            sortBy : sortBy ,
            sort: sort
        })
    }
    sortBy(){
        const { sort, sortBy, sortHandle} = this.state
        this.setState({
            sortHandle : sortHandle ? false : true
        })
        setTimeout(()=>{
            this.getAllAnnouncement()
        },10)
    }

    delteAnnouncement(id){
        API.delteAnnouncement(id)
        .then((response) => {
            if(response.success === true){
                Help.toastPop({message: 'Deleted Successfully', type: 'success'})
                this.props.history.push(`/announcement/compose`)
                this.getAllAnnouncement()
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
    }
    render() {
        const { sortHandle, data ,isDelete, loading, keyValue } = this.state;
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
                        Sort by: Date <img src={sortHandle ? asc : desc } style={{width : '15px', height : '15px'}}/> 
                        </small>
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
                    ''
                    // <SyncLoader
                    // className={override}
                    // sizeUnit={"px"}
                    // size={5}
                    // color={'black'}
                    // loading={true}
                    // />
                 : arr}
                    
                </div>
                </Col>
                <Col>
                    <Switch>
                        <Route path='/announcement/compose' render={(props) => (
                            <Compose firstSort={this.firstSort} getAllAnnouncement={this.getAllAnnouncement}/>
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