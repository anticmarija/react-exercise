import React from "react";
import TasksList from '../tasks-list/TasksList';
import axios from '../../config';

class Home extends React.Component {
    state = {
        tasks: [],
        loading: true,
        limit: '',
        status: ''
    }

    getLimitedNumberOfTasks = async (e) => {
        if (e.target.value !== 'all') {
            this.setState({
                limit: e.target.value,
                loading: true
            });
        } else {
            this.setState({
                limit: '',
                loading: true
            });
        }
    }

    getFilteredByStatus = async (e) => {
        if (e.target.value !== 'all') {
            this.setState({
                status: e.target.value,
                loading: true
            });
        } else {
            this.setState({
                status: '',
                loading: true
            });
        }

    }

    async componentDidMount() {
        const tasks = await axios.get('/tasks');
        this.setState({
            tasks: tasks.data.items,
            loading: false
        });

        const user = await axios.get('/user');

        this.setState({
            username: user.data.username
        });
        console.log('user');
    }

    async componentDidUpdate(_, prevState) {
        console.log('did update')
        if (this.state.limit !== prevState.limit || this.state.status !== prevState.status) {
            const req = '?limit=' + this.state.limit + '&status=' + this.state.status;
            console.log(req);
            const tasks = await axios.get('/tasks' + req);
            this.setState({
                tasks: tasks.data.items,
                loading: false
            });
        }
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    Welcome to App!
                    <span>{this.state.username}</span>
                </header>

                <div>Limit tasks:</div>
                <select name="limit" onChange={this.getLimitedNumberOfTasks}>
                    <option value="all">All</option>
                    <option value="1">1</option>

                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                </select>

                <select name="status" onChange={this.getFilteredByStatus}>
                    <option value="all">All</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="DRAFT">Draft</option>
                    <option value="QUEUED">Queued</option>
                </select>

                {this.state.loading && <h3>loading...</h3>}


                {!this.state.loading && <TasksList tasks={this.state.tasks} />}
            </div >)
    }
}

export default Home;