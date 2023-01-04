import { RefObject, useReducer, useRef, useState } from 'react';
import GameLayout from '../layout/GameLayout';
import { FaCrosshairs } from 'react-icons/fa';
import Result from '../components/Result';

type TimeAction = {
  type: string,
  payload?: any
};

// Target
const TOTAL_TARGETS = 20;
const TARGET_SIZE = 100; // pixels

const MAX = 80;
const MIN = 20;

const INITIAL_TIME_STATE = {
  current: performance.now(),
  elapsed: 0,
  arr: [] as number[],
  start: false
};

const TIME_ACTIONS = {
  CURRENT_TIME: "CURRENT_TIME",
  ELAPSED_TIME: "ELAPSED_TIME",
  STORE_ELAPSED: "STORE_ELAPSED",
  START_TIME: "START_TIME",
  RESET: "RESET"
};

// Reducer function
// Am I doing this correctly?
function timeReducer(state: typeof INITIAL_TIME_STATE, action: TimeAction){

  switch(action.type){
    case TIME_ACTIONS.CURRENT_TIME:
      return {
        ...state,
        current: performance.now()
      };
    case TIME_ACTIONS.ELAPSED_TIME:
      return {
        ...state,
        elapsed: performance.now() - action.payload
      };
    case TIME_ACTIONS.STORE_ELAPSED:
      return {
        ...state,
        arr: [...state.arr, action.payload] as number[]
      };
    case TIME_ACTIONS.START_TIME:
      return {
        ...state,
        start: action.payload
      };
    case TIME_ACTIONS.RESET:
      return INITIAL_TIME_STATE;
    default:
      return state;
  }
}

const AimTrainer = () => {

  // State for the target's position
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    xPos: 50,
    yPos: 50,
  });
  
  // State for time
  const [timeState, timeDispatcher] = useReducer(timeReducer, INITIAL_TIME_STATE);
  
  // State for targets
  const [targets, setTargets] = useState(TOTAL_TARGETS);
  
  // Reference to the area div
  const areaRef: RefObject<HTMLDivElement> = useRef(null);

  function handleClick(){
    const area = areaRef.current;

    // Makes sure that area has a value (TypeScript stuff)
    if(!area) return;
    
    // Width and height of the div (screen)
    const width = area.offsetWidth;
    const height = area.offsetHeight;

    // Randomize position
    setPos({

      // Subtract 100 just incase to avoid going outside the screen
      x: Math.random() * (width - 100),
      y: Math.random() * (height - 100),

      // Position out of 100%
      // Has a range between MIN and MAX to set a limit || Don't go too close to the edge of the screen
      xPos: Math.min(Math.max(((pos.x / width) * 100), MIN), MAX),
      yPos: Math.min(Math.max(((pos.y / height) * 100), MIN), MAX)
    });

    // Get the current time
    timeDispatcher({ type: TIME_ACTIONS.CURRENT_TIME });

    // Start appending the elapsed time only after the user starts clicking
    if(timeState.start){

      // Start getting elapsed time and storing it in the array
      timeDispatcher({ type: TIME_ACTIONS.ELAPSED_TIME, payload: timeState.current });
      timeDispatcher({ type: TIME_ACTIONS.STORE_ELAPSED, payload: timeState.elapsed });
      setTargets(targets - 1);
    }
    else{
      timeDispatcher({ type: TIME_ACTIONS.START_TIME, payload: true });
    }
  }

  function getAverageTime(){
    const sum = timeState.arr.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / timeState.arr.length);
  }

  // Reset everything
  const restart = () => {
    timeDispatcher({ type: TIME_ACTIONS.RESET })
    setPos({
      x: 0,
      y: 0,
      xPos: 50,
      yPos: 50,
    });
    setTargets(TOTAL_TARGETS);
  }
  
  // The target itself
  const Target = () => <FaCrosshairs size={TARGET_SIZE} onClick={handleClick}
    className='cursor-pointer absolute text-red-500' 
    style={{ left: `${pos.xPos}%`, top: `${pos.yPos}%`, transform: 'translate(-50%, -50%)' }} />

  return (
    <GameLayout refProp={areaRef}>
      <h2 className='absolute top-0 pointer-events-none'>Remaining: {targets}</h2>
      <Target />
      {targets === 0 ?
        <Result restart={restart}>
          <h2>Average time per target:</h2>
          {getAverageTime()} ms
        </Result>
        : null}
    </GameLayout>
  )
}

export default AimTrainer