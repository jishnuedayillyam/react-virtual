import React from 'react';
import VirtualizedList from './components/VirtualizedList/VirtualizedList';
import './App.css';
import VirtualizedGrid from './components/VirtualizedGrid/VirtualizedGrid';

const numItems = 100;
const data = [...Array(numItems).keys()];

const App = () => {
  return (
    <div>
      <VirtualizedList numItems={100} windowHeight={250} data={data} />
      <VirtualizedGrid numItems={100} windowHeight={250} data={data} />
    </div>
  );
};

export default App;
