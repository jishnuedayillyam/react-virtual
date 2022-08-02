import React from 'react';

const GridItem = ({ index, itemHeight, itemData, columnCount }) => {
  return (
    <div
      className="grid-item"
      style={{
        top: Math.floor(index / columnCount) * itemHeight,
        height: itemHeight,
        width: `${100 / columnCount}%`,
        left: `${(index % columnCount) * (100 / columnCount)}%`,
        backgroundColor: 'yellow',
      }}
    >
      <div>{`row ${itemData + 1}`}</div>
    </div>
  );
};

export default GridItem;
