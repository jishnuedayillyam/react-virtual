import React from 'react';
import VirtualizedList from './components/Virtualized/Virtualized';
import './App.css';

const numItems = 100;
const data = [...Array(numItems).keys()];

const App = () => {
  return (
    <div>
      <VirtualizedList numItems={100} windowHeight={250} data={data} />
    </div>
  );
};

export default App;
