import { RefObject, useRef, useState } from 'react';
import GameLayout from '../layout/GameLayout';
import { FaCrosshairs } from 'react-icons/fa';
import Result from '../components/Result';

const AimTrainer = () => {

  // Target
  const TOTAL_TARGETS = 20;
  const TARGET_SIZE = 100; // pixels

  // Reference to the area
  const areaRef: RefObject<HTMLDivElement> = useRef(null);

  // Could be improved with useReduce, but use useState for now
  // Position of the target
  const [x, setX] = useState<number | string>('50%');
  const [y, setY] = useState<number | string>('50%');

  // Timer in milliseconds
  const [startTime, setStartTime] = useState(performance.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  // Array of elapsed time
  const [time, setTime] = useState<number[]>([]);
  
  const Target = () => <FaCrosshairs size={TARGET_SIZE} onClick={handleClick}
  className='cursor-pointer absolute text-red-500' style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }} />
  
  const getCurrentTime = () => {
    setStartTime(performance.now());
  }

  const getElapsedTime = () => {
    setElapsedTime(performance.now() - startTime);
  }

  const getAverageTime = () => {
    const sum = time.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / time.length);
  }
  
  const handleClick = () => {
    const area = areaRef.current;

    // Makes sure that area has a value
    if(!area) return;
  
    const width = area.offsetWidth;
    const height = area.offsetHeight;
    const newX = Math.random() * (width - 64);
    const newY = Math.random() * (height - 64);

    setX(newX);
    setY(newY);
    getCurrentTime();
    getElapsedTime();

    if(elapsedTime > 0){
      setTime([...time, elapsedTime]);
    }
  }

  // Reset states
  const restart = () => {
    setTime([]);
    setStartTime(performance.now());
    setElapsedTime(0);
    setX('50%');
    setY('50%');
  }

  let remainingTargets = TOTAL_TARGETS - time.length;

  return (
    <GameLayout refProp={areaRef}>
      <h2 className='absolute top-0'>Remaining: {remainingTargets}</h2>
      <Target />
      {remainingTargets === 0 ?
        <Result restart={restart}>
          <h2>Average time per target:</h2>
          {getAverageTime()} ms
        </Result>
        : null}
    </GameLayout>
  )
}

export default AimTrainer