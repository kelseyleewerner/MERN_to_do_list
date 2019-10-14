import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CreateToDo from "./components/create-todo";
import EditToDo from "./components/edit-todo";
import ToDoList from "./components/todo-list";
import './App.css';

class App extends Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">To Do List</Link>
            </li>
            <li>
              <Link to="create">Create To Do</Link>
            </li>
          </ul>
          <Route path="/" exact component={ToDoList} />
          <Route path="/edit/:id" component={EditToDo} />
          <Route path="/create" component={CreateToDo} /> 
        </div>
      </Router>
    );
  }
}

export default App;