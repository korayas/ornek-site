import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 });

    const chars1 = title1Ref.current.querySelectorAll(`.${styles.char}`);
    const chars2 = title2Ref.current.querySelectorAll(`.${styles.char}`);

    tl.fromTo(
      [...chars1, ...chars2],
      { yPercent: 100, rotate: 10, opacity: 0 },
      { 
        yPercent: 0, 
        rotate: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.05, 
        ease: 'power4.out' 
      }
    ).fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    gsap.to([title1Ref.current, title2Ref.current, subRef.current], {
      yPercent: -50,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, []);

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className={styles.charWrapper}>
        {char === ' ' ? '\u00A0' : <span className={styles.char}>{char}</span>}
      </span>
    ));
  };

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.titleWrapper} ref={title1Ref}>
          <h1 className="heading-huge">{splitText("Demlemede")}</h1>
        </div>
        <div className={styles.titleWrapper} ref={title2Ref}>
          <h1 className="heading-huge text-accent">{splitText("Mükemmellik.")}</h1>
        </div>
        <p className={styles.subtitle} ref={subRef}>
          Hassasiyetle kavrulmuş el yapımı kahve. Mükemmel bir fincanın lüksünü deneyimleyin.
        </p>
      </div>
    </section>
  );
}
