import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState<any[]>()
  const [message, setMessage] = useState<string>()
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:1234/todo')
      const data = await response.json()
      console.log(data.data)
      setTodos(data.data)
    })()
  }, [])

  navigator.serviceWorker.onmessage = (event) => {
    console.log("MESSAGE FROM SERVICE WORKER", event.data)
    if (event.data.type === "NEW_TODO") {
      const newTodos = [
        ...todos!,
        event.data.payload
      ]
      setTodos(newTodos)
      return setMessage(`New ${event.data.type} with ${event.data.payload.title} message`)
    }
    setMessage(`New ${event.data.type} with ${event.data.payload} message`)
  }

  return (
    <div>
      <header>
        {message && (
          <p>{message}</p>
        )}
      </header>
      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
