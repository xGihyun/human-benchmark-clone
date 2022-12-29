import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Result from '../components/Result';
import GameLayout from '../layout/GameLayout';

type Props = {
  num?: number,
  spot: {row: number, col: number},
}

type ListProps = {
  items: Props[];
}

const ChimpTest = () => {

  // Could be improved with useReduce, but use useState for now
  const [hidden, setHidden] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [round, setRound] = useState(1);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    let index = 0;
    const currentItemValue = items[index].num;
    const clickedItemValue = parseInt((e.currentTarget.getAttribute("data-num")) as string);

    setHidden(true);

    if(currentItemValue !== clickedItemValue){
      setGameOver(true);
    }
    setItems(items.slice(1))
    index++;
    
    // If array is empty === you didn't fail, then move to next round
    if(items.length === 1){
      setRound(round + 1)
      setHidden(false);
    }
  }

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

  // Array of the squares
  const [items, setItems] = useState<Props[]>([]);

  // Initialize squares
  // If gameOver state changes, run this function (reinitializes squares after restart)
  // If round # changes, run this function (increments the number of squares after each round)
  useEffect(() => {
    const newInitialItems: Props[] = [];
    for (let i = 0; i < round + 3; i++) {
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
  }, [gameOver || round]);

  // Add squares
  // const handleAddItem = useCallback(() => {
  //   const row = randomSpot().row;
  //   const col = randomSpot().col;
  //   const spot = { row, col };
  //   const index = items.length + 1;
    
  //   const newItem = {
  //     num: index,
  //     spot: checkOccupiedSpot([...items], spot),
  //   };

  //   setItems([...items, newItem]);
  // }, [items]);

  // The square element you click on
  const Square: React.FC<Props> = React.memo((props) => {
    return (
      <div className={hidden ? 'bg-white chimp-square' : 'bg-black chimp-square'}
        onClick={handleClick}
        style={{ gridRow: props.spot.row, gridColumn: props.spot.col }}
        data-num={props.num}
      >
        {hidden ? null : props.num}
      </div>
    )
  });

  // Memoized list of squares
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

  // Reset everything
  const restart = () => {
    setHidden(false);
    setGameOver(false);
    setRound(1);
    setItems([]);
  }

  return (
    <GameLayout>
      {gameOver ?
        <Result restart={restart}>
          <h2>Numbers: {round + 3}</h2>
        </Result>
        :
        <div className='grid gap-2 grid-cols-10-90px grid-rows-8-90px'>
          <MyList items={items} />
        </div>}
    </GameLayout>
  )
}

export default ChimpTest