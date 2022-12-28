import { useRef, useState } from 'react';
import GameLayout from '../Layout/GameLayout';
import { FaCrosshairs } from 'react-icons/fa';
import Result from '../components/Result';

const AimTrainer = () => {

  const TOTAL_TARGETS = 20;
  
  // Target
  const targetSize = 100; // pixels
  const areaRef = useRef(null);
  const [x, setX] = useState<number | string>('50%');
  const [y, setY] = useState<number | string>('50%');

  // Timer in milliseconds
  const [startTime, setStartTime] = useState(performance.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  // Array of elapsed time
  const [time, setTime] = useState<number[]>([]);
  
  const Target = () => <FaCrosshairs size={targetSize} onClick={handleClick}
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

    // area could possibly be null, but ignore the typescript error since it wouldn't be null after anyway
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

  let remainingTargets = TOTAL_TARGETS - time.length

  return (
    <GameLayout refProp={areaRef}>
      <Target />
      {remainingTargets === 0 ? <Result average={getAverageTime()} restart={restart} /> : null}
      Remaining: {remainingTargets}
    </GameLayout>
  )
}

export default AimTrainer