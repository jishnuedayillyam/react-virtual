import React from 'react';

const GridItem = ({ index, itemHeight, itemData, numberOfColumns }) => {
  return (
    <div
      className="grid-item"
      style={{
        top: Math.floor(index / numberOfColumns) * itemHeight,
        height: itemHeight,
        width: `${100 / numberOfColumns}%`,
        left: `${(index % numberOfColumns) * (100 / numberOfColumns)}%`,
      }}
    >
      {itemData === undefined || itemData === null ? (
        <div>Empty card</div>
      ) : (
        <div>{`row ${itemData + 1}`}</div>
      )}
    </div>
  );
};

export default GridItem;
