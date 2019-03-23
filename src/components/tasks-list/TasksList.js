import React from "react";
import { Link } from 'react-router-dom';

const TasksList = (props) => {
    return (
        <div className="main-wrapper">
            {props.tasks.length ?
                <ul> {props.tasks.map(task => {
                    return <div>
                        <Link
                            to={`/tasks/${task.id}`}
                            params={{ id: task.id }}
                            key={task.id}>
                            {task.name}
                        </Link>
                    </div>
                })}</ul>
                : <div>No tasks</div>
            }
        </div>
    );
}

export default TasksList;