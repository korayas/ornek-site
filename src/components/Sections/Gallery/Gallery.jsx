import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
];

export default function Gallery() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    const imgs = scrollWrapper.querySelectorAll('img');
    
    const getScrollAmount = () => {
      let scrollWidth = scrollWrapper.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollWrapper, {
      x: getScrollAmount,
      ease: "none"
    });

    const setSkew = gsap.quickSetter(imgs, "skewX", "deg");
    let proxy = { skew: 0 },
        clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -100);
        if (Math.abs(skew) > 1) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0, 
            duration: 0.8, 
            ease: "power3", 
            overwrite: true, 
            onUpdate: () => setSkew(proxy.skew)
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className={styles.gallerySection} ref={containerRef} id="beans">
      <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
        <div className={styles.intro}>
          <h2 className="heading-md">Tek Köken<br/>Koleksiyonu</h2>
          <p>En yüksek rakımlardan özenle seçilmiş.</p>
        </div>
        
        {images.map((src, idx) => (
          <div key={idx} className={styles.imageContainer}>
            <img src={src} alt={`Coffee Beans ${idx + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
