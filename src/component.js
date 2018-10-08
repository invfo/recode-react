class Component {
  constructor(props) {
    this.props = props;
    this.state = null;
  }

  static render(vdom, parent) {
    const instance = new (vdom.type)(vdom.props);
    instance.componentWillMount();
    const element = instance.render()
    instance.dom = render(element, parent);
    instance.dom.__reactInstance = instance;
    instance.componentDidMount();
    return instance.dom;
  }

  setState(nextState) {
    if (this.shouldComponentUpdate(this.props, nextState)) {
      const prevState = this.state;
      this.componentWillUpdate(this.props, nextState);
      this.state = nextState;
      Component.patch(this.dom, this.render());
      this.componentDidUpdate(this.props, prevState);
    } else {
      this.state = nextState;
    }
  }

  static patch(dom, vdom) {
    dom.__reactInstance.props = vdom.props;
    return patch(dom, dom.__reactInstance.render());
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUpdate() {}

  componentDidUpdate() {}

  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  onClick = () => {
    this.setState({count: this.state.count + 1})
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
