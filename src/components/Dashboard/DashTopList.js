import React, { Component, Fragment } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import TopListCard from './TopListCard'
import * as API from '../../services/API'

// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment'

class DashTopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: ''
        }
        this.handleEvent = this.handleEvent.bind(this)
        this.getTopListArea = this.getTopListArea.bind(this)
        this.getTopSalesArea = this.getTopSalesArea.bind(this)
        this.getTopTransArea = this.getTopTransArea.bind(this)
    }
    async componentDidMount(){
        let topSalesArea = await this.getTopSalesArea()
        let topTransArea = await this.getTopTransArea()
        // console.log(topTransArea.results)
        // console.log(topSalesArea.results)
        topSalesArea = topSalesArea.results.map(area => ({
            'key': area.Area,
            'value': `₱ ${area.Total_Sales}` 
        }))
        topTransArea = topTransArea.results.map(area => ({
            'key': area.Area,
            'value': `${area.Number_of_Transactions}` 
        }))

        this.setState(()=>({
            topSalesArea,
            topTransArea
            }), ()=>{ console.log(this.state) }
        )
    }

    getTopTransArea(){
        const params = {
            limit: 3,
            order: 'Number_of_Transactions'
        }
        return this.getTopListArea(params)
    }

    getTopSalesArea(){
        const params = {
            limit: 3,
            order: 'Total_Sales'
        }
        return this.getTopListArea(params)
    }

    getTopListArea(params){
        return API.getTopListArea(params)
            .then(res => {
                if(res.success){
                    return res
                }
            })
    }

    handleEvent(event, picker) {
        this.setState({
          start: picker.startDate.format('L'),
          end: picker.endDate.format('L')
        })
    }

    render(){
        const { start, end, topSalesArea, topTransArea } = this.state
        console.log(topSalesArea)
        const dateToday = moment().format('MMMM D, YYYY')
        const startDate = start ? moment(new Date(start)).format('MMMM D, YYYY') : dateToday
        const endDate = end ? moment(new Date(end)).format('MMMM D, YYYY') : dateToday

        return(
            <Fragment>
                <Row noGutters className="mb-3">
                    <Col xs={{ size: 'auto'}}>
                        <h4 className="mr-1">Top List - </h4>
                    </Col>
                    <Col xs={{ size: 'auto'}}>
                        <DateRangePicker 
                            onApply={this.handleEvent } 
                            startDate={start || moment().format('L')} 
                            endDate={end || moment().format('L')}>
                            <h4 style={{'cursor': 'pointer'}}>{`${startDate} - ${endDate}`}
                                <span className="ml-1">
                                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" >
                                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                    </svg>
                                </span>
                            </h4>
                        </DateRangePicker>
                    </Col>
                </Row>
                <Row  className="mb-5">
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topSalesArea} 
                            label={['Area - Total Sales', 'Area', 'Total Sales']}
                            link={'Area'}    
                        />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topTransArea} 
                            label={['Area - No. of Transaction', 'Area', 'No. of Transaction']} 
                            link={'Area'}
                        />
                    </Col>
                    {/* <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard data={topSalesArea} />
                    </Col> */}
                </Row>
                {/* <Row  className="mb-5">
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard data={topSalesArea} />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard data={topSalesArea} />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard data={topSalesArea} />
                    </Col>
                </Row>
                <Row  className="mb-5">
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard data={topSalesArea} />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard data={topSalesArea} />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard data={topSalesArea} />
                    </Col>
                </Row> */}
            </Fragment>
        )
    }
}

export default DashTopList