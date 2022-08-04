import React from 'react';

const ControlButtons = ({ setScaleState }) => {
  return (
    <div className="buttons">
      <button type="button" onClick={() => setScaleState(false)}>
        -
      </button>
      <button type="button" onClick={() => setScaleState(true)}>
        +
      </button>
    </div>
  );
};

export default ControlButtons;
