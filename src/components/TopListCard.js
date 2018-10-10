import React from 'react'
import { Card, CardHeader, CardBody} from 'reactstrap';

const data = [{name: 'Active', value: 6034}, {name: 'Inactive', value: 753},
                      {name: 'Banned', value: 300}];

const TopListCard = () => {
    const list = data.map((data, index)=>{
        return(
            <div key={index} className="d-flex">
                <span className="mr-auto">
                    {data.name}
                </span>
                <span>
                    {data.value}
                </span>
            </div>
        )
    })
    
    return(
        <Card>
            <CardHeader className="bg-transparent">Group</CardHeader>
            <CardBody>
                <dir className="d-flex p-0 mt-0 text-muted">
                    <small className="mr-auto">Title</small>
                    <small>Value</small>
                </dir>
                {list}
            </CardBody>
        </Card>
    )
}

export default TopListCard