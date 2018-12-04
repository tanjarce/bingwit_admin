import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container } from 'reactstrap';
import * as API from '../../services/API';
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import * as Help from '../../toastify/helpers'
import moment from 'moment'
import Banner from '../Banner'

class AllTransaction extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
            datas: [],
            dataCount: 0,
            searchQ: '',
            type: 'producer',
            category: '',
            pagination: {
                offset: 0,
                limit: 10
            },
        }
        this.getAllTransaction = this.getAllTransaction.bind(this)
        this.updateQuery = this.updateQuery.bind(this)
        this.pickDate = this.pickDate.bind(this)
        this.pickType = this.pickType.bind(this) 
        this.viewTransaction = this.viewTransaction.bind(this) 
    }
    
    componentDidMount(){
        this.getAllTransaction()
    }

    viewTransaction(info){
        const user = info.producer === undefined 
        ? info.consumer.full_name 
        : info.producer.full_name
        const tracking_number = info.tracking_number
        const transaction_id = info.id

        const data = {
            limit: 10,
            offset: 0,
            searchQ: user,
            order: 'username',
            sort: 'ASC'
        }

        API.getAllUser(data)
            .then(res => {
                if(res.success){
                    const { type } = this.state
                    const { history: { push } } = this.props

                    const userId = res.users.rows[0].id
                    
                    const path = type === 'consumer' ? `/mnguser/users/${userId}/transaction/view_${tracking_number}` :  `/mnguser/users/${userId}/transaction/view_${transaction_id}`
                    push(path)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateQuery(paginationData, searchQData, func){
        this.setState((prevState)=>({
            isLoading: true,
            searchQ: (typeof searchQData !== 'undefined') ? searchQData.trim() : prevState.searchQ,
            pagination: paginationData ? {...paginationData} : (typeof searchQData !== 'undefined')
                ? {...prevState.pagination, offset: 0} : prevState.pagination
        }), ()=>{
            func()
        })
    }

    pickType(e){
        const target = e.target
        this.setState({
            isLoading: true,
            type: target.value
        }, ()=>{
            this.getAllTransaction()
        })
    }

    pickDate(event, picker) {
        this.setState({
            isLoading: true,
            start: picker.startDate.format('YYYY-MM-DD'),
            end: picker.endDate.format('YYYY-MM-DD')
        }, ()=>{
            this.getAllTransaction()
        })
    }

    getAllTransaction(paginationData, searchQData) {
        this.setState({
            isLoading: true
        })

        const updateTable = () => {
            const {searchQ, pagination, type, start, end} = this.state
          
            const data = {
                searchQ,
                type,
                start, 
                end,
                ...pagination
            }
            
            API.getAllTransaction(data)
                .then(res => {
                    if(res.success){
                        console.log(res)
                        const datas = res.transaction.rows.map(data => {
                            const user = data.producer === undefined 
                                ? data.consumer.full_name 
                                : data.producer.full_name
                                
                            return ({
                                ...data,
                                'createdAt' : moment(data.createdAt).format('MMMM D, YYYY'),
                                user,
                                action: {...data}
                            })
                        })
                        const count = res.transaction.count
                        this.setState(()=>({
                            dataCount: count,
                            datas,
                            isLoading: false
                        }))
                    
                    }
                })   
                .catch(err => {
                    this.setState(()=>({
                        isLoading: false
                    }))
                    Help.toastPop({message: err, type: 'error'})
                })
        }
        this.updateQuery(paginationData, searchQData, updateTable)
    }

    render(){
        const { datas, head, start, end, isLoading, pagination, type, dataCount } = this.state
        const header = [
            {
                Header: 'Tracking Number',
                accessor: 'tracking_number',
            },
            {
                Header: type === 'producer' ? 'Producer' : 'Consumer',
                accessor: 'user',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },        
            {
                Header: 'Date Created',
                accessor: 'createdAt',
                width: 320
            },
            {
                Header: ' ',
                accessor: 'action',
                width: 50,
                resizable: false,
                Cell: rowInfo =>  
                (
                <div onClick={() => {this.viewTransaction(rowInfo.value)}} style={{cursor : 'pointer'}}>
                    <span>&#8827;</span>
                </div>
                )
            },

        ]

        return(
            
            <div className='bottom-pad'>
                {/* <ProductModal isOpen={isOpen} optionCategory={optionCategory} getAllProduct={this.getAllProduct} toggle={this.toggleModal}  type="add" /> */}
                <Banner 
                    header="Transactions"
                    contents="Contains all transactions of users." 
                />
                <Container>
                    <SearchCount 
                        text="Data" 
                        count={dataCount} 
                        updateTable={this.getAllTransaction}
                    >
                    <select 
                        className="inpt" 
                        type="select" 
                        name="select" 
                        id="exampleSelect" 
                        onChange={this.pickType} >
                            <option value="producer">Producer</option>
                            <option value="consumer">Consumer</option>
                    </select>
                    <DateRangePicker 
                        onApply={this.pickDate } 
                        startDate={moment(start).format('L')} 
                        endDate={moment(end).format('L')}>
                        <span style={{'cursor': 'pointer'}}>{`${moment(start).format('MMMM D, YYYY')} - ${moment(end).format('MMMM D, YYYY')}`}
                            <span className="ml-1">
                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" >
                                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                            </span>
                        </span>
                    </DateRangePicker>
                    </SearchCount>
                    <Table
                        loading={isLoading}
                        columns={header} 
                        dataCount={dataCount}
                        paginationData={pagination}
                        updateTable={this.getAllTransaction}
                        data={datas} 
                    />
                </Container>
            </div>
        )
    }
}

export default withRouter(AllTransaction)