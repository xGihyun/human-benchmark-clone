import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import GameLayout from '../Layout/GameLayout';

type Props = {
  num?: number,
  spot: {row: number, col: number},
}

type ListProps = {
  items: Props[];
}

const ChimpTest = () => {

  // Generate random spot  
  const randomSpot = () => {  
    const row = Math.trunc(Math.random() * 8) + 1;
    const col = Math.trunc(Math.random() * 10) + 1;
    
    return { row, col };
  }  

  // Check if spot is occupied
  const checkOccupiedSpot = (items: Props[], spot: { row: number, col: number }) => {
    let checkSpot = items.find((item) => JSON.stringify(item.spot) === JSON.stringify(spot));

    while (checkSpot !== undefined) {
      // Generate new random spot
      const row = randomSpot().row;
      const col = randomSpot().col;
      spot = { row, col };

      // Check if the new spot is occupied
      checkSpot = items.find((item) => JSON.stringify(item.spot) === JSON.stringify(spot));
    }

    return spot;
  }

  // Spots of the initial squares
  const initialSpots = () => {
    const row = randomSpot().row;
    const col = randomSpot().col;
    const spot = { row, col };
    const spotProp: Props = { spot };
    
    return spotProp;
  };

  const [items, setItems] = useState<Props[]>([]);

  useEffect(() => {
    const newInitialItems: Props[] = [];
    for (let i = 0; i < 4; i++) {
      const row = randomSpot().row;
      const col = randomSpot().col;
      const spot = { row, col };
      const index = i + 1;
      
      const newInitialItem = {
        num: index,
        spot: checkOccupiedSpot(newInitialItems, spot),
      };
      newInitialItems.push(newInitialItem);
    }
    setItems([...items, ...newInitialItems]);
  }, []);

  // The square element you click on
  const Square: React.FC<Props> = React.memo((props) => {
    return (
      <div className='chimp-square'
        onClick={() => { handleAddItem() }} 
        style={{ gridRow: props.spot.row, gridColumn: props.spot.col }}
      >
        {props.num}
      </div>
    )
  });

  // Add squares
  const handleAddItem = useCallback(() => {
    const row = randomSpot().row;
    const col = randomSpot().col;
    const spot = { row, col };
    const index = items.length + 1;
    
    const newItem = {
      num: index,
      spot: checkOccupiedSpot([...items], spot),
    };

    setItems([...items, newItem]);
  }, [items]);

  // List of squares
  const MyList: React.FC<ListProps> = ({ items }) => {
    const update = useRef(true);

    useEffect(() => {
      update.current = true;
    
      return () => {
        update.current = false;
      }
    }, [items]);

    const memoizedList = useMemo(
      () =>
        items.map((item, index) => (
          <Square key={index} {...item} />
        )),
      [items]
    );

    return (
      <>
        {memoizedList}
      </>
    )
  }

  return (
    <GameLayout>
      <div className='grid gap-2 grid-cols-10-90px grid-rows-8-90px'>
        <MyList items={items} />
      </div>
    </GameLayout>
  )
}

export default ChimpTest