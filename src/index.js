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
    const node = document.createElement(vdom.type);

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
  else if (typeof(vdom) === 'string') {
    const textNode = document.createTextNode(vdom);
    parent.appendChild(textNode);
    return textNode;
  }
};

const patch = (dom, vdom) => {
  if (typeof(vdom) === 'string' && dom instanceof Text) {
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


const dom = render(element, document.getElementById('root'));

setTimeout(
  () => {patch(dom, newElement);},
  3000,
)


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
