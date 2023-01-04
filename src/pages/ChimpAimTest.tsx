// import React, { useEffect, useMemo, useRef } from 'react';
import GameLayout from '../layout/GameLayout';

// type Props = {
//   num?: number,
//   spot: {row: number, col: number},
// }

// type ListProps = {
//   items: Props[];
// }

// // Generate random spot  
// function randomSpot(){
//   const row = Math.trunc(Math.random() * 8) + 1;
//   const col = Math.trunc(Math.random() * 10) + 1;
  
//   return { row, col };
// }

// function checkOccupiedSpot(items: Props[], spot: { row: number, col: number }){
//   let checkSpot = items.find((item) => JSON.stringify(item.spot) === JSON.stringify(spot));

//   while (checkSpot !== undefined) {
//     // Generate new random spot
//     const row = randomSpot().row;
//     const col = randomSpot().col;
//     spot = { row, col };

//     // Check if the new spot is occupied
//     checkSpot = items.find((item) => JSON.stringify(item.spot) === JSON.stringify(spot));
//   }

//   return spot;
// }

const ChimpAimTest = () => {

  // The square element you click on
  // const Square: React.FC<Props> = React.memo((props) => {
  //   return (
  //     <div className={hidden ? 'bg-white chimp-square' : 'bg-black chimp-square'}
  //       onClick={handleClick}
  //       style={{ gridRow: props.spot.row, gridColumn: props.spot.col }}
  //       data-num={props.num}
  //     >
  //       {hidden ? null : props.num}
  //     </div>
  //   )
  // });

  // The square element you click on
  // const Square: React.FC<Props> = React.memo((props) => {
  //   return (
  //     <div className={hidden ? 'bg-white chimp-square' : 'bg-black chimp-square'}
  //       onClick={handleClick}
  //       style={{ gridRow: props.spot.row, gridColumn: props.spot.col }}
  //       data-num={props.num}
  //     >
  //       {hidden ? null : props.num}
  //     </div>
  //   )
  // });

  // // Memoized list of squares
  // const MyList: React.FC<ListProps> = ({ items }) => {
  //   const update = useRef(true);

  //   useEffect(() => {
  //     update.current = true;
    
  //     return () => {
  //       update.current = false;
  //     }
  //   }, [items]);

  //   const memoizedList = useMemo(
  //     () =>
  //       items.map((item, index) => (
  //         <Square key={index} {...item} />
  //       )),
  //     [items]
  //   );

  //   return (
  //     <>
  //       {memoizedList}
  //     </>
  //   )
  // }

  return (
    <GameLayout>
      WIP
    </GameLayout>
  )
}

export default ChimpAimTest