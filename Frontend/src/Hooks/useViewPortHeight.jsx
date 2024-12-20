import { useEffect } from 'react';

export default function useViewportHeight() {
  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight; // Gets the actual viewport height
      document.documentElement.style.setProperty('--app-height', `${viewportHeight}px`);
    };

    updateHeight(); // Set height on initial load

    // Recalculate on resize or orientation change
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);
}
