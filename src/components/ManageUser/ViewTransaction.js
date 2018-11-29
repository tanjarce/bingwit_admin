import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'

import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import Consumer from './ViewConsumer'
import Producer from './ViewProducer'
import close from '../../assets/close.svg'
import { css } from 'react-emotion';
import { PulseLoader
} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ViewTransaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo : [],
            data : ''
        }
        this.goBack = this.goBack.bind(this)
        this.getUserTransactionConsumer = this.getUserTransactionConsumer.bind(this)
        this.getUserTransactionProducer = this.getUserTransactionProducer.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        const v_id = this.props.match.params.v_id

        API.getUserId(id)
        .then((response) => {
        if(response.success === true){
            this.setState({
                userInfo : response.user
            })
            response.user.type === 'consumer' ?
            this.getUserTransactionConsumer(id, v_id)
            :
            this.getUserTransactionProducer(id, v_id)
        }
        else{
            Help.toastPop({message: response.error.message, type: 'error'})
        }
        })
    }
    goBack (){
        this.props.history.goBack()
        //
    }
    getUserTransactionConsumer(id, v_id){
        API.getUserTransactionReceiptByTRK(id, v_id)
        .then((response) => {
            if(response.success) {
                this.setState({
                    data : {...response.receipt, count : response.receipt.transaction.length}
                })
            }
            else{
            Help.toastPop({message: response.error.message, type: 'error'})
            }
        }) 
    }
    getUserTransactionProducer(id, v_id){
        API.getUserTransactionProducerById(id, v_id)
        .then((response) => {
            console.log(response)
            if(response.success) {
                this.setState({
                    data : {...response.transaction, ...response.transaction_products, log : response.status_log}
                })
            }
            else{
            Help.toastPop({message: response.error.message, type: 'error'})
            }
        })
    }
    render() {
        const { userInfo, data } = this.state
        
        return (
            <div>
                 {data ?
                    <React.Fragment >
                        <div className='space' >
                        <Row>
                            <Col xs='auto'>
                            <h4 className='font-weight-bold'>{userInfo.full_name ? userInfo.full_name : '- -'}</h4>
                            <p className='text-muted role'>{userInfo.type}</p>
                            </Col>
                            <Col />
                            <Col xs='auto'>
                            <span style={{cursor : 'pointer'}} onClick={this.goBack}>
                            <img style={{width : '12px' , height : '12px'}} src={close} alt='close'/>
                            <span className='text-danger pl-2'>close</span>
                            </span>
                            </Col>
                        </Row>
                        </div>
                
                        {userInfo.type === 'consumer' ?
                            <Consumer data={data}/> 
                            :
                            <Producer data={data}/> 
                        }
                    </React.Fragment>
                    :
                    <PulseLoader
                        className={override}
                        sizeUnit={"px"}
                        size={5}
                        color={'#17C1BC'}
                        loading={true}
                    />
                }
            </div>
        );
    }
}

export default withRouter(ViewTransaction);