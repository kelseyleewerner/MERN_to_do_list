import React, { Component, FormEvent, ChangeEvent } from 'react';
import { match } from 'react-router-dom';
import axios from 'axios';

interface IEditToDoState {
    todo_description: string,
    todo_completed: boolean
}

interface IEditToDoProps {
    match: match<any>
}

export default class EditToDo extends Component<IEditToDoProps, IEditToDoState> {
    constructor(props:IEditToDoProps) {
        super(props);
        
        this.state = {
            todo_description: '',
            todo_completed: false
        }
        this.onSubmitTodo = this.onSubmitTodo.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        axios.get('http://localhost:4000/todos/', params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(error => console.log(error))
    }

    onSubmitTodo(event:FormEvent<HTMLFormElement>):void {
        // PENDING
    }

    onChangeTodoDescription(event:ChangeEvent<HTMLInputElement>):void {
        // PENDING
    }

    onChangeTodoCompleted(event:ChangeEvent<HTMLInputElement>):void {
        // PENDING
    }

    render() {
        const { todo_description, todo_completed } = this.state;

        return (
            <div>
                <h3>Update To Do</h3>
                <form onSubmit={this.onSubmitTodo}>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            value={ todo_description }
                            onChange={ this.onChangeTodoDescription }
                        />
                    </div>
                    <div>
                        <input
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={ this.onChangeTodoCompleted }
                            checked={ todo_completed }
                            value={ "${todo_completed}" }
                        />
                        <label htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>
                    <br/>
                    <div>
                        <input
                            type="submit"
                            value="Save"
                        />
                    </div>
                </form>
            </div>
        )
    }
}