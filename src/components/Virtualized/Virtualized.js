import React, { useState } from 'react';
import ListItem from '../ListItem/ListItem';
import './style.css';

const OVERSCAN_COUNT = 10;
const ITEM_HEIGHT = 20;

const VirtualizedList = ({ numItems, windowHeight, data }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN_COUNT);
  const endIndex = Math.min(
    numItems - 1, // don't render past the end of the list
    Math.floor((scrollTop + windowHeight) / ITEM_HEIGHT) + OVERSCAN_COUNT
  );

  // const items = [];
  // for (let i = startIndex; i <= endIndex; i++) {
  //   items.push(<ListItem key={i} ITEM_HEIGHT={ITEM_HEIGHT} index={i} itemData={data[i]} />);
  // }

  return (
    <div
      className="scroll"
      style={{ height: windowHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div className="inner" style={{ height: numItems * ITEM_HEIGHT }}>
        {[...Array(endIndex - startIndex + 1)].map((_x, index) => {
          return (
            <ListItem
              key={index}
              itemHeight={ITEM_HEIGHT}
              index={index + startIndex}
              itemData={data[index + startIndex]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
