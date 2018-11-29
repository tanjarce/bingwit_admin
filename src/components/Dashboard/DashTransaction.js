import React, { Component, Fragment } from 'react';
import { Col, Row, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer    } from 'recharts'
import Select from 'react-select';
import * as API from '../../services/API'
import moment from 'moment'

class DashTransaction extends Component {
    constructor(props){
        super(props)
        this.state = {
            filterFormat: 'YEAR',
            filterArea: ''
        }
        this.setBarGraph = this.setBarGraph.bind(this)
        this.getDashTransaction = this.getDashTransaction.bind(this)
        this.formatByThisYear = this.formatByThisYear.bind(this)
        this.formatByThisMonth = this.formatByThisMonth.bind(this)
        this.formatByThisWeek = this.formatByThisWeek.bind(this)
        this.filterFormat = this.filterFormat.bind(this)
        this.filterArea = this.filterArea.bind(this)
    }

    componentDidMount(){
        this.getDashTransaction()        
    }

    filterArea(selectedOption){
        const filterValue = selectedOption ? selectedOption.value : ''
        
        this.setState(()=>({
            filterArea: filterValue
        }), () => {
            this.getDashTransaction()
        })
    }

    filterFormat(e){
        const target = e.target
        
        this.setState(()=>({
            filterFormat: target.value 
        }), () => {
            this.getDashTransaction()
        })
    }

    getDashTransaction(){
        const { filterFormat, filterArea } = this.state
        const params = {
            filter: filterFormat,
            area: filterArea
        }
        API.getDashTransaction(params)
            .then(res => {
                if(res.success){
                    const transactionDatas = res.reports

                    this.setBarGraph(transactionDatas)
                }
            }).catch(err => console.log(err))
    }

    formatByThisWeek(transactionDatas){
        let weekNum = moment().week()

        const dayRange = Array(7).fill(null)
            .map((day, index) => {
                const dayNum = moment().day("sunday").week(weekNum).add(index, 'days').format('DD');
                const dayString = moment().day("sunday").week(weekNum).add(index, 'days').format('ll');
                const label = dayString.replace(/\,\s[0-9]{4}/g, '')
                
                const withVal = transactionDatas.reduce((res, item) => {
                    if(Number(item.DAY) === Number(dayNum)){
                        res['name'] = label
                        res['No. Transaction'] = item['Number_of_Transactions']
                        res['Total Sales'] = item['Total_Sales_Purchases']
                    }
                    return res 
                }, {})

                const noVal = 
                    {
                        name: label, 
                        'No. Transaction': 0, 
                        'Total Sales': 0
                    }

                return Object.keys(withVal).length ? withVal : noVal
            })
        return dayRange
    }

    formatByThisMonth(transactionDatas){
        const weekStart = moment().startOf('month').week()
        const weekEnd = moment().endOf('month').week()
        const numberOfWeeks = weekEnd - weekStart + 1

        const monthRange = Array(numberOfWeeks).fill(null)
            .reduce((range, week, index) => {
                const weekNum = weekStart + index 
                const start = moment().day("sunday").week(weekNum).format('ll');
                const end = moment().day("sunday").week(weekNum).add(6, 'days').format('ll');

                let label = `${start} - ${end}`
                label = label.replace(/\,\s[0-9]{4}/g, '')
                // console.log()
                // console.log(start.replace(/, /i, 'ha'))

                range[label] = 0

                return range
            }, {})

        const reportDatas = transactionDatas.reduce((result, report ) => {
                const weekNum = report.WEEK + 1
                const start = moment().day("sunday").week(weekNum).format('ll');
                const end = moment().day("sunday").week(weekNum).add(6, 'days').format('ll');

                let label = `${start} - ${end}`
                label = label.replace(/\,\s[0-9]{4}/g, '')

                result[label] = {
                    'No. Transaction': report.Number_of_Transactions,
                    'Total Sales': report.Total_Sales_Purchases
                }

                return result
            }, monthRange)

        const formatedReports = Object.keys(reportDatas)
            .map(key => ({
                'name': key,
                'No. Transaction': reportDatas[key]['No. Transaction'],
                'Total Sales': reportDatas[key]['Total Sales']
            }))

        return formatedReports
    }

    formatByThisYear(transactionDatas){
        const currentMonth = new Date().getMonth();

        const dataMonth = Array(12).fill(null)
        .reduce((result, data, index) => {
            const formattedMonth = moment().month(index).format('MMM')
            result[formattedMonth] = 0
            return result
        }, {})

        // transform to object to unite same month datas
        const registeredData = transactionDatas.reduce((result, data)=>{
                const formattedMonth = moment().month(data.MONTH - 1).format('MMM')
                result[formattedMonth] = {
                    'No. Transaction': data.Number_of_Transactions,
                    'Total Sales': data.Total_Sales_Purchases
                }
                return result
            }, dataMonth)
        

        const formattedData = Object.keys(registeredData)
            .map(key => ({
                'name': key,
                'No. Transaction': registeredData[key]['No. Transaction'],
                'Total Sales': registeredData[key]['Total Sales']
            }))

        return formattedData
    }

    setBarGraph(transactionDatas){
        const { filterFormat } = this.state

        const trasactionReport = filterFormat === 'YEAR' 
            ? this.formatByThisYear(transactionDatas)
            : filterFormat === 'MONTH'
                ? this.formatByThisMonth(transactionDatas)
                : this.formatByThisWeek(transactionDatas)


        this.setState(()=>({
            transactionDatas: trasactionReport ,
        }))
    }

    render(){
        const { transactionDatas } = this.state
        const { areaOptions } = this.props

        return(
            <Fragment>
                <Row className="mb-3">
                    <Col>
                        <h4>Transaction</h4>
                    </Col>
                </Row>
                <Row noGutters className="mb-3">
                    <Col xs="12" lg="5">
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            isDisabled={false}
                            // isLoading={true}
                            isClearable={true}
                            // isRtl={isRtl}
                            isSearchable={true}
                            name="color"
                            options={areaOptions}
                            onChange={this.filterArea}
                            placeholder="Search for Area"
                        />
                    </Col>
                    <Col sm={{ size: 2, offset: 5 }}>
                        <Input 
                            className="d-inline-block" 
                            onChange={this.filterFormat} 
                            type="select" 
                            name="usertype" 
                            id="usertype">
                                <option value="YEAR">This Year</option>
                                <option value="MONTH" >This Month</option>
                                <option value="WEEK" >This Week</option>
                        </Input>
                    </Col>
                </Row>
                <Row  className="mb-5">
                    <Col>
                    <ResponsiveContainer height={300}>
                        <BarChart width={600} height={300} data={transactionDatas}
                                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis yAxisId="left" orientation="left" stroke="#17C1BC" unit='php'/>
                        <YAxis yAxisId="right" orientation="right" stroke="#7B8F9E" />
                        <Tooltip/>
                        <Legend />
                        <Bar yAxisId="left" dataKey="Total Sales" fill="#17C1BC" />
                        <Bar yAxisId="right" dataKey="No. Transaction" fill="#7B8F9E" />
                        </BarChart>
                    </ResponsiveContainer>
                    </Col>

                </Row>
            </Fragment>
        )
    }
}

export default DashTransaction