import React, { Component, Fragment } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'

import TopListCard from './TopListCard'
import * as API from '../../services/API'

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment'

class DashTopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
            isLoading: true,
        }
        this.pickDate = this.pickDate.bind(this)
        
        this.getTopList = this.getTopList.bind(this)

        this.getTopListArea = this.getTopListArea.bind(this)
        this.getTopSalesArea = this.getTopSalesArea.bind(this)
        this.getTopTransArea = this.getTopTransArea.bind(this)

        this.getTopTransConsumer = this.getTopTransConsumer.bind(this)
        this.getTopPurchaseConsumer = this.getTopPurchaseConsumer.bind(this)
        this.getTopListConsumer = this.getTopListConsumer.bind(this)

        this.getTopTransProducer = this.getTopTransProducer.bind(this)
        this.getTopSalesProducer = this.getTopSalesProducer.bind(this)
        this.getTopListProducer = this.getTopListProducer.bind(this)
        
        this.getTopQuantityProduct = this.getTopQuantityProduct.bind(this)
        this.getTopAmountProduct = this.getTopAmountProduct.bind(this)
        this.getTopListProduct = this.getTopListProduct.bind(this)

        this.getMostCancel = this.getMostCancel.bind(this)
    }
    componentDidMount(){
        this.getTopList()
    }

    async getTopList(){
        let topSalesArea        = await this.getTopSalesArea()
        let topTransArea        = await this.getTopTransArea()
        let topQuantityProduct  = await this.getTopQuantityProduct()
        let topAmountProduct    = await this.getTopAmountProduct()
        let topPurchaseCon      = await this.getTopPurchaseConsumer()
        let topTransCon         = await this.getTopTransConsumer()
        let topTransProd        = await this.getTopTransProducer()
        let topSalesProd        = await this.getTopSalesProducer()
        let mostCancel          = await this.getMostCancel()

        // console.log(topSalesArea)
        topSalesArea = topSalesArea.reports.map(area => ({
            'key': area.Area,
            'value': `₱ ${area.Total_Sales}` 
        }))
        
        topTransArea = topTransArea.reports.map(area => ({
            'key': area.Area,
            'value': `${area.Number_of_Transactions}` 
        }))

        topQuantityProduct = (topQuantityProduct.reports === undefined) 
            ? []
            :topQuantityProduct.reports.map(product => ({
                'key': product.product_type,
                'value': `${product.quantity} kg`
            }))

        topAmountProduct = (topAmountProduct.reports === undefined) 
            ? [] 
            :topAmountProduct.reports.map(product => ({
                'key': product.product_type ,
                'value': `₱ ${product.amount}`
            }))

        topPurchaseCon = topPurchaseCon.reports.map(producer => ({
            'key': producer.Username,
            'value': `₱ ${producer.Total_Purchases}`
        }))

        topTransCon = topTransCon.reports.map(producer => ({
            'key': producer.Username,
            'value': producer.Number_of_Transactions
        }))

        topSalesProd = topSalesProd.reports.map(producer => ({
            'key': producer.Username,
            'value': `₱ ${producer.Total_Sales}`
        }))

        topTransProd = topTransProd.reports.map(producer => ({
            'key': producer.Username,
            'value': producer.Number_of_Transactions
        }))

        mostCancel = mostCancel.reports.map(report => ({
            'key': report.Username,
            'value': report.Cancels
        }))

        this.setState(()=>({
            topSalesArea,
            topTransArea,
            topQuantityProduct,
            topAmountProduct,
            topPurchaseCon,
            topTransCon,
            topSalesProd,
            topTransProd,
            mostCancel,
            isLoading: false
            })
        )
    }

    getTopTransArea(){
        const { dateToplist: { start, end } } = this.props
        const params = {
            limit: 3,
            order: 'Number_of_Transactions DESC',
            start,
            end,
        }
        return this.getTopListArea(params)
    }

    getTopSalesArea(){
        const { dateToplist: { start, end } } = this.props

        const params = {
            limit: 3,
            order: 'Total_Sales DESC',
            start,
            end,
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
    

    getTopQuantityProduct(){
        const { dateToplist: { start, end } } = this.props

        const params = {
            offset: '',
            limit: 3,
            order: 'quantity_desc',
            start,
            end,
        }
        return this.getTopListProduct(params)
    }

    getTopAmountProduct(){
        const { dateToplist: { start, end } } = this.props

        const params = {
            offset: '',
            limit: 3,
            order: 'amount_desc',
            start,
            end,
        }
        return this.getTopListProduct(params)
    }

    getTopListProduct(params){
        return API.getTopListProduct(params)
        .then(res => {
            if(res.success){
                return res
            }
        })
    }



    getTopTransConsumer(){
        const { dateToplist: { start, end } } = this.props
        const params = {
            limit: 3,
            order: 'Number_of_Transactions DESC',
            start,
            end,
        }
        return this.getTopListConsumer(params)
    }

    getTopPurchaseConsumer(){
        const { dateToplist: { start, end } } = this.props
        const params = {
            limit: 3,
            order: 'Total_Purchases DESC',
            start,
            end,
        }
        return this.getTopListConsumer(params)
    }

    getTopListConsumer(params){
        return API.getTopListConsumer(params)
        .then(res => {
            if(res.success){
                return res
            }
        })
    }



    getTopTransProducer(){
        const { dateToplist: { start, end } } = this.props
        const params = {
            limit: 3,
            order: 'Number_of_Transactions DESC',
            start,
            end,
        }
        return this.getTopListProducer(params)
    }

    getTopSalesProducer(){
        const { dateToplist: { start, end } } = this.props
        const params = {
            limit: 3,
            order: 'Total_Sales DESC',
            start,
            end,
        }
        return this.getTopListProducer(params)
    }

    getTopListProducer(params){
        return API.getTopListProducer(params)
        .then(res => {
            if(res.success){
                return res
            }
        })
    }


    getMostCancel(){
        const { dateToplist: { start, end } } = this.props
        const params = {
            limit: 3,
            order: 'Cancels DESC',
            start,
            end,
        }

        return API.getMostCancel(params)
            .then(res => {
                if(res.success){
                    return res
                }
            })
    }

    pickDate(event, picker) {
        this.props.setDate(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'))
        this.setState({
            isLoading: true,
            start: picker.startDate.format('YYYY-MM-DD'),
            end: picker.endDate.format('YYYY-MM-DD')
        }, ()=>{
            this.getTopList()
        })
    }

    render(){
        const { topAmountProduct, topQuantityProduct, topSalesArea, topTransArea, topTransCon, topPurchaseCon, topSalesProd, topTransProd, mostCancel, isLoading } = this.state
        const { expand, dateToplist: { start, end } } = this.props
        const dateToday = moment().format('MMMM D, YYYY')
        const startDate = start 
            ? moment(new Date(start)).format('MMMM D, YYYY') 
            : moment().startOf('month').format('MMMM D, YYYY');
        const endDate = end ? moment(new Date(end)).format('MMMM D, YYYY') : dateToday

        return(
            <Fragment>
                <Row noGutters className="mb-3">
                    <Col xs={{ size: 'auto'}}>
                        <h4 className="mr-1">Top List - </h4>
                    </Col>
                    <Col xs={{ size: 'auto'}}>
                        <DateRangePicker 
                            onApply={this.pickDate } 
                            startDate={moment(start).format('L')} 
                            endDate={moment(end).format('L')}>
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
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topTransArea} 
                            label={['Area - No. of Transaction', 'Area', 'No. of Transaction']} 
                            link={'Area'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topQuantityProduct} 
                            label={['Product - qty. of sold', 'Product', 'qty. of sold']} 
                            link={'Product'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
 
                </Row>
                <Row  className="mb-5">
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topSalesProd} 
                            label={['Producer - Total Sales', 'Producer', 'Total Sales']} 
                            link={'Producer'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topTransProd} 
                            label={['Producer - No. of Transaction', 'Producer', 'No. of Transaction']} 
                            link={'Producer'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topAmountProduct} 
                            label={['Product - Total Amount ', 'Product', 'Total Amount']} 
                            link={'Product'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                </Row>
                <Row  className="mb-5">
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topPurchaseCon} 
                            label={['Consumer - Total Purchase', 'Consumer', 'Total Purchase']} 
                            link={'Consumer'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={topTransCon} 
                            label={['Consumer - No. of Transaction', 'Consumer', 'No. of Transaction']} 
                            link={'Consumer'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                    <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <TopListCard 
                            data={mostCancel} 
                            label={['Consumer - Most Canceling', 'Consumer', 'No. Canceled Transaction']} 
                            link={'Cancels'}
                            expand={expand}
                            isLoading={isLoading}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default withRouter(DashTopList)