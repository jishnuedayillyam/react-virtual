import React from 'react';

const ListItem = ({ index, itemHeight, itemData }) => {
  return (
    <div
      className="list-item"
      style={{
        top: index * itemHeight,
        height: itemHeight,
      }}
    >
      <div>{`row ${itemData + 1}`}</div>
    </div>
  );
};

export default ListItem;
