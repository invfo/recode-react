const patch = (dom, element) => {
  if ((typeof element  === 'string' || typeof element === 'number') && dom instanceof Text) {
    if (dom.textContent !== element) {
      dom.textContent = element;
    }
    return dom;
  }
  else if (typeof(element) === 'object' && element.type.toUpperCase() === dom.nodeName) {

    // update props
    // used for updating "input" field value
    for (const attr of dom.attributes) {
      dom.removeAttribute(attr.name);
    }
    addProps(dom, element.props);

    // update children
    let pool = {};

    dom.childNodes.forEach((child, index) => {
      pool[index] = child;
    });

    Array().concat(...element.children).forEach((child, index) => {
      if (pool[index]) {
        const newChild = patch(pool[index], child);
        if (newChild !== pool[index]) {
          dom.appendChild(newChild);
        }
      } else {
        render(child, dom)
      }
    });

    return dom;
  }
};
