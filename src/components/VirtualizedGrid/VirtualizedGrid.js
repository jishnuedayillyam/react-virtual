import React, { useState } from 'react';
import GridItem from '../GridItem/GridItem';

const GRID_ROW_HEIGHT = 100;
const GRID_OVERSCAN_COUNT = 1;
const GRID_COLUMN_COUNT = 4;

const VirtualizedGrid = ({ numItems, windowHeight, data }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startRowIndex = Math.max(0, Math.floor(scrollTop / GRID_ROW_HEIGHT) - GRID_OVERSCAN_COUNT);
  const endRowIndex = Math.min(
    numItems / GRID_COLUMN_COUNT - 1, // don't render past the end of the list
    Math.floor((scrollTop + windowHeight) / GRID_ROW_HEIGHT) + GRID_OVERSCAN_COUNT
  );

  const items = [];
  for (let i = startRowIndex; i <= endRowIndex; i++) {
    for (let j = 0; j < GRID_COLUMN_COUNT; j++) {
      items.push(
        <GridItem
          key={i * GRID_COLUMN_COUNT + j}
          itemHeight={GRID_ROW_HEIGHT}
          index={i * GRID_COLUMN_COUNT + j}
          itemData={data[i * GRID_COLUMN_COUNT + j]}
          columnCount={GRID_COLUMN_COUNT}
        />
      );
    }
  }

  return (
    <div
      className="scroll"
      style={{ height: windowHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div className="inner" style={{ height: (numItems / GRID_COLUMN_COUNT) * GRID_ROW_HEIGHT }}>
        {/* {[...Array(endRowIndex - startRowIndex + 1)].map((_x, index) => {
          return (
            <ListItem
              key={index}
              itemHeight={GRID_ITEM_HEIGHT}
              index={index + startRowIndex}
              itemData={data[index + startRowIndex]}
            />
          );
        })} */}
        {items}
      </div>
    </div>
  );
};

export default VirtualizedGrid;
