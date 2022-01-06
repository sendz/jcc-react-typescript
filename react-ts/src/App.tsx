import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import { ToDoListForm } from './components/todo-list/form';
import { ToDoList } from './components/todo-list/List';
import { ToDoListProvider } from './providers/ToDoList.provider';

function App() {
  return (
    <ToDoListProvider>
      <Container>
        <Row>
          <Col>
            <h1>Simple ToDo List App</h1>
            <ToDoListForm/>
            <ToDoList/>
        </Col>
        </Row>
      </Container>
    </ToDoListProvider>
  );
}

export default App;
