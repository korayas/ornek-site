import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SequenceBackground.module.css';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 228;
const currentFrame = index => (
  `${import.meta.env.BASE_URL}sequence/ezgif-frame-${index.toString().padStart(3, '0')}.png`
);

export default function SequenceBackground({ onLoaded }) {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const loadedImages = [];
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      
      const onImageLoadOrError = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          if (onLoaded) onLoaded();
        }
      };

      img.onload = onImageLoadOrError;
      img.onerror = onImageLoadOrError;
      
      loadedImages.push(img);
    }
  }, [onLoaded]);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const render = (img) => {
      // Clear and draw image scaled to cover the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Draw first frame immediately
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(images[0]);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const sequenceState = { frame: 0 };

    ScrollTrigger.create({
      start: 0,
      end: "max",
      scrub: 1.5,
      onUpdate: (self) => {
        const index = Math.round(self.progress * (frameCount - 1));
        if (images[index]) {
          requestAnimationFrame(() => render(images[index]));
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [images]);

  return (
    <div className={styles.canvasContainer}>
      <canvas 
        ref={canvasRef} 
        className={styles.sequenceCanvas}
      />
      <div className={styles.overlay}></div>
    </div>
  );
}
