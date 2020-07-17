import React, { Component } from 'react';
import './App.css';
import Navbar from './container/Nav/nav';
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Navbar />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
