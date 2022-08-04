import React, { useState } from 'react';
import VirtualizedList from './components/VirtualizedList/VirtualizedList';
import './App.css';
import VirtualizedGrid from './components/VirtualizedGrid/VirtualizedGrid';
import Header from './components/Header/Header';
import ControlButtons from './components/ControlButtons/ControlButtons';

const numItems = 100;
const data = [...Array(numItems).keys()];

const App = () => {
  const [scaleState, setScaleState] = useState(1);
  console.log(scaleState);

  return (
    <div className="dashboard">
      <Header />
      <VirtualizedGrid scaleState={scaleState} numItems={numItems} data={data} />
      <VirtualizedList numItems={numItems} data={data} />
      <ControlButtons
        setScaleState={(isZoomIn) =>
          setScaleState((oldState) => oldState + (isZoomIn ? 1 / 10 : -1 / 10))
        }
      />
      <div className="footer">Footer</div>
    </div>
  );
};

export default App;
