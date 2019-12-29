import React, { Component, ChangeEvent, FormEvent } from 'react';
import { History } from 'history';
import axios from 'axios';

interface ICreateToDoState {
    todo_description: string,
    todo_completed: boolean
}

interface ICreateToDoProps {
    history: History
}

export default class CreateToDo extends Component<ICreateToDoProps, ICreateToDoState> {
    constructor(props: ICreateToDoProps) {
        super(props);

        this.state = {
            todo_description: '',
            todo_completed: false
        }
        
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmitTodo = this.onSubmitTodo.bind(this);
    }

    onChangeTodoDescription(event:ChangeEvent<HTMLInputElement>): void {
        this.setState({
            todo_description: event.target.value
        });
    }

    onSubmitTodo(event:FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { todo_description, todo_completed } = this.state;
        const { history } = this.props;
        const newTodo = {
            todo_description,
            todo_completed
        }

        console.log('FORM SUBMITTED');
        console.log(`FORM DESCRIPTION: ${todo_description}`);
        console.log(`FORM COMPLETED: ${todo_completed}`);

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(response => console.log(response.data));

        this.setState({
            todo_description: '',
            todo_completed: false
        });
        history.push('/');
    }

    render() {
        const { todo_description } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmitTodo}>
                    <div>
                        <label>Description: </label>
                        <input
                            type='text'
                            value={todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Create To Do"
                        />
                    </div>
                </form>
            </div>
        )
    }
}