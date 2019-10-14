import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <h2>To Do List</h2>
        </div>
      </Router>
    );
  }
}

export default App;