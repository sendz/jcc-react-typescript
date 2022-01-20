import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [age, setAge] = useState(0)
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:1234/todo')
      console.log("RESPONSE", response.json())
    })()
  })
  return (
    <div className="App">
      <input value={age} type="number" onChange={e => setAge(parseInt(e.target.value))}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
