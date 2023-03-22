import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import CompleteTask from './complete-task';
import RemoveTask from './remove-task';

const ItemsListTasks = (props) => {

    function markCompleted (task) {
        return task.completed ? 'line-through' : 'none';
    }

    return (
        props.tasks.map(task =>
            <tr key={task.id} data-testid={'task'}>
                <td width='75%'
                    data-testid={'name-task'}
                    style={{textDecoration: markCompleted(task)}} >                    
                    {task.name}
                </td>
                <td className='text-right'>
                    <CompleteTask
                        task={task}
                        reloadTasks={props.reloadTasks}
                        className={task.completed ? 'hidden' : null} />
                    &nbsp;

                    <Link to={"/update/" + task.id} 
                        className={task.completed ? 'hidden' :'btn btn-warning btn-sm'}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    &nbsp;

                    <RemoveTask 
                        task={task}
                        reloadTasks={props.reloadTasks} />
                </td>                
            </tr>
        )
    )
}

ItemsListTasks.propTypes = {
    tasks: PropTypes.array.isRequired,
    reloadTasks: PropTypes.func.isRequired
}

export default ItemsListTasks;