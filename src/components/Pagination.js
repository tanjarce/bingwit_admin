import React, { Component } from 'react'
import { Row , Col, Button , CustomInput} from 'reactstrap'

export default class CBReactTablePagination extends Component {
  constructor (props) {
    super()

    this.pageRow = this.pageRow.bind(this)
    this.getSafePage = this.getSafePage.bind(this)
    this.changePage = this.changePage.bind(this)
    this.applyPage = this.applyPage.bind(this)

    this.updateCurrentRows(props)    

    this.state = {
      page: props.page,
      tablePage : '',
      tableRow : ''
    }
  }
  componentDidMount(){
    this.pageRow()
  }
  pageRow(page){
    this.setState({
        tablePage : this.props.pageSize,
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ page: nextProps.page })

    this.updateCurrentRows(nextProps)
  }

  updateCurrentRows(props) {
    if (   typeof props.sortedData  !== 'undefined'  //use props.data for unfiltered (all) rows
        && typeof props.page !== 'undefined'
        && typeof props.pageSize !== 'undefined'
    ){
      this.rowCount = props.sortedData.length  //use props.data.length for unfiltered (all) rows
      this.rowMin = props.page * props.pageSize + 1
      this.rowMax = Math.min((props.page + 1) * props.pageSize, this.rowCount)
    }
  }

  getSafePage (page) {
    if (isNaN(page)) {
      page = this.props.page
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1)
  }

  changePage (page) {
    page = this.getSafePage(page)
    this.setState({ 
      page,
      tablePage : page + 1,
      tableRow : this.props.pageSize
    })
    if (this.props.page !== page) {
      this.props.onPageChange(page)
    }
    this.updateCurrentRows(page)
  }

  applyPage (e) {
    if (e) { e.preventDefault() }
    const page = this.state.page
    this.changePage(page === '' ? this.props.page : page)
  }
  render () {
    const {
      // Computed
      pages,
      // Props
      page,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange
    } = this.props
    return (
      <div className="pagi_main">

        <div className='pm-d'>
        {/* Page Previous */}
        <Row>
          <Col></Col>
        <Col xs='auto'>
          <Button
            className='button'
            onClick={() => {
              if (!canPrevious) return
              this.changePage(page - 1)}}
              
              disabled={!canPrevious}>

            {this.props.previousText}
          </Button>

              </Col>
              <Col  xs='auto' className='col'>
              {/* Page Text */}
              {this.props.pageText}{' '}

              {/* Page Input */}
              {showPageJump && 
                  <CustomInput
                    id=''
                    className='input'
                    type='text'
                    onChange={e => {
                      const val = e.target.value
                      const page = val - 1
                      if (val === '') {
                        return this.setState({ page: val })}
                      this.setState({ 
                        page: this.getSafePage(page),
                       })
                       this.pageRow}}
                       
                    value={this.state.page === '' ? '' : this.state.page + 1}
                    onBlur={this.applyPage}
                    onKeyPress={e => {
                      if (e.which === 13 || e.keyCode === 13) {
                        this.applyPage()}}}/>}
               
                    {/* of Max Page */}
                    <span>{this.props.ofText}{' '}{pages || 1}</span>

            {/* Page Select */}
            {showPageSizeOptions && 
                <CustomInput
                  id=''
                  className='input'
                  type='select'
                  onChange={e => {
                    onPageSizeChange(Number(e.target.value))
                    this.pageRow()
                  }}
                  value={pageSize}>
                  {pageSizeOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {option} {this.props.rowsText}
                    </option>))}
                </CustomInput>}
                    </Col>
                    <Col  xs='auto'>

        {/* Page Next */}
          <Button
            className='button'
            onClick={() => {
              if (!canNext) return
              this.changePage(page + 1)
            }}
            disabled={!canNext}>

            {this.props.nextText}
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
