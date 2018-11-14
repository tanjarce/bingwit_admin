import React, { Component } from 'react'
import { Row , Col, Button , CustomInput} from 'reactstrap'

export default class CBReactTablePagination extends Component {
  constructor (props) {
    super(props)
    this.state = {
      update: false,
      currentPage: 1,
      focus: false
    }
    this.handleChange = this.handleChange.bind(this) 
    this.Next = this.Next.bind(this)
    this.Previous = this.Previous.bind(this)
    this.Update = this.Update.bind(this)
    this.hadleBlur = this.hadleBlur.bind(this) 
    this.handleFocus = this.handleFocus.bind(this)
    this.pageInput = React.createRef()
  }
  handleFocus () {
    this.setState(()=>({
      focus: true
    }))
  }

  handleChange (e) {
    const target = e.target
    this.setState(()=>({
      [target.name]: target.value
    }),()=>{console.log(target.name, target.value, target)})
    // const { dataCount, pageSize, paginationData: {offset, limit} } = this.props
    // const pagelength = Math.ceil(dataCount / pageSize)
    
    // console.log(target.value)
    
    // let value = (target.value > pagelength) 
    //   ? pagelength
    //   : target.value 

    // const newOffset = (value * limit) - limit

    // this.props.paginationData.offset = newOffset
    // this.props.paginationData.limit = limit

  }

  hadleBlur (e) {
    this.setState(()=>({
      focus: false
    }))

    const target = e.target
    const {paginationData: {offset, limit} } = this.props
    const currentPage = (offset / limit) + 1

    // if current page is same from the props it will not update
    if(Number(target.value) !== currentPage){
      this.Update()
    }
  }

  
  Update (data) {
    let changeRowSize = data || false
    const {paginationData: {offset, limit}, pageSize, dataCount } = this.props
    const currentPageonProps = (offset / limit) + 1
    const { currentPage } = this.state

    const check = () => {
      const pagelength = Math.ceil(dataCount / pageSize)

      if(currentPage > pagelength){
        this.setState(()=>({
          currentPage: pagelength
        }))
      } else if(currentPage <= 0){
        this.setState(()=>({
          currentPage: currentPageonProps
        }))
      } 
    }

    new Promise((resolve, reject)=>{
      check()
      resolve()
    }).then(()=>{
      const { paginationData: {offset, limit}, updateTable, pageSize } = this.props
      const { currentPage } = this.state
  
      const currentPageonProps = (offset / limit) + 1

      // if inputed current page is !== to current page from props the table will update OR
      // if this function is triggered by pagesize input field the table will update ELSE
      // table will NOT UPDATE

      if(Number(currentPage) !== currentPageonProps || changeRowSize){
        const offset = (currentPage - 1) * pageSize
        updateTable({offset, limit: pageSize})
      }
    })

  }

  Next () {
    this.setState((prevState)=>({
      currentPage: Number(prevState.currentPage) + 1
    }), ()=>{
      // const { paginationData: {offset, limit}, updateTable, pageSize } = this.props

      this.Update()
    })
  }

  Previous () {
    this.setState((prevState)=>({
      currentPage: Number(prevState.currentPage) - 1
    }),()=>{
      // const { paginationData: {offset, limit}, updateTable, pageSize } = this.props
      console.log(this.state.currentPage)
      this.Update()
    })
  }

  componentDidMount(){
    const {paginationData: {limit, offset}, onPageSizeChange} = this.props

    // const {paginationData: {offset, limit}} = this.props
    const currentPageonProps = (offset / limit) + 1
  
    this.setState(()=>({
      currentPage: currentPageonProps
    }))
    // to change the pagesize of table (yung mismong height)
    setTimeout(()=>{
      onPageSizeChange(limit)
    }, 1)
  }

  componentWillReceiveProps(){
    const {paginationData: {limit, offset}} = this.props
    const currentPageonProps = (offset / limit) + 1
    
    if(offset === 0){
      this.setState(()=>({
        currentPage: 1
      }))
    } else {
      this.setState(()=>({
        currentPage: currentPageonProps
      }))
    }
  }

  render () {
    const {paginationData: {offset, limit}, showPageSizeOptions, pageSizeOptions, showPageJump, onPageSizeChange, dataCount } = this.props
    const {focus, currentPage} = this.state

    const pagelength = Math.ceil(dataCount / limit)
    
    const currentPageonProps = (offset / limit) + 1

    // if input field is focused the buttons will automatically disable
    const canPrevious = (focus) ? false : (currentPageonProps <= 1) ? false : true
    const canNext = (focus) ? false : (currentPageonProps >= pagelength) ? false : true

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
                  value={
                    currentPage || ''
                  }
                  innerRef={this.pageInput}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.hadleBlur}
                  onKeyPress={e => {
                      if (e.which === 13 || e.keyCode === 13) {
                        this.Update()
                        // this.hadleBlur()
                        this.pageInput.current.blur()
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
                      this.Update(true)
                    })
                  }}
                  value={limit}>
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