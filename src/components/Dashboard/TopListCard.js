import React, { Component, Fragment } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { css } from 'react-emotion';

const override = css`
    display: inlineBlock;
    margin: 0;
    border-color: red;
`;

const TopListCard = (props) => {
    const { data, label, link, expand, isLoading } = props

    const list = 
        (!data) 
            ? <span>No Data.</span>
            : !data.length 
                ? <span>No Data.</span>
                :   data.map((data, index)=>{
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
                {
                    isLoading 
                        ?   <Row>
                                <Col className="d-flex my-3">
                                    <div className='d-inline-block mx-auto'>
                                        <SyncLoader
                                            className={override}
                                            sizeUnit={"px"}
                                            size={5}
                                            color={'#17C1BC'}
                                            loading={true}/>
                                    </div> 
                                </Col>
                            </Row>
                        :   list
                }
                {
                    typeof link !== 'undefined' && 
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
                }
            </CardBody>
        </Card>
    )
}

export default TopListCard