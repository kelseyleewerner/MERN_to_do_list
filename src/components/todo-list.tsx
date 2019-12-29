import React, { Component } from 'react';
import axios from 'axios';
import Todo from './todo';

interface IToDoListState {
    todos: Array<IToDo>
}

interface IToDo {
    todo_description: string,
    todo_completed: boolean,
    _id: number
}

export default class ToDoList extends Component<{}, IToDoListState> {
    constructor(props:any) {
        super(props);
        this.state = { todos: [] }

        this.todoList = this.todoList.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
            .then(response => this.setState({ todos: response.data }))
            .catch(error => console.log(error))
    }

    todoList():Array<JSX.Element> {
        const { todos } = this.state;
        return todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>To Do List</h3>
                <table>
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