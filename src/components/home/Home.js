import React from "react";
import TasksList from '../tasks-list/TasksList';
import axios from '../../config';
import Dropdown from "../dropdown/Dropdown";
import './Home.css';

class Home extends React.Component {
    state = {
        tasks: [],
        loading: true,
        limit: '',
        status: ''
    }

    getLimitedNumberOfTasks = async (e) => {
        const limit = e.target.value !== 'ALL' ? e.target.value : '';
        this.setState({
            limit,
            loading: true
        });
    }

    getFilteredByStatus = async (e) => {
        const status = e.target.value !== 'ALL' ? e.target.value : '';
        this.setState({
            status,
            loading: true
        });

    }

    async componentDidMount() {
        try {
            const { data: { items } } = await axios.get('/tasks');
            this.setState({
                tasks: items,
                loading: false
            });
        } catch (err) {
            console.error(err);
        }
    }

    async componentDidUpdate(_, prevState) {
        if (this.state.limit !== prevState.limit || this.state.status !== prevState.status) {
            const req = '?limit=' + this.state.limit + '&status=' + this.state.status;
            try {
                const { data: { items } } = await axios.get('/tasks' + req);
                this.setState({
                    tasks: items,
                    loading: false
                });
            } catch (err) {
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div className='home'>
                <div className='home_filter'>
                    <p className='home_filter_label'>Limit number of tasks:</p>
                    <Dropdown name='limit'
                        onChange={this.getLimitedNumberOfTasks}
                        options={['ALL', '1', '5', '10', '25']} />
                </div>

                <div className='home_filter'>
                    <p className='home_filter_label'>FIlter tasks by status:</p>
                    <Dropdown name='status'
                        onChange={this.getFilteredByStatus}
                        options={['ALL', 'COMPLETED', 'DRAFT', 'QUEUED']} />
                </div>

                {this.state.loading && <p>Loading...</p>}
                {!this.state.loading && <TasksList tasks={this.state.tasks} />}
            </div >
        );
    }
}

export default Home;