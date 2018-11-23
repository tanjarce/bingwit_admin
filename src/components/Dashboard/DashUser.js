import React, { Component, Fragment } from 'react';
import { Col, Row, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import PieChartCard from './PieChartCard'
import LineChartCard from './LineChartCard'
import UserCard from './UserCard'
import * as API from '../../services/API'

class DashUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getAllDashUser = this.getAllDashUser.bind(this)
    }
    componentDidMount(){
        this.getAllDashUser()
    }
    getAllDashUser(){
        const data = {
            type: '',
            area: '',
        }
        API.dashUser(data)  
        .then((res) => {
            if(res.success){
                console.log(res)
            }
        }).catch(err => console.log(err))
    }
    render(){
        return(
            <Fragment>
                <Row className="mb-3">
                    <Col>
                        <h4>Users</h4>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="12" lg="3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">User Type</InputGroupAddon>
                            <Input className="d-inline-block" type="select" name="usertype" id="usertype">
                                <option>All</option>
                                <option>Producer</option>
                                <option>Consumer</option>
                            </Input>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <UserCard type="active"/>
                    <UserCard type="inactive" />
                    <UserCard type="suspended" />
                    <UserCard type="total" />
                </Row>
                <Row className="mb-5">
                    <Col xs="12" lg="7" className="mb-3 mb-lg-0">
                        <LineChartCard />
                    </Col>
                    <Col xs="12" lg="5" className="mb-3 mb-lg-0">
                        <PieChartCard />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default DashUser