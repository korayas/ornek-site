import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { y: -100 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <footer className={styles.footer} ref={containerRef} id="contact">
      <div className={styles.container}>
        <div className={styles.top}>
          <h2 className="heading-huge">AURELIA</h2>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.col}>
            <span className="text-label">Konum</span>
            <p>128 Artisan Way<br/>Kahve Bölgesi, NY 10012</p>
          </div>
          
          <div className={styles.col}>
            <span className="text-label">İletişim</span>
            <p>hello@aureliaroasters.com<br/>+1 (555) 123-4567</p>
          </div>
          
          <div className={styles.col}>
            <span className="text-label">Sosyal Medya</span>
            <div className={styles.socials}>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Aurelia Roasters. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
