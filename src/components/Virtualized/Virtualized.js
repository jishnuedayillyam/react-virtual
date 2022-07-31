import React, { useState } from 'react';
import './style.css';

const VirtualizedList = (props) => {
  const { numItems, itemHeight, renderItem, windowHeight, overScanCount } = props;
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overScanCount);
  const endIndex = Math.min(
    numItems - 1, // don't render past the end of the list
    Math.floor((scrollTop + windowHeight) / itemHeight) + overScanCount
  );

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(renderItem(i));
  }

  return (
    <div
      className="scroll"
      style={{ height: windowHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div className="inner" style={{ height: numItems * itemHeight }}>
        {items}
      </div>
    </div>
  );
};

export default VirtualizedList;
