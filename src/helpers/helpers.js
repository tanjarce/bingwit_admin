import React from 'react'
import { toast } from 'react-toastify'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import dots from '../images/show_more.svg'

export function toastPop({message, type = 'success', autoClose= 3000}) {
    toast(message, {type, autoClose})
}

export function addAction(info, options) {
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