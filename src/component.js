class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  static render(vdom, parent) {
    const instance = new (vdom.type)(vdom.props); // == new App(props)
    const element = instance.render() // == element <div><h1>todos</h1>...</div>
    instance.dom = render(element, parent); // on mémorise le DOM rendu
    return instance.dom;
  }

  setState(nextState) {
      this.state = nextState;
      patch(this.dom, this.render());
  }
}
