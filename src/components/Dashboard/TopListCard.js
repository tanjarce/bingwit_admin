import React from 'react'
import { Card, CardHeader, CardBody, CardFooter} from 'reactstrap';


const TopListCard = (props) => {
    const { data, label } = props
    const list = 
        (!data) 
            ? <span>No Data.</span>
            : data.map((data, index)=>{
                return(
                    <div key={index} className="d-flex">
                        <span className="mr-auto">
                            {data.key}
                        </span>
                        <span>
                            {data.value}
                        </span>
                    </div>
                )
            })
    
    return(
        <Card>
            <CardHeader className="bg-transparent font-weight-bold">{label[0]}</CardHeader>
            <CardBody>
                <div className="d-flex p-0 mt-0 text-muted">
                    <small className="mr-auto">{label[1]}</small>
                    <small>{label[2]}</small>
                </div>
                {list}
                <a className="mt-3" href="#">See all</a>
            </CardBody>
        </Card>
    )
}

export default TopListCard