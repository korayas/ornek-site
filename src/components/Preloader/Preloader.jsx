import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete, isReady }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      if (currentProgress < 99) {
        currentProgress += Math.floor(Math.random() * 10) + 2;
        if (currentProgress > 99) currentProgress = 99;
      } else if (isReady) {
        currentProgress = 100;
      }

      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        
        const tl = gsap.timeline({
          onComplete: onComplete
        });
        
        tl.to(counterRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.in'
        })
        .to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.in'
        }, '-=0.6')
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut'
        }, '-=0.2');
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete, isReady]);

  return (
    <div className={styles.preloader} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.counterWrapper} ref={counterRef}>
          <span className={styles.counter}>{progress}</span>
          <span className={styles.percent}>%</span>
        </div>
        <p className={styles.text} ref={textRef}>AURELIA ROASTERS</p>
      </div>
    </div>
  );
}
