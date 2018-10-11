const render = (element, parent) => {
  if (typeof(element) === 'string' || typeof element === 'number') {
    const textNode = document.createTextNode(element);
    parent.appendChild(textNode);
    return textNode;
  }
  else if (typeof(element) === 'object') {
    
    let node;
    if (typeof(element.type) === 'string') {
      node = document.createElement(element.type);
    } else if (typeof(element.type) === 'function') {
      node = Component.render(element, parent)
    }

    // gestion des props
    addProps(node, element.props)

    // gestion des enfants
    for (const child of [].concat(...element.children)) {
      render(child, node);
    }

    // ajout au DOM
    parent.appendChild(node);
    return node;
  }
};
