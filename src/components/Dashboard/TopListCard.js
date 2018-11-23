import React, { Component, Fragment } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom'

const TopListCard = (props) => {
    const { data, label, link, expand } = props
    const list = 
        (!data) 
            ? <span>No Data.</span>
            : data.map((data, index)=>{
                return(
                    <Row className="border-top border-bottom py-2" key={index}>
                        <Col>
                            <span className="mr-auto">
                                {data.key}
                            </span>
                        </Col>
                        <Col className="text-right">
                            <span>
                                {data.value}
                            </span>
                        </Col>
                    </Row>
                )
            })
    
    return(
        <Card>
            <CardHeader className="bg-transparent font-weight-bold">{label[0]}</CardHeader>
            <CardBody className="py-1">
                <Row className="mb-2">
                    <Col>
                        <small className="mr-auto">{label[1]}</small>
                    </Col>
                    <Col className="text-right">
                        <small>{label[2]}</small>
                    </Col>
                </Row>
                {list}
                <Row className="py-2">
                    <Col>
                        <Link
                            to="#"
                            className="mt-3" 
                            onClick={(e)=>{ 
                                e.preventDefault()
                                expand(link)
                            }} >See all</Link>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default TopListCard