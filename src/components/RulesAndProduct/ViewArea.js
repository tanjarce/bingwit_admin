import React, { Component, Fragment } from 'react'
import { Container, Form, InputGroupAddon, InputGroup, Input, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom'
import * as Help from '../../toastify/helpers'
import editIcon from '../../assets/edit-solid.svg'

import * as API from '../../services/API'
import moment from 'moment'



class ViewFeedback extends Component{
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            area: {},
            users: [],
            areaInput: ''
        }
        this.goBack = this.goBack.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getAreaAndUsers = this.getAreaAndUsers.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    handleChange (e) {
        const value = e.target.value
        this.setState((prevState)=>({
            areaInput: value 
        }))
    }
    handleSubmit (e) {
        e.preventDefault()
        const { areaInput } = this.state

        if(areaInput.trim() !== ''){
            const id = this.props.match.params.id
            API.updateArea(id, areaInput)
                .then(res => {
                    if(res.success){
                        this.getAreaAndUsers()
                        Help.toastPop({message: 'Changes Saved!', type: 'success'})
                        this.toggleEdit()
                    }
                }).catch(err => console.log(err))
        }
    }

    toggleEdit () {
        // console.log('edit')
        this.setState((prevState)=> ({
            edit: !prevState.edit
        }), ()=>{
            console.log(this.state.edit)
        })
    }

    goBack (){
        this.props.history.goBack()
    }

    getAreaAndUsers(){
        const id = this.props.match.params.id

        API.getAreasAndUsers(id)
            .then(res => {
                if(res.success){
                    console.log(res)
                    this.setState(()=>({
                        area: {
                            area_address: res.area.area_address,
                            createdAt: res.area.createdAt
                        },
                        users: res.area.user || [],
                        areaInput: res.area.area_address
                    }), ()=> {
                        console.log(this.state)
                    })
                }
            }).catch(err => console.log(err))
    }
    
    componentDidMount(){
       this.getAreaAndUsers()
    }
    render(){
        const { edit, area: { area_address, createdAt }, users, areaInput } = this.state
        // console.log(this.state)
        const userList = (users.length) 
            ? users.map(user => 
                (<li key={user.id}>
                    <Link to={`/mnguser/${user.id}`} >
                        {user.full_name}
                    </Link>
                </li>))
            : <li><a>No users in this area.</a></li>

        return(
            <div className='rule-body'>
                <div className="my-3">
                    <NavLink to='#' activeClassName='gback' className="my-3" onClick={ (e)=>{
                        e.preventDefault()
                        this.goBack()
                    }}>
                        &lang; &nbsp; Go Back
                    </NavLink>
                </div>
                <div>
                    {
                        (edit)
                        ?(  <React.Fragment>
                                <Form onSubmit={this.handleSubmit}>
                                    <InputGroup>
                                        <Input 
                                            name="areaInput"
                                            onChange={this.handleChange}    
                                            defaultValue={areaInput}
                                        />
                                        <InputGroupAddon addonType="append"><Button color="primary">Add Area</Button></InputGroupAddon>
                                        <InputGroupAddon addonType="append"><Button type="button" color="secondary" onClick={this.toggleEdit}>Cancel</Button></InputGroupAddon>
                                    </InputGroup>
                                </Form>
                                {/* <button onClick={this.toggleEdit}>Save</button> */}
                            </React.Fragment>
                        )
                        :(  <React.Fragment>
                                <span className="d-inline-block productName">
                                    <h4>{area_address}</h4>
                                    <span className="d-inline-flex align-items-center editIcon" onClick={this.toggleEdit}>
                                        edit <img src={editIcon} style={{'width': '18px', 'height': '18px', 'paddingLeft': '3px'}}/>
                                    </span>
                                </span>
                                
                            </React.Fragment>
                        )
                    }

                </div>    
                <div>
                    <p className="text-muted my-2">Created: {moment(createdAt).format('MMMM D, YYYY')}</p>
                    <p>Users in this Area:</p>
                    <ul>
                        {userList}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ViewFeedback 