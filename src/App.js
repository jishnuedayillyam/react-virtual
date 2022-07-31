import React from 'react';
import VirtualizedList from './components/Virtualized/Virtualized';
import './App.css';

const numItems = 100;
const itemHeight = 20;
const data = [...Array(numItems).keys()];

const App = () => {
  return (
    <div>
      <VirtualizedList
        numItems={100}
        itemHeight={itemHeight}
        windowHeight={250}
        overScanCount={10}
        renderItem={(index) => (
          <div
            className="list-item"
            key={index}
            style={{
              top: index * itemHeight,
              height: itemHeight,
            }}
          >
            <div>{`row ${data[index] + 1}`}</div>
          </div>
        )}
      />
    </div>
  );
};

export default App;
