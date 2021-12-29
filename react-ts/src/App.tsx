import React from 'react';
import './App.css';
import { ToDoListForm } from './components/todo-list/form';
import { ToDoList } from './components/todo-list/List';
import { ToDoListProvider } from './providers/ToDoList.provider';

function App() {
  return (
    <ToDoListProvider>
      Simple ToDo List App
      <ToDoListForm/>
      <ToDoList/>
    </ToDoListProvider>
  );
}

export default App;
