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
    }
    componentDidMount(){
        // const start = moment().day("Monday").year(2018).week(47).toDate();
        let reports = [{
            "WEEK": 46,
            "Total_Sales_Purchases": 820,
            "Number_of_Transactions": 4
        },
        {
            "WEEK": 47,
            "Total_Sales_Purchases": 140,
            "Number_of_Transactions": 2
        }]

        const formatedreports = reports.reduce((result, report ) => {
            const weekNum = report.WEEK
            const start = moment().day("monday").week(weekNum).format('ll');
            const end = moment().day("monday").week(weekNum).add(6, 'days').format('ll');

            result[`${start} - ${end}`] = {
                'No. Transaction': report.Number_of_Transactions,
                'Total Sales': report.Total_Sales_Purchases
            }

            return result
        }, {})

        console.log(formatedreports)

        const weekStart = moment().startOf('month').week()
        const weekEnd = moment().endOf('month').week()
        const monthRange = Array(weekEnd -weekStart + 1).fill(null)
            .reduce((range, week, index) => {
                const weekNum = weekStart + index
                const start = moment().day("monday").week(weekNum).format('ll');
                const end = moment().day("monday").week(weekNum).add(6, 'days').format('ll');

                range[`${start} - ${end}`] = null

                return range
            }, {})

        console.log(monthRange)

        // console.log(`${start} - ${end}`)

        // let num = Array(30).fill(null).map((day, index) => {
        //     var firstDay = moment(`2018-11-${index+1}`); 

        //     console.log()
        //     var nthOfMoth = Math.ceil(firstDay.date() / 7); 
        //     return nthOfMoth
        //     // console.log(nthOfMoth)
        // })

        // console.log(num)
        // var day = firstDay.day(); //6 = saturday


        // get day name
        // console.log(moment(day).format('dddd'))

        this.getDashTransaction()        
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

    formatByThisYear(transactionDatas){
        const currentMonth = new Date().getMonth();

        const dataMonth = Array(currentMonth).fill(null)
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
        const byYear = this.formatByThisYear



        this.setState(()=>({
            transactionDatas: byYear(transactionDatas),
        }))
    }

    render(){
        const { transactionDatas } = this.state
        const { areaOptions } = this.props
        // const data = [
        //     {name: 'Jan', 'No. Transaction': 2400, 'Total Sales': 4000, amt: 2400},
        //     {name: 'Feb', 'No. Transaction': 1398, 'Total Sales': 3000, amt: 2210},
        //     {name: 'Mar', 'No. Transaction': 9800, 'Total Sales': 2000, amt: 2290},
        //     {name: 'Apr', 'No. Transaction': 3908, 'Total Sales': 2780, amt: 2000},
        //     {name: 'May', 'No. Transaction': 4800, 'Total Sales': 1890, amt: 2181},
        //     {name: 'Jun', 'No. Transaction': 3800, 'Total Sales': 2390, amt: 2500},
        //     {name: 'Jul', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
        //     {name: 'Aug', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
        //     {name: 'Sep', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
        //     {name: 'Oct', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
        //     {name: 'Nov', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
        //     {name: 'Dec', 'No. Transaction': 4300, 'Total Sales': 3490, amt: 2100},
        // ];  

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
                            onChange={this.handleChange}
                            placeholder="Search for Area"
                        />
                    </Col>
                    <Col sm={{ size: 2, offset: 5 }}>
                        <Input className="d-inline-block" type="select" name="usertype" id="usertype">
                            <option>This Year</option>
                            <option>This Month</option>
                            <option>This Week</option>
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