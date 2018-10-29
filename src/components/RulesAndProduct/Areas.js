import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import Table from '../Tables'
import SearchCount from '../SearchAndCount'
import DeleteModal from '../../modals/DeleteModal'
import ProductModal from '../../modals/ProductModal'

import dots from '../../images/show_more.svg'
import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'
import moment from 'moment'


class Areas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRow: null,
            modalType: 'delete',
            isOpen: false,
        }
    }

    componentDidMount(){
        console.log(this.props)
        // console.log('area!')
        // this.props.getAllArea()
    }
    
    render() {
        return (
            <React.Fragment>
                <SearchCount text="Area"/>
            </React.Fragment>
        );
    }
}
export default withRouter(Areas)
