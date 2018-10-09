import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

import Login from './Login'
import Main from './Main'
import Sidebar from './Sidebar'
import ManageUser from './ManageUser'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer autoClose={3000}/>
        <Route path="/" component={Main}/>
      </div>
    );
  }
}

export default withRouter(App)