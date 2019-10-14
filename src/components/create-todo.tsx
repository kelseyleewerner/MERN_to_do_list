import React, { Component, ChangeEvent, FormEvent } from 'react';

type CreateToDoState = {
    todo_description: string,
    todo_completed: boolean
}

// TODO: FINISH THIS!!! NEED TO INCLUDE FUNCTIONS
interface ICreateToDo {
    state: CreateToDoState,
    onChangeToDoDescription(event:ChangeEvent<HTMLInputElement>): void,
    onSubmit(event:FormEvent<HTMLFormElement>): void
}

export default class CreateToDo extends Component<any, CreateToDoState> {
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
        const { todo_description } = this.state;

        console.log(`FORM DESCRIPTION: ${todo_description}`);

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