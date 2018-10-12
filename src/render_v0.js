const render = (element, parent) => {
  
  // element == 'Hello World'
  if (typeof(element) === 'string' || typeof element === 'number') {
    const textNode = document.createTextNode(element);
    parent.appendChild(textNode);
    return textNode;
  }

  // element == <div><h1>Hello World</h1></div>
  else if (typeof(element) === 'object') {

    let node = document.createElement(element.type);

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

const addProps = (node, props) => {
  Object.keys(props).map(prop => {
    if (prop === 'className') {
      node.className = props[prop]
    } else if (prop === 'value') {
      node.value = props[prop];
    } else if (prop === 'onClick') {
      node.addEventListener('click', props[prop]);
    } else if (prop === 'onChange') {
      node.addEventListener('change', props[prop]);
    }
  });
};
