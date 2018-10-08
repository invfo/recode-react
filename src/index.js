import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0
    };
  }

  onClick = () => {
    this.setState({
        count: this.state.count + 1
    });
  }

  render() {
    return (
      <div className="App">
          <h1>Spectators</h1>
          <div>{this.state.count}</div>
          <button onClick={this.onClick}>Add a spectator</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
