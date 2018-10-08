const render = (vdom, parent) => {
  if (typeof(vdom) === 'object') {

    let node = document.createElement(vdom.type);

    // gestion des props
    Object.keys(vdom.props).map((prop) => {
      if (prop === 'className') {
        node.className = vdom.props[prop];
      } else if (prop === 'onClick') {
        node.addEventListener('click', vdom.props[prop]);
      }
    })

    // gestion des enfants
    vdom.children.map((child) => {
      render(child, node);
    })

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
