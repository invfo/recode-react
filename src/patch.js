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

    // update props
    // used for updating "input" field value
    for (const attr of dom.attributes) {
      dom.removeAttribute(attr.name);
    }

    Object.keys(vdom.props).map(prop => {
      if (prop === 'className') {
        dom.className = vdom.props[prop];
      } else if (prop === 'value') {
        dom.value = vdom.props[prop];
      } else if (prop === 'onClick') {
        dom.addEventListener('click', vdom.props[prop]);
      } else if (prop === 'onChange') {
        dom.addEventListener('change', vdom.props[prop]);
      }
    });

    // update children
    let pool = {};

    dom.childNodes.forEach((child, index) => {
      pool[index] = child;
    });

    Array().concat(...vdom.children).forEach((child, index) => {
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
  else {
    dom.parentNode.replaceChild(
      render(vdom, dom.parentNode),
      dom
    );
  }
};
