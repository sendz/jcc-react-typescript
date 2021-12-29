import React from 'react';
import './App.css';
import {ContactCard} from './components/ContactCard';

const App = () => {
  return (
    <ContactCard name='Sendy' phone='088328' age={20}/>
  )
}

export default App