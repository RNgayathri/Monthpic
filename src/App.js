import React from 'react';
import './App.css';
import MonthPicker from "./MonthPicker/MonthPicker";

function App() {
  return (
    <div className="App">
    <MonthPicker
     name="MonthPic"
     allowedYears={{ "after": new Date().getFullYear() - 2 }}
    />
    </div>
  );
}

export default App;
