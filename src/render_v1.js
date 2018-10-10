const render = (vdom, parent) => {
  if (typeof(vdom) === 'object') {

    let node;

    if (typeof(vdom.type) === 'string') {
      node = document.createElement(vdom.type);
    } else if (typeof(vdom.type) === 'function') {
      node = Component.render(vdom, parent);
    }

    // gestion des props
    Object.keys(vdom.props).map((prop) => {
      if (prop === 'className') {
        node.className = vdom.props[prop];
      } else if (prop === 'onClick') {
        node.addEventListener('click', vdom.props[prop]);
      } else if (prop === 'onChange') {
        node.addEventListener('change', vdom.props[prop]);
      }
    })

    // gestion des enfants
    for (const child of [].concat(...vdom.children)) {
      render(child, node);
    }

    // ajout au DOM
    parent.appendChild(node);
    return node;
  }
  else if (typeof(vdom) === 'string' || typeof vdom === 'number') {
    const textNode = document.createTextNode(vdom);
    parent.appendChild(textNode);
    return textNode;
  }
};
