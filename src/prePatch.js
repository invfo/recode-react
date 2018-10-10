const foo = (
    <div className="App">
        <h1>todos</h1>
        <ul>
          {['Prepare the talk', 'Get enough sleep'].map(task => <li>{task}</li>)}
        </ul>
        <input
          type='text'
        />
        <button>Add</button>
    </div>
  );
  
  const newFoo = (
    <div className="App">
        <h1>todos</h1>
        <ul>
          {['Prepare the talk', 'Get enough sleep', 'Bring croissants'].map(task => <li>{task}</li>)}
        </ul>
        <input
          type='text'
        />
        <button>Add</button>
    </div>
  );
  
  const dom = render(foo, document.getElementById('root'))
  
  setTimeout(
    () => {patch(dom, newFoo)},
    1500
  )
