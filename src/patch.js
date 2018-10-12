const patch = (oldElement, newElement) => {
  if (
      (typeof newElement  === 'string' || typeof newElement === 'number')
      && oldElement instanceof Text
    ) {
      if (oldElement.textContent !== newElement) {
        oldElement.textContent = newElement;
    }
    return oldElement;
  }
  else if (
    typeof(newElement) === 'object' &&
    newElement.type.toUpperCase() === oldElement.nodeName
    ) {

    // update props
    for (const attr of oldElement.attributes) {
      oldElement.removeAttribute(attr.name);
    }
    addProps(oldElement, newElement.props);

    // update children
    let pool = {};

    oldElement.childNodes.forEach((child, index) => {
      pool[index] = child;
    });

    Array().concat(...newElement.children).forEach((child, index) => {
      if (pool[index]) {
        const newChild = patch(pool[index], child);
        if (newChild !== pool[index]) {
          oldElement.appendChild(newChild);
        }
      } else {
        render(child, oldElement)
      }
    });

    return oldElement;
  }
};
