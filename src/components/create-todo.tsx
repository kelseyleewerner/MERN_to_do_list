import React, { Component, ChangeEvent, FormEvent } from 'react';
import { History } from 'history';
import axios from 'axios';

interface ICreateToDoState {
    todo_description: string,
    todo_completed: boolean,
    is_description_empty: boolean
}

interface ICreateToDoProps {
    history: History
}

export default class CreateToDo extends Component<ICreateToDoProps, ICreateToDoState> {
    constructor(props: ICreateToDoProps) {
        super(props);

        this.state = {
            todo_description: '',
            todo_completed: false,
            is_description_empty: false
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

        if (todo_description === '') {
            this.setState({ is_description_empty: true })
            return
        }

        const newTodo = {
            todo_description,
            todo_completed
        }
        console.log('FORM SUBMITTED');
        console.log(`FORM DESCRIPTION: ${todo_description}`);
        console.log(`FORM COMPLETED: ${todo_completed}`);

        this.setState({
            todo_description: '',
            todo_completed: false
        });
        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(response => console.log(response.data))
            .then(() => history.push('/'))
    }

    render() {
        const { todo_description, is_description_empty } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmitTodo}>
                    <div>
                        <label>Description: </label>
                        <input
                            type='text'
                            value={todo_description}
                            onChange={this.onChangeTodoDescription}
                            className={ is_description_empty ? 'input-error' : '' }
                        />
                        <p
                            className='input-error-label'
                            hidden={ is_description_empty ? false : true }
                        >
                            To do description is required
                        </p>
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