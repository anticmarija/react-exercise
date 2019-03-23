import React from "react";
import axios from '../../config';
import './TaskDetails.css';

class TaskDetails extends React.Component {

    state = {
        name: '',
        status: '',
        project: '',
        loading: true,
        error: null
    }

    deleteTask = async () => {
        try {
            await axios.delete('/tasks/' + this.props.match.params.id);
            this.setState({
                message: 'Succesfully deleted'
            })
        } catch (err) {
            this.setState({ message: 'This task can not be deleted!' });
        }
    }


    async componentDidMount() {
        const response = await axios.get('/tasks/' + this.props.match.params.id);
        this.setState({
            name: response.data.name,
            status: response.data.status,
            project: response.data.project,
            loading: false
        })
    }
    render() {
        return this.state.loading ? <p className='task-details'>Loading.... </p> :
            <div className='task-details'>
                <p className='task-details_label'>Name: {this.state.name}</p>
                <p className='task-details_label'>Status: {this.state.status}</p>
                <p className='task-details_label'>Project: {this.state.project}</p>


                <button onClick={this.deleteTask} className="tasks-details_button">Delete task</button>
                <p>{this.state.message}</p>

            </div >

    }

}

export default TaskDetails;