import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [age, setAge] = useState(0)
  const [message, setMessage] = useState<string>()
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:1234/todo')
      console.log("RESPONSE", response.json())
    })()
  })

  navigator.serviceWorker.onmessage = (event) => {
    console.log("MESSAGE FROM SERVICE WORKER", event.data)
    setMessage(`New ${event.data.type} with ${event.data.payload} message`)
  }

  return (
    <div className="App">
      <header className="App-header">
        {message && (
          <p>{message}</p>
        )}
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
