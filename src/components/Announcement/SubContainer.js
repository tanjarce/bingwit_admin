import React, {Component} from 'react'
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'

class SubContainer extends Component{
    render(){
        const { x, isDelete } = this.props
        return(
            <div className='border d-flex flex-row mainScroll' onClick={()=>{
                this.props.history.push('/announcement/view-id')
            }}>
                <div className='m-3 text-truncate'>
                    <Row>
                        <Col><b>Update Features v2.2{x}</b></Col>
                        {isDelete ? <Col xs='auto' onClick={ ()=> {alert(`DELETED ${x}`)}}>x</Col> : ''}
                    </Row>
                    <p className='lHeight'>Posted - October {x+1}, 2018</p>
                    <p className='lHeight'>To - All</p>
                    Lorem ipsum dolor sit amet, minim consequun alwdawkjdnakwjnkjaw
                </div>
                <div className={x === 0 ? 'bar' : ''}/>
            </div>
        );
    }
}
export default withRouter(SubContainer)