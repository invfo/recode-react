import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tasks: ['Prepare my talk', 'Get enough sleep'],
        newTask: ''
    };
  }

  onChange = (event) => {this.setState({newTask: event.target.value})}

  onSubmit = () => {
    this.setState({tasks: this.state.tasks.concat([this.state.newTask])});
    this.setState({newTask: ''});
  }

  render() {
    return (
      <div className="App">
          <h1>todos</h1>
          <ul>
            {this.state.tasks.map(task => <li>{task}</li>)}
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
