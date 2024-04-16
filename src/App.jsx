import React from 'react';
import './App.css';
import Calendar from './Calendar';  // Make sure the path is correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Calendar App</h1>
        <Calendar />
      </header>
    </div>
  );
}

export default App;
