import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import SequenceBackground from './components/WebGL/SequenceBackground';
import Preloader from './components/Preloader/Preloader';
import Hero from './components/Sections/Hero/Hero';
import BrandStory from './components/Sections/BrandStory/BrandStory';
import Gallery from './components/Sections/Gallery/Gallery';
import Features from './components/Sections/Features/Features';
import Footer from './components/Sections/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

import styles from './App.module.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisInstance) {
      if (isLoading) {
        lenisInstance.stop();
      } else {
        lenisInstance.start();
      }
    }
  }, [isLoading, lenisInstance]);

  return (
    <>
      <SequenceBackground onLoaded={() => setImagesLoaded(true)} />

      {(isLoading || !imagesLoaded) && (
        <Preloader onComplete={() => setIsLoading(false)} isReady={imagesLoaded} />
      )}
      
      <Navbar />

      <main className={styles.mainContent}>
        <Hero />
        <BrandStory />
        <Gallery />
        <Features />
        <Footer />
      </main>
    </>
  );
}

export default App;
