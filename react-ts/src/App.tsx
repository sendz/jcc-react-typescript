import React from 'react';
import './App.css';
import { ToDoListForm } from './components/todo-list/form';
import { ToDoList } from './components/todo-list/List';

function App() {
  return (
    <>
      Simple ToDo List App
      <ToDoListForm/>
      <ToDoList/>
    </>
  );
}

export default App;
