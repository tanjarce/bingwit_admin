import React, { Component, Fragment } from 'react';
import { Col, Row, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import PieChartCard from './PieChartCard'
import LineChartCard from './LineChartCard'
import UserCard from './UserCard'
import * as API from '../../services/API'
import Select from 'react-select';
import moment from 'moment'

class DashUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [
                {name: 'Active', value: 0},
                {name: 'Inactive', value: 0},
                {name: 'Suspended', value: 0},
            ],
            filterUserType: 'All',
            filterArea: '',
            registeredData: [],
            isLoading: true
        }
        this.getAllDashUser = this.getAllDashUser.bind(this)
        this.setPieChartData = this.setPieChartData.bind(this) 
        this.setLineChartData = this.setLineChartData.bind(this) 
        this.filterUserType = this.filterUserType.bind(this) 
        this.handleFilterArea = this.handleFilterArea.bind(this)
    }

    handleFilterArea(selectedOption){
        const filterValue = selectedOption ? selectedOption.value : ''
        
        this.setState((e)=>({
            filterArea: filterValue
        }), () => {
            this.getAllDashUser()
        })
    }

    filterUserType(e){
        const target = e.target
        this.setState((e)=>({
            filterUserType: target.value
        }), () => {
            this.getAllDashUser()
        })
    }

    componentDidMount(){
        this.getAllDashUser()
    }

    setLineChartData(registered){
        const currentMonth = new Date().getMonth();

        const dataMonth = Array(currentMonth).fill(null)
            .reduce((result, data, index) => {
                const formattedMonth = moment().month(index).format('MMM')
                result[formattedMonth] = 0
                return result
            }, {})


        // transform to object to unite same month datas
        const registeredData = registered.rows.reduce((result, data)=>{
                const formattedMonth = moment().month(data.MONTH - 1).format('MMM')
                result[formattedMonth] = result[formattedMonth] + 1 || 1
                return result
            }, dataMonth)
        
        const formattedData = Object.keys(registeredData)
            .map(key => ({
                'name': key,
                'registered user': registeredData[key]
            }))

        this.setState(()=>({
            registeredData: formattedData,
            isLoading: false
        }))
    }

    setPieChartData(active, inactive, suspended){
        this.setState(()=>({
            userData: [
                {name: 'Active', value: active},
                {name: 'Inactive', value: inactive},
                {name: 'Suspended', value: suspended},
            ],
            isLoading: false
        }))
    }

    getAllDashUser(){
        const { filterUserType, filterArea} = this.state
        const data = {
            type: filterUserType === 'All' ? '' : filterUserType,
            area: filterArea,
        }
        API.dashUser(data)  
        .then((res) => {
            if(res.success){
                const active = res.user_active.count
                const inactive = res.user_inactive.count
                const suspended = res.user_suspended.count

                const registered = res.registered_users

                this.setPieChartData(active, inactive, suspended)
                this.setLineChartData(registered)
            }
        }).catch(err => console.log(err))
    }
    render(){
        const { userData, isLoading, registeredData } = this.state
        const { areaOptions } = this.props
        return(
            <Fragment>
                <Row className="mb-3">
                    <Col>
                        <h4>Users</h4>
                    </Col>
                </Row>
                <Row noGutters className="mb-3">
                    <Col xs="12" lg="5" className="mr-2">
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
                            onChange={this.handleFilterArea}
                            placeholder="Search for Area"
                        />
                    </Col>
                    <Col xs="12" lg="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">User Type</InputGroupAddon>
                            <Input 
                                className="d-inline-block" 
                                type="select" 
                                name="usertype" 
                                id="usertype" 
                                onChange={this.filterUserType}>
                                <option>All</option>
                                <option>Producer</option>
                                <option>Consumer</option>
                            </Input>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col xs="12" lg="7" className="mb-3 mb-lg-0">
                        <LineChartCard registeredData={registeredData}/>
                    </Col>
                    <Col xs="12" lg="5" className="mb-3 mb-lg-0">
                        <PieChartCard 
                            userData={userData}
                            isLoading={isLoading}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default DashUser