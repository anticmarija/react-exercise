import React from "react";
import axios from '../../config';

class TaskListItem extends React.Component {

    state = {
        name: '',
        status: '',
        project: '',
        loading: true
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
        return this.state.loading ? 'Loading....' :
            <div>
                <div>{this.state.name}</div>
                <div>{this.state.status}</div>
                <div>{this.state.project}</div>

            </div>
    }

}

export default TaskListItem;