import React, { Component } from 'react'
import { Form } from 'reactstrap'
import '../../styles/style.css'
// import * as API from '../../services/API'
import * as Help from '../../toastify/helpers'

class ToggleAddForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen : false,
            addInput: ''
        }
        this.openForm = this.openForm.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addInput = React.createRef()
    }

    openForm (){
        this.setState(
            {isOpen: true},()=>{
                this.addInput.current.focus()
            })

    }
    closeForm (e){
        e.preventDefault()
        this.setState({isOpen: false})
    }

    handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        this.setState(()=>({
            [name]: value
        }))
    }

    handleSubmit (e){
        const { addInput } = this.state
        e.preventDefault()
        if(addInput.trim() === ''){
            Help.toastPop({message: 'Please Input something...', type: 'error'})
            this.addInput.current.focus()
        } else{
            this.props.handleSubmit(addInput)
            this.setState({
                addInput: '',
                isOpen: false
            })
        }
    }


    render(){
        console.log()
        const { isOpen, addInput } = this.state
        const { handleSubmit, text } = this.props
        return(
            <React.Fragment>
                <Form className={`addForm ${isOpen?'addForm-show':''}`} onSubmit={this.handleSubmit}>
                    {
                        isOpen && (
                            <input 
                                type="text" 
                                className="inpt addInput" 
                                placeholder={`Input New ${text}`}
                                name="addInput"
                                onChange={this.handleChange} 
                                value={addInput}
                                ref={this.addInput}
                                />
                        )
                    }
                    <input 
                        type="submit"
                        className="inpt addButton" 
                        onClick={
                            (e)=>{
                                if(!isOpen){
                                    e.preventDefault()
                                    this.openForm()
                                }
                            }
                        }
                        value={
                            !isOpen ? `+ Add ${text}` : '✓ Save'
                        }
                    />
                    {
                        isOpen && (
                            <input 
                                type="submit"
                                className="inpt cancelButton"
                                onClick={
                                    this.closeForm
                                }
                                value="✗ Cancel"
                            />
                        )
                    }
                </Form>
            </React.Fragment>
        )
    }
}

export default ToggleAddForm