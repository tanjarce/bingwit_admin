import React, {Component} from 'react'
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'

import moment from 'moment'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import { css } from 'react-emotion';
import { SyncLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ViewAnnouncement extends Component{
    constructor(props){
        super(props);
        this.state = {
          data : '',
          id : ''
        }
        this.viewAnnouncement = this.viewAnnouncement.bind(this)
    }
    componentDidMount(){
        let id = this.props.match.params.id
        this.setState({
            id : id
        },
        console.log('VIEW - ' + id))
        this.viewAnnouncement(id)
    }
    componentWillReceiveProps(nxtprops){
        const { id } = this.state
        let idx = nxtprops.match.params.id
        
        if(id === idx || id === ''){
            this.viewAnnouncement(idx)
        }
        else{
            this.viewAnnouncement(idx)
        }
    }

    viewAnnouncement(id){
        this.setState({
            data : ''
        })
        API.getAllAnnouncement(id)
        .then((response) => {
            response.success ?
            this.setState({
                data : response.notifications.rows[0]
            })
            :
            Help.toastPop({message: response.error.message, type: 'error'})
        })
    }
    render(){
        const { data } = this.state
        return(
            data ? 
            <div className='border'>
                <div className='header px-3 py-1'>
                <Row>
                    <Col xs='auto'>Announcement</Col>
                </Row>
                </div>
            <div className='m-3'>
                <div>
                    
                    <Row>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>Title:</Col>
                                <Col>
                                {data.title}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>To:</Col>
                                <Col>
                                {data.target.charAt(0).toUpperCase() + data.target.slice(1, data.target.length)}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>From:</Col>
                                <Col>
                                {data.admin_username}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='my-1'>
                            <Row>
                                <Col xs='1' className='my-auto'>Date:</Col>
                                <Col>
                                {moment(data.createdAt).format('MMMM D, YYYY')}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12'>
                        <hr/>
                        <div  className='my-1'>
                            <div className='text-justify px-3' style={{height : '200px', overflowY : 'auto'}}>
                            <p>
                                {data.body}
                            </p>
                            </div>
                        </div>
                        </Col>
                        <Col xs='12'>
                        <Row>
                        <Col/>
                        </Row>
                        </Col>
                    </Row> 
                </div>
            </div>
            </div>
            :
            <div>
            <SyncLoader
            className={override}
            sizeUnit={"px"}
            size={5}
            color={'#17C1BC'}
            loading={true}
            />
            </div>
        );
    }
}
export default withRouter(ViewAnnouncement)