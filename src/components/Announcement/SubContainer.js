import React, {Component} from 'react'
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import moment from 'moment'


class SubContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeMark : false,
            id : ''
        }
    }

    componentDidMount(){
        const { keyValue } = this.props
        console.log(keyValue)   
    }

    render(){
        const { id } = this.state
        const { isDelete, item, viewAnnouncement, keyValue, delteAnnouncement } = this.props
        return(
            <div className='border d-flex flex-row mainScroll' onClick={((e) => {
                viewAnnouncement(e, item.id)
            })}>
                <Col xs='12'>
                <div className='my-3 ml-2 text-truncate'>
                    <Row>
                        <Col className='text-truncate' ><b >{item.title}</b></Col>
                        {isDelete ? <Col xs='auto' onClick={ ()=> {
                            delteAnnouncement(item.id)
                        }}>x</Col> : ''}
                    </Row>
                    <p className='lHeight'>Posted - {moment(item.createdAt).format('MMMM D, YYYY')}</p>
                    <p className='lHeight'>To - {item.target.charAt(0).toUpperCase() + item.target.slice(1, item.target.length)}</p>
                    {item.body}
                </div>
                </Col>
                <div className={id ? 'bar ml-auto' : 'ml-auto'}/>
            </div>
        );
    }
}
export default withRouter(SubContainer)