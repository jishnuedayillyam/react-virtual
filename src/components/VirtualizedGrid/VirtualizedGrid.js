import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import GridItem from '../GridItem/GridItem';

const GRID_ROW_HEIGHT = 200;
const GRID_OVERSCAN_COUNT = 5;
const MINIMUM_CARD_WIDTH = 180;

const VirtualizedGrid = ({ scaleState, numItems, data }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [numberOfColumns, setNumberOfColumns] = useState(3);
  const [boundaryIndices, setBoundaryIndices] = useState({ startRowIndex: 0, endRowIndex: 0 });

  const gridViewRef = useRef(null);

  const numberOfCards =
    numItems % numberOfColumns
      ? numItems + numberOfColumns - (numItems % numberOfColumns)
      : numItems;

  function setBoundaryIndicesValues() {
    if (gridViewRef.current) {
      setBoundaryIndices({
        startRowIndex: Math.max(0, Math.floor(scrollTop / GRID_ROW_HEIGHT) - GRID_OVERSCAN_COUNT),
        endRowIndex: Math.min(
          Math.max(0, numberOfCards / numberOfColumns - 1), // don't render past the end of the list
          Math.floor(
            (scrollTop + gridViewRef.current.getBoundingClientRect().height) / GRID_ROW_HEIGHT
          ) + GRID_OVERSCAN_COUNT
        ),
      });
      // for (let i = startRowIndex; i <= endRowIndex; i++) {
      //   for (let j = 0; j < numberOfColumns; j++) {
      //     items.push(
      //       <GridItem
      //         key={i * numberOfColumns + j}
      //         itemHeight={GRID_ROW_HEIGHT}
      //         index={i * numberOfColumns + j}
      //         itemData={data[i * numberOfColumns + j]}
      //         columnCount={numberOfColumns}
      //       />
      //     );
      //   }
      // }
    }
  }

  function setNumberOfColumnsOnResize() {
    if (gridViewRef.current) {
      setNumberOfColumns(
        Math.max(
          Math.floor(
            gridViewRef.current.getBoundingClientRect().width / scaleState / MINIMUM_CARD_WIDTH
          ),
          1
        )
      );
    }
  }

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
    setBoundaryIndicesValues();
  };

  useLayoutEffect(() => {
    setNumberOfColumnsOnResize();
    setBoundaryIndicesValues();
  }, [scaleState]);

  useEffect(() => {
    window.addEventListener('resize', setNumberOfColumnsOnResize);

    return () => {
      window.removeEventListener('resize', setNumberOfColumnsOnResize);
    };
  }, []);

  return (
    <div
      ref={gridViewRef}
      className="scroll grid"
      style={{
        transform: `scale(${scaleState})`,
        transformOrigin: '0 0',
        width: `calc(${100 / scaleState}%)`,
        height: `${100 / scaleState}%`,
      }}
      onScroll={handleScroll}
    >
      <div
        className="inner"
        style={{
          height: (numberOfCards / numberOfColumns) * GRID_ROW_HEIGHT,
        }}
      >
        {[...Array(boundaryIndices.endRowIndex - boundaryIndices.startRowIndex + 1)].map(
          (_x, rowIndex) => {
            return [...Array(numberOfColumns)].map((_y, columnIndex) => {
              return (
                <GridItem
                  key={rowIndex * numberOfColumns + columnIndex}
                  index={(rowIndex + boundaryIndices.startRowIndex) * numberOfColumns + columnIndex}
                  itemHeight={GRID_ROW_HEIGHT}
                  itemData={
                    data[(rowIndex + boundaryIndices.startRowIndex) * numberOfColumns + columnIndex]
                  }
                  numberOfColumns={numberOfColumns}
                />
              );
            });
          }
        )}
      </div>
    </div>
  );
};

export default VirtualizedGrid;
