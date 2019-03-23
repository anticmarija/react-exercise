import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import axios from './config';
import Home from './components/home/Home';
import TaskDetails from './components/task-details/TaskDetails';

class App extends Component {

  state = {
    username: ''
  }

  async componentDidMount() {
    const { data: { username } } = await axios.get('/user');
    this.setState({
      username
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <header className="app_header">
            Welcome to App!
            <span className="app_header_username">{this.state.username}</span>
          </header>
          <Route path='/' exact component={Home} />
          <Route path='/tasks/:id' exact component={TaskDetails} />
        </div >
      </Router >
    );

  }
}

export default App;