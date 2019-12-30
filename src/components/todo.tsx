import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

interface IToDoProps {
    todo: IToDo,
    deleteTodo: any  // TODO: add types
}

interface IToDo {
    todo_description: string,
    todo_completed: boolean,
    _id: number
}

const Todo: SFC<IToDoProps> = props => {
    const { todo, deleteTodo } = props;
    // TODO: change function name
    const blahFunction = () => {
        deleteTodo(todo._id)
            .then(history.push('/'))
    }

    return (
        <tr>
            <td className={ todo.todo_completed ? 'completed' : '' }>{ todo.todo_description }</td>
            <td>
                <Link to={ '/edit/' + todo._id }>Edit</Link>
                    /
                <a 
                    onClick={ blahFunction }
                    href="#"
                >
                    Delete
                </a>
            </td>
        </tr>
    );
}

export default Todo;