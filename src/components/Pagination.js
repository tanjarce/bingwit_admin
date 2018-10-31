import React, { Component } from 'react'
import { Row , Col, Button , CustomInput} from 'reactstrap'

export default class CBReactTablePagination extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1
    }
    this.handleChange = this.handleChange.bind(this) 
    this.Next = this.Next.bind(this)
    this.Previous = this.Previous.bind(this)
    this.Update = this.Update.bind(this)
  }

  handleChange (e) {
    const { dataCount, pageSize } = this.props
    const pagelength = Math.ceil(dataCount / pageSize)

    const target = e.target
    // const value = (Number(target.value) <= 1)
    // ? 1
    // : (Number(target.value) >= pagelength)
    //   ? pagelength
    //   : target.value
    this.setState(()=>({
      [target.name]: target.value
    }), ()=>{console.log(this.state.currentPage)})    
  }

  
  Update () {
    const { updateTable, pageSize, dataCount } = this.props
    const { currentPage } = this.state

    const check = () => {
      const pagelength = Math.ceil(dataCount / pageSize)

      if(currentPage > pagelength){
        this.setState(()=>({
          currentPage: pagelength
        }))
      } else if(currentPage <= 0){
        this.setState(()=>({
          currentPage: 1
        }))
      } 
    }

    new Promise((resolve, reject)=>{
      check()
      resolve()
    }).then(()=>{
      const { updateTable, pageSize } = this.props
      const { currentPage } = this.state

      const offset = (currentPage - 1) * pageSize
      console.log(`offset ${offset} limit: ${pageSize}`)
      updateTable({offset, limit: pageSize})
    })

  }

  Next () {
    this.setState((prevState)=>({
      currentPage: Number(prevState.currentPage) + 1
    }), ()=>{
      this.Update()
    })
  }

  Previous () {
    this.setState((prevState)=>({
      currentPage: Number(prevState.currentPage) - 1
    }),()=>{
      this.Update()
    })
  }

  render () {
    const {paginationData: {offset, limit}, showPageSizeOptions, pageSizeOptions, pageSize, showPageJump, onPageSizeChange, dataCount } = this.props
    // const {currentPage} = this.state
    const pagelength = Math.ceil(dataCount / limit)

    const currentPage = (offset / limit) + 1

    const canPrevious = (Number(currentPage) <= 1) ? false : true
    const canNext = (Number(currentPage) >= pagelength) ? false : true

    return (
      <div className="pagi_main">
        <div className='pm-d'>
        {/* Page Previous */}
        <Row>
          <Col></Col>
          <Col xs='auto'>
            <Button
              className='button'
              onClick={()=>{
                this.Previous()
              }}
              disabled={!canPrevious}>
              Previous
            </Button>
          </Col>
          <Col xs='auto'className='col'>
            {this.props.pageText}{''}
              { showPageJump && 
                <CustomInput
                  id="custom"
                  min="1"
                  className='input'
                  name="currentPage"
                  type='number'
                  value={currentPage}
                  onChange={this.handleChange}
                  onBlur={this.Update}
                  onKeyPress={e => {
                      if (e.which === 13 || e.keyCode === 13) {
                        this.Update()
                      }
                  }}
                />
              }
              {/* of Max Page */}
              <span>{`of ${pagelength || 1}`}</span>

              {/* Page Select */}
              {showPageSizeOptions && 
                <CustomInput
                  id="custom"
                  className='input'
                  type='select'
                  onChange={e => {
                    new Promise((resolve, reject)=>{
                      onPageSizeChange(Number(e.target.value))
                      resolve()
                    }).then(()=>{
                      this.Update()
                    })
                  }}
                  value={pageSize}>
                  {pageSizeOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {option} {this.props.rowsText}
                    </option>))}
                </CustomInput>}
          </Col>
          <Col  xs='auto'>
            <Button
              className='button'
              onClick={() => {
                this.Next()
              }}
              disabled={!canNext}>
              Next
            </Button>
          </Col>
          <Col></Col>
        </Row>
          {/* {console.log(" Page " + tablePage," Row " +  tableRow)} */}
          </div>
      </div>
    )

  }
}

/*       
          {(typeof this.rowCount !== 'undefined') ?
              <span className="-rowInfo">{"Showing "}
                <span className="-rowMin">{this.rowMin}</span>
                  {" - "}
                <span className="-rowMax">{this.rowMax}</span>
                  {" of "} 
                <span className="-rowCount">{this.rowCount}</span>
                  {" total rows"}
              </span>
            : ''} */
