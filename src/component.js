class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  static render(vdom, parent) {
    const instance = new (vdom.type)(vdom.props); // == new App(props)

    const element = instance.render() // == element <div><h1>todos</h1>...</div>
    instance.dom = render(element, parent); // on mémorise le DOM rendu

    instance.componentDidMount();
    return instance.dom;
  }

  setState(nextState) {
    if (this.shouldComponentUpdate(this.props, nextState)) {
      const prevState = this.state;
      this.state = nextState;

      patch(this.dom, this.render());

      this.componentDidUpdate(this.props, prevState);
    } else {
      this.state = nextState;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  componentDidMount() {}

  componentDidUpdate() {}
}
