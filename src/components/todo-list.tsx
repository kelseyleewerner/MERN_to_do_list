import React, { Component } from 'react';
import axios from 'axios';
import Todo from './todo';

interface IToDoListState {
    todos: Array<IToDo>
}

interface IToDo {
    todo_description: string,
    _id: number
}

export default class ToDoList extends Component<{}, IToDoListState> {
    constructor(props:any) {
        super(props);
        this.state = { todos: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
             .then(response => this.setState({ todos: response.data }))
             .catch(error => console.log(error))
    }

    todoList() {
        const { todos } = this.state;
        return todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>To Do List</h3>
                <table style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}