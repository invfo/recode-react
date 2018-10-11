import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tasks: [],
        newTask: ''
    };
  }

  onChange = (event) => {
    this.setState({tasks: this.state.tasks, newTask: event.target.value})
  }

  onSubmit = () => {
    this.setState({
      tasks: this.state.tasks.concat([this.state.newTask]),
      newTask: ''
    });
  }

  render() {
    return (
      <div className="todoapp">
          <h1>todos</h1>
          <ul>
            {this.state.tasks.map(task => <li key={task}>{task}</li>)}
          </ul>
          <input
            type='text'
            onChange={this.onChange}
            value={this.state.newTask}
          />
          <button onClick={this.onSubmit}>Add</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
