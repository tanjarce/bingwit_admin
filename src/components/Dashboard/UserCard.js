import React, { Component } from 'react';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';


class UserCard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     }
    //     this.getAllDashUser = this.getAllDashUser.bind(this)
    // }
    render(){
        const { type } = this.props
        const typeColor = (type) => {

            let color = (type === 'active') 
                ? "#17C1BC"
                : (type === 'inactive') 
                    ? "#A8A8A8"
                    : "#505050"
            
            return (
                <span 
                    className="statusColor" 
                    style={{
                        'display': 'inline-block',
                        'height': '20px',
                        'width': '20px',
                        'marginRight': '5px',
                        'backgroundColor': color 
                    }}>
                </span>)
        }
        return(
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle className="text-capitalize font-weight-bold">{(type !== 'total') && typeColor(type)} {type} Users</CardTitle>
                        <div className="d-flex p-0 mt-0 text-muted">
                            <small className="mr-auto">Title</small>
                            <small>Value</small>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default UserCard
