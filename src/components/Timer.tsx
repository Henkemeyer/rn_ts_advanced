import { useEffect, useRef, useState } from 'react';
import Container from './Container.tsx';
import { Timer as TimerProps, useTimersContext } from '../store/timers-context.tsx';

export default function Timer({ name, duration}: TimerProps) {
  const timerRef = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration*1000);
  const { isRunning } = useTimersContext();

  if(remainingTime <= 0 && timerRef.current) {
    clearInterval(timerRef.current);
  }
  
  useEffect(() => {
    let timer: number
    if (isRunning) {
      timer = window.setInterval(function() {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            return prevTime
          }
          return prevTime - 50
        })
      }, 50);
      
      timerRef.current = timer;
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    return () => clearInterval(timer);
  }, [isRunning])
  
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{ name }</h2>
      <p><progress max={duration*1000} value={remainingTime} /></p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}