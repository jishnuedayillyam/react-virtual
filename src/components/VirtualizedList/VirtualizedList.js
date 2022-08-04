import React, { useLayoutEffect, useRef, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import './style.css';

const OVERSCAN_COUNT = 10;
const ITEM_HEIGHT = 40;

const VirtualizedList = ({ numItems, data }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [boundaryIndices, setBoundaryIndices] = useState({ startIndex: 0, endIndex: 0 });

  const listViewRef = useRef(null);

  function setBoundaryIndicesValues() {
    if (listViewRef.current) {
      setBoundaryIndices({
        startIndex: Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN_COUNT),
        endIndex: Math.min(
          numItems - 1, // don't render past the end of the list
          Math.floor(
            (scrollTop + listViewRef.current.getBoundingClientRect().height) / ITEM_HEIGHT
          ) + OVERSCAN_COUNT
        ),
      });
      // for (let i = startIndex; i <= endIndex; i++) {
      //   items.push(<ListItem key={i} itemHeight={ITEM_HEIGHT} index={i} itemData={data[i]} />);
      // }
    }
  }

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
    setBoundaryIndicesValues();
  };

  useLayoutEffect(() => {
    setBoundaryIndicesValues();
  }, []);

  return (
    <div ref={listViewRef} className="scroll list" onScroll={handleScroll}>
      <div className="inner" style={{ height: numItems * ITEM_HEIGHT }}>
        {[...Array(boundaryIndices.endIndex - boundaryIndices.startIndex + 1)].map((_x, index) => {
          return (
            <ListItem
              key={index}
              itemHeight={ITEM_HEIGHT}
              index={index + boundaryIndices.startIndex}
              itemData={data[index + boundaryIndices.startIndex]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
