import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import * as API from '../../services/API'
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import moment from 'moment'

class DashExpandView extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
            datas: [],
        }
        this.goBack = this.goBack.bind(this) 
    }
    

    componentDidMount(){
        const { start, end } = this.state
        const data = { start, end}

        const GetData = {
            'area_expand': () => {
                API.getTopListArea(data)
                    .then(res => {
                        if(res.success){
                            const datas = res.results
                            let head = Object.keys(res.results[0]).map(key => {
                                return({
                                    Header: key,
                                    accessor: key,
                                })
                            })
                            head.push({
                                Header: 'Date Range',
                                accessor: 'DateRange',
                                width: 320
                            })

                            this.setState(()=>({
                                datas,
                                head,
                                isLoading: false
                            }), () => {console.log(this.state)})
                        }
                    })
            }
        }
        const type = this.props.match.params.type

        const func = GetData[type.toLowerCase()]
        func()
    }

    goBack (){
        this.props.history.goBack()
    }

    render(){
        const { match: { params: { type } } } = this.props
        const { datas, head, start, end, isLoading } = this.state
        const formatDate = (date) => {
            return moment(date).format('MMMM D, YYYY')
        }

        const columns = head ? head : []
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
                {/* <SearchCount 
                    text="Product" 
                    count={productCount} 
                    updateTable={this.getAllProduct}>
                    <select 
                        className="inpt" 
                        type="select" 
                        name="select" 
                        id="exampleSelect" 
                        onChange={this.handleChangeFilterCategory} >
                            <option value="">All</option>
                            { optionCategory }
                    </select>
                    <button color="primary" className="inpt addButton" onClick={()=>{this.setModal(null, 'add')}}>&#43; Add Product</button>
                </SearchCount> */}
                <Table
                    loading={isLoading}
                    columns={columns} 
                    dataCount={datas.length}
                    paginationData={{offset: 0, limit: 10}}
                    // updateTable={this.getAllProduct}
                    data={rows} 
                    />
            </React.Fragment>
        )
    }
}

export default withRouter(DashExpandView)