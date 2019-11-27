import React, { Component, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface ICreateToDoState {
    todo_description: string,
    todo_completed: boolean
}

export default class CreateToDo extends Component<any, ICreateToDoState> {
    constructor(props: any) {
        super(props);

        this.state = {
            todo_description: '',
            todo_completed: false
        }
        
        this.onChangeToDoDescription = this.onChangeToDoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeToDoDescription(event:ChangeEvent<HTMLInputElement>): void {
        this.setState({
            todo_description: event.target.value
        });
    }

    onSubmit(event:FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { todo_description, todo_completed } = this.state;

        console.log('FORM SUBMITTED');
        console.log(`FORM DESCRIPTION: ${todo_description}`);
        console.log(`FORM COMPLETED: ${todo_completed}`);

        const newTodo = {
            todo_description,
            todo_completed
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
             .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_completed: false
        });
    }

    render() {
        const { todo_description } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Description: </label>
                        <input
                            type='text'
                            value={todo_description}
                            onChange={this.onChangeToDoDescription}
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