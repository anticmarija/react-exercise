import React from "react";
import axios from '../../config';
import './TaskDetails.css';

class TaskDetails extends React.Component {

    state = {
        task: null,
        loading: true,
        error: null
    }

    deleteTask = async () => {
        try {
            await axios.delete('/tasks/' + this.props.match.params.id);
            this.setState({
                message: 'Successfully deleted',
                task: null
            })
        } catch (err) {
            this.setState({ message: 'This task can not be deleted!' });
        }
    }


    async componentDidMount() {
        try {
            const { data } = await axios.get('/tasks/' + this.props.match.params.id);
            this.setState({
                task: data,
                loading: false
            })
        } catch (err) {
            this.setState({
                message: "This task does not exist!"
            });
        }

    }
    render() {
        return this.state.loading ?
            <p className='task-details'>Loading.... </p>
            : <div className='task-details'>
                <p className='task-details_label'>{this.state.task && this.state.task.name}</p>
                <p className='task-details_label'>{this.state.task && this.state.task.status}</p>
                <p className='task-details_label'>{this.state.task && this.state.task.project}</p>

                <button onClick={this.deleteTask} className="tasks-details_button">Delete task</button>
                <p>{this.state.message}</p>
            </div >

    }

}

export default TaskDetails;