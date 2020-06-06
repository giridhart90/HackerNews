import React from 'react';
import './App.css';
import HackerTable from './components/HackerTable';
import Chart from './components/Chart';

function App() {
  return (
    <div className="hackersApp">
      <HackerTable />
      <Chart />
    </div>
  );
}

export default App;
