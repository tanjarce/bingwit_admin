import React, {Component} from 'react'
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import moment from 'moment'


class SubContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeMark : false,
            // deleteSlide : false
        }
        // this.deleteSlide = this.deleteSlide.bind(this)
    }
    // deleteSlide(){
    //     console.log('SLIDE')
    //     this.setState({
    //         deleteSlide : true
    //     })
    // }
    render(){
        // const { deleteSlide } = this.state
        const { keyValue ,isDelete, item, viewAnnouncement , delteAnnouncement } = this.props
        return(
            <div className='border d-flex flex-row mainScroll' onClick={((e) => {
                setTimeout(()=> {
                    viewAnnouncement(e, item.id)}, 10) 
                })}>
                <Col xs='11'>
                <div className='my-3 ml-2 text-truncate'>
                    <Row>
                        <Col className='text-truncate'><b>{item.title}</b></Col>
                        {isDelete ? 
                        <Col xs='auto' className='ml-auto' onClick={ ()=> {
                            // this.deleteSlide();
                            delteAnnouncement(item.id)
                        }}>&times;</Col> : ''}
                    </Row>
                    <p className='lHeight'>Posted - {moment(item.createdAt).format('MMMM D, YYYY')}</p>
                    <p className='lHeight'>To - {item.target.charAt(0).toUpperCase() + item.target.slice(1, item.target.length)}</p>
                    {item.body}
                </div>
                </Col>
                <div className={keyValue === item.id ? 'bar ml-auto' : 'ml-auto'}/>
            </div>
        );
    }
}
export default withRouter(SubContainer)