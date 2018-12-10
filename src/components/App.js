import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

import Login from './Login'
import Main from './Main'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

class App extends Component {
  componentWillMount(){
    document.title = "Bingwit Admin"
  }
  render() {
    return (
      <div>
        <ToastContainer autoClose={3000}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/" component={Main}/>
      </div>
    );
  }
}

export default withRouter(App)