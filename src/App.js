import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import {Header} from './component/header'
import Currencies from './component/currencies'
import {Footer} from './component/footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>All the current and historical forex rates are given by fixer.io and European Central Bank</p>
        <p>This is not the current forex in local time, this is the last evening spot rate</p>
        <Currencies/>
        <Footer/>
      </div>
    );
  }
}

export default App;
