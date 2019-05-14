import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Nav from './nav';
import '../../index.css';

class Main extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <Nav />
      </div>
    );
  }
}

export default Main;