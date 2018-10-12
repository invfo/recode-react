let e = (
  <div className="todoapp">
      <h1>todos</h1>
      <ul>
        {['Préparer la formation', 'Prendre un café'].map(task => <li key={task}>{task}</li>)}
      </ul>
      <input
        type='text'
        onChange={() => {}}
      />
      <button onClick={() => {}}>Add</button>
  </div>
);
