// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.css';


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         count: 0
//     };
//   }

//   onClick = () => {
//     this.setState({
//         count: this.state.count + 1
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//           <h1>Spectators</h1>
//           <div>{this.state.count}</div>
//           <button onClick={this.onClick}>Add a spectator</button>
//       </div>
//     );
//   }
// }

/** @jsx createElement */
const createElement = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
};

const render = (vdom, parent) => {
  if (typeof(vdom) === 'object') {

    let node;
    if (typeof vdom.type === 'string') {
      node = document.createElement(vdom.type);
    } else if (typeof vdom.type === 'function') {
      node = Component.render(vdom, parent)
    }

    Object.keys(vdom.props).map((prop) => {
      if (prop === 'className') {
        node.className = vdom.props[prop];
      } else if (prop === 'onClick') {
        node.addEventListener('click', vdom.props[prop]);
      }
    })

    vdom.children.map((child) => {
      render(child, node);
    })

    parent.appendChild(node);
    return node;
  }
  else if (typeof(vdom) === 'string' || typeof vdom === 'number') {
    const textNode = document.createTextNode(vdom);
    parent.appendChild(textNode);
    return textNode;
  }
};

const patch = (dom, vdom) => {
  if ((typeof vdom  === 'string' || typeof vdom === 'number') && dom instanceof Text) {
    if (dom.textContent !== vdom) {
      const newDom = render(vdom, dom.parentNode);
      dom.parentNode.replaceChild(
        newDom,
        dom,
      );
      return newDom;
    }
    return dom;
  }
  else if (typeof(vdom) === 'object' && vdom.type.toUpperCase() === dom.nodeName) {
    let pool = {};

    dom.childNodes.forEach((child, index) => {
      pool[index] = child;
    });

    vdom.children.forEach((child, index) => {
      if (pool[index]) {
        const newChild = patch(pool[index], child);
        if (newChild !== pool[index]) {
          dom.appendChild(newChild);
        }
      }
    });

    return dom;
  }
  else {
    dom.parentNode.replaceChild(
      render(vdom, dom.parentNode),
      dom
    );
  }
};

const element = (
      <div className="App">
          <h1>Spectators</h1>
          <div>42</div>
          <button onClick={() => {console.log('clicked')}}>Add a spectator</button>
      </div>
);

const newElement = (
  <div className="App">
      <h1>Spectators</h1>
      <div>43</div>
      <button onClick={() => {console.log('clicked')}}>Add a spectator</button>
  </div>
);


// const dom = render(element, document.getElementById('root'));

// setTimeout(
//   () => {patch(dom, newElement);},
//   3000,
// )

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

const app = <App />
render(app, document.getElementById('root'));

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
