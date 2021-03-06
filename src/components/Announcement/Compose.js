import React, {Component} from 'react'
import { Row, Col, Input, Button } from 'reactstrap';
import serializeForm from 'form-serialize'

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

class Compose extends Component{
    constructor(props){
        super(props);
        this.state = {
            body : '',
            target : '',
            title : '',
            loading : false,
            isPost : false
        }
        this.postAnnouncement = this.postAnnouncement.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    toggle(){
        this.setState({
            isPost : !this.state.isPost
        })
    }
    dummyPost(e){
        e.preventDefault();
    }
    postAnnouncement(e){
        const { getAllAnnouncement, firstSort } = this.props
        e.preventDefault()
        this.setState({
            loading : true
        })
        let values = serializeForm(e.target, { hash: true })
        API.composeAnnouncement(values)
        .then((response) => {
            if(response.success){
            this.setState({
                loading : false,
                body : '',
                title : ''
            }, firstSort())
            Help.toastPop({message: 'Added Successfully.', type: 'success'})
            getAllAnnouncement();
            
        }
        else{
            Help.toastPop({message: response.error.message, type: 'error'}),
            this.setState({
                loading : false
            })
        }})
    }
    handleClear(){
        this.setState({
            loading : false,
            target : '',
            body : '',
            title : ''
        })
    }
    handleChange(e){    
    e.preventDefault();
    this.setState({[e.target.name] : e.target.value});
    }
    render(){
        const { loading, isPost, body, title } = this.state
        return(
            <div className='border'>
                        <div className='header px-3 py-1'> Compose</div>
                        <div className='m-3'>
                            <div>
                                <form onSubmit={isPost === false ? this.postAnnouncement : this.dummyPost}>
                                <Row>
                                    <Col xs='12' className='my-1'>
                                        <Row>
                                            <Col xs='1' className='my-auto'>To:</Col>
                                            <Col>
                                            <Input type="select" name="target" onChange={this.handleChange}>
                                                <option>all</option>
                                                <option>consumer</option>
                                                <option>producer</option>
                                            </Input>
                                            {/* <Input type='text' placeholder='Write something...' name='target' value={target} onChange={this.handleChange} /> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs='12' className='my-1 mt-3'>
                                        <Row>
                                            <Col>
                                            <Input type='text' placeholder='Title' name='title' onChange={this.handleChange} value={title} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs='12'>
                                    <div  className='my-1'>
                                        <Input type='textarea' name='body' placeholder='Write something...' style={{height : '200px'}}  value={body} onChange={this.handleChange}  />
                                    </div>
                                    </Col>
                                    <Col xs='12'>
                                    <Row>
                                        <Col/>
                                        <Col xs='auto'>
                                        
                                        <div  className='mx-1 mt-5'>
                                            {isPost && <span className='mr-2 text-muted'>Are you sure ?</span>}
                                            <Button className='button_announcement_clear' onClick={isPost ? this.toggle : this.handleClear}>{isPost ? 'No' : 'Clear'}</Button>
                                            <Button className='button_announcement_post' onClick={this.toggle} type='submit'>
                                            {loading ? 
                                            <SyncLoader
                                            className={override}
                                            sizeUnit={"px"}
                                            size={5}
                                            color={'white'}
                                            loading={true}
                                        />
                                        : isPost ? 'Yes!' : 'Post'}</Button>
                                        </div>

                                        </Col>
                                    </Row>
                                    </Col>
                                </Row>
                                </form>
                            </div>
                        </div>
                    </div>
        );
    }
}
export default Compose