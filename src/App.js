import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import axios from './config';
import Home from './components/home/Home';
import TaskDetails from './components/task-details/TaskDetails';
import Modal from './components/modal/Modal';

class App extends Component {

  state = {
    username: '',
    modalOpened: false
  }

  async componentDidMount() {
    try {
      const { data: { username } } = await axios.get('/user');
      this.setState({
        username
      });
    } catch (err) {
      console.error(err);
    }
  }

  openModal = () => {
    this.setState({
      modalOpened: true
    });
  }

  closeModal = () => {
    this.setState({
      modalOpened: false
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
          <div className="app-layout">
            <div className="app-layout_open-modal">
              <button onClick={this.openModal} className="app-layout_open-modal_button">
                Create project
              </button>
            </div>
            {this.state.modalOpened && <Modal closeModal={this.closeModal} />}
            <Route path='/' exact component={Home} />
            <Route path='/tasks/:id' exact component={TaskDetails} />
          </div>
        </div >
      </Router >
    );

  }
}

export default App;