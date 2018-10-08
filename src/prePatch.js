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


// const dom = render(element, document.getElementById('root'));

// setTimeout(
//   () => {patch(dom, newElement);},
//   3000,
// )
