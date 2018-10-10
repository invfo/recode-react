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
