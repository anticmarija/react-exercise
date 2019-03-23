import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import TaskListItem from './components/tasks-list-item/TaskListItem';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' exact component={Home} />
          <Route path='/tasks/:id' exact component={TaskListItem} />
        </div >
      </Router>
    );

  }
}

export default App;