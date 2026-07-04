import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // Check if device has touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Render loop for smooth trailing effect
    const render = () => {
      // Fast follow for main dot
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;
      
      // Slow follow for outer ring
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(follower, { x: followerX, y: followerY });

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Hover logic
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`${styles.cursor} ${isHovering ? styles.hover : ''}`} 
      />
      <div 
        ref={followerRef} 
        className={`${styles.cursorFollower} ${isHovering ? styles.hover : ''}`} 
      />
    </>
  );
}
