import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import dots from '../images/show_more.svg'

export default ({info, options}) => {
    const dropdowItem = options.map( option => (
        <DropdownItem key={option.text} onClick={() => { option.func(info) }}>{option.text}</DropdownItem>
    ))
    return (
        <UncontrolledDropdown className="text-muted" size="sm">
            <DropdownToggle className="bg-transparent border-0 p-0 h-auto d-inline-flex">
                <img with="15px" height="15px" src={dots} alt="show_more" className="m-auto"/>
            </DropdownToggle>
            <DropdownMenu>
                {dropdowItem}
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}
