import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import * as API from '../../services/API'
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'

const headers = {
    'area_expand': [
        {
            Header: 'Area',
            accessor: 'Area',
        },
        {
            Header: 'Number of Transactions',
            accessor: 'Number_of_Transactions',
        },
        {
            Header: 'Total Sales',
            accessor: 'Total_Sales',
        },        
        {
            Header: 'Date Range',
            accessor: 'DateRange',
            width: 320
        },
    ] ,
    'consumer_expand': [
        {
            Header: 'Username',
            accessor: 'Username',
        },
        {
            Header: 'Number of Transactions',
            accessor: 'Number_of_Transactions',
        },
        {
            Header: 'Total Purchases',
            accessor: 'Total_Purchases',
        },     
        {
            Header: 'Date Range',
            accessor: 'DateRange',
            width: 320
        },
    ] ,
    'producer_expand': [
        {
            Header: 'Username',
            accessor: 'Username',
        },
        {
            Header: 'Number of Transactions',
            accessor: 'Number_of_Transactions',
        },
        {
            Header: 'Total Sales',
            accessor: 'Total_Sales',
        },     
        {
            Header: 'Date Range',
            accessor: 'DateRange',
            width: 320
        },
    ] ,
    'cancels_expand': [
        {
            Header: 'Username',
            accessor: 'Username',
        },
        {
            Header: 'No. of Canceled Transaction',
            accessor: 'Cancels',
        },     
        {
            Header: 'Date Range',
            accessor: 'DateRange',
            width: 320
        },
    ] ,
}

class DashExpandView extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
            datas: [],
            searchQ: '',
            category: '',
            pagination: {
                offset: 0,
                limit: 10
            },
        }
        this.goBack = this.goBack.bind(this) 
        this.makeTable = this.makeTable.bind(this)
        this.getData = this.getData.bind(this)
        this.updateTable = this.updateTable.bind(this)
        this.pickDate = this.pickDate.bind(this) 
    }

    updateTable(paginationData, searchQData){
        this.setState((prevState)=>({
            isLoading: true,
            searchQ: (typeof searchQData !== 'undefined') ? searchQData.trim() : prevState.searchQ,
            pagination: paginationData ? {...paginationData} : (typeof searchQData !== 'undefined')
                ? {...prevState.pagination, offset: 0} : prevState.pagination
        }), ()=>{
            this.getData()
        })
    }
    
    getData(){
        const { start, end, searchQ } = this.state
        const data = { start, end, searchQ }

        const GetData = {
            'area_expand': API.getTopListArea(data) ,
            'product_expand': API.getTopListArea(data),
            'producer_expand': API.getTopListProducer(data),
            'consumer_expand': API.getTopListConsumer(data),
            'cancels_expand': API.getMostCancel(data)
        }

        const type = this.props.match.params.type

        GetData[type.toLowerCase()]
            .then(res => {
                if(res.success){
                    this.makeTable(res)
                }
            })
            .catch(err => { console.log(err) })
    }

    makeTable (res){
        const { match: { params: { type } } } = this.props
        const dataType = type.toLowerCase()

        const datas = (dataType === 'consumer_expand' || dataType === 'producer_expand' || dataType === 'cancels_expand' ) 
            ? res.reports 
            : res.results

        this.setState(()=>({
            datas,
            isLoading: false
        }))
    }

    componentDidMount(){
        const { dateToplist } = this.props
        
        this.setState(()=>({
            start: dateToplist.start,
            end: dateToplist.end
        }), ()=>{
            this.getData()
        })

    }

    goBack (){
        this.props.history.goBack()
    }

    pickDate(event, picker) {
        this.setState({
            isLoading: true,
            start: picker.startDate.format('YYYY-MM-DD'),
            end: picker.endDate.format('YYYY-MM-DD')
        }, ()=>{
            this.getData()
        })
    }

    render(){
        const { match: { params: { type } } } = this.props
        const { datas, head, start, end, isLoading, pagination } = this.state
        const formatDate = (date) => {
            return moment(date).format('MMMM D, YYYY')
        }

        const columns = headers[type.toLowerCase()]
        const rows = datas.map(data => (
            {
                ...data,
                DateRange: `${formatDate(start)} - ${formatDate(end)}`
            }
        ))

        return(
            <React.Fragment>
                    <NavLink to='#' activeClassName='gback' className="my-3" onClick={ (e)=>{
                        e.preventDefault()
                        this.goBack()
                    }}>
                        &lang; &nbsp; Go Back
                    </NavLink>
                <SearchCount 
                    text="Data" 
                    // count={productCount} 
                    updateTable={this.updateTable}
                >
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
                    columns={columns} 
                    dataCount={datas.length}
                    paginationData={pagination}
                    updateTable={this.updateTable}
                    data={rows}
                    />
            </React.Fragment>
        )
    }
}

export default withRouter(DashExpandView)