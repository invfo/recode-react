const patch = (dom, element) => {
  const parent = dom.parentNode;
  parent.innerHTML = '';
  render(element, parent);
}

setTimeout(
  () => {patch(dom, ne)},
  3000
)
