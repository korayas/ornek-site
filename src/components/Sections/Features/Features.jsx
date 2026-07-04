import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Features.module.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Espresso Bar",
    desc: "Sıvı altını ustalıkla çıkaran son teknoloji İtalyan makineleri, kusursuz bir hassasiyetle servis edilir.",
    number: "01"
  },
  {
    title: "Pour Over",
    desc: "Yavaş, bilinçli ve kesin. Mevsimsel çekirdeklerimizin narin notalarını ön plana çıkarır.",
    number: "02"
  },
  {
    title: "Artisan Pastry",
    desc: "Kavurmalarımızı tamamlamak için her gün Fransız tereyağı ve organik un kullanılarak taze pişirilir.",
    number: "03"
  }
];

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll(`.${styles.item}`);

    items.forEach((item) => {
      gsap.fromTo(item, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section className={styles.featuresSection} ref={containerRef} id="menu">
      <div className={styles.container}>
        {features.map((feature, idx) => (
          <div key={idx} className={`${styles.item} glass`}>
            <div className={styles.number}>{feature.number}</div>
            <h3 className="heading-md">{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
