import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandStory.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const textRef = useRef(null);

  useEffect(() => {
    const lines = textRef.current.querySelectorAll(`.${styles.lineWrapper} > span`);

    gsap.fromTo(lines,
      { yPercent: 100, rotate: 5, opacity: 0 },
      {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section className={styles.brandStory} id="roastery">
      <div className={styles.container}>
        <div className={styles.label}>
          <span className="text-label">Kavurmahane</span>
        </div>
        
        <div className={styles.textContainer} ref={textRef}>
          <h2 className="heading-lg">
            <span className={styles.lineWrapper}><span>Dünyanın en nadide</span></span>
            <span className={styles.lineWrapper}><span>tek kökenli çekirdeklerini</span></span>
            <span className={styles.lineWrapper}><span>tedarik ediyor ve</span></span>
            <span className={styles.lineWrapper}><span>matematiksel bir</span></span>
            <span className={styles.lineWrapper}><span className="text-accent">hassasiyetle kavuruyoruz.</span></span>
          </h2>
        </div>
      </div>
    </section>
  );
}
