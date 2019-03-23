import React from "react";
import { Link } from 'react-router-dom';
import './TasksList.css';

const TasksList = (props) => {
    return (props.tasks.length ?
        <ul className="tasks-list"> {props.tasks.map(task => {
            return <div className='tasks-list_item'
                key={task.id}>
                <Link
                    to={`/tasks/${task.id}`}
                    params={{ id: task.id }}>
                    {task.name}
                </Link>
            </div>
        })}</ul>
        : <p className='tasks-list tasks-list_infoLabel'>There are no tasks matching!</p>
    );
}

export default TasksList;