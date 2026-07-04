import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>AURELIA</div>
      
      <div className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.open : ''} glass`}>
        <div className={styles.links}>
          <a href="#roastery" onClick={() => setIsOpen(false)}>Kavurmahane</a>
          <a href="#beans" onClick={() => setIsOpen(false)}>Tek Köken</a>
          <a href="#menu" onClick={() => setIsOpen(false)}>Menü</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>İletişim</a>
        </div>
      </div>
    </nav>
  );
}
