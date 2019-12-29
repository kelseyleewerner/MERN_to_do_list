import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

interface IToDoProps {
    todo: IToDo
}

interface IToDo {
    todo_description: string,
    todo_completed: boolean,
    _id: number
}

const Todo: SFC<IToDoProps> = props => {
    const { todo } = props;
    return (
        <tr>
            <td className={ todo.todo_completed ? 'completed' : '' }>{ todo.todo_description }</td>
            <td>
                <Link to={ "/edit/" + todo._id }>Edit</Link>
            </td>
        </tr>
    );
}

export default Todo;