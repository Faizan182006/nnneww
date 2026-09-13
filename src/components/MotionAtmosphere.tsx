import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const MotionAtmosphere: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Cursor glow state
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (desktop mouse)
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsPointerDevice(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator Bar at Very Top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#8c724f] via-[#c8a97e] to-[#f4efe6] z-50 origin-left shadow-[0_0_12px_rgba(200,169,126,0.8)] pointer-events-none"
      />

      {/* Subtle Ambient Luxury Cursor Follower (Desktop only) */}
      {isPointerDevice && (
        <motion.div
          className="fixed pointer-events-none z-30 w-96 h-96 rounded-full bg-[#c8a97e]/[0.035] blur-[80px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 hidden lg:block"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 250,
            mass: 0.5,
          }}
        />
      )}

      {/* Floating Ambient Olfactory Sparks (Subtle Background Drifting) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { x: '10%', y: '20%', size: 4, dur: 12, delay: 0 },
          { x: '85%', y: '15%', size: 5, dur: 16, delay: 2 },
          { x: '25%', y: '75%', size: 3, dur: 14, delay: 4 },
          { x: '90%', y: '80%', size: 4, dur: 18, delay: 1 },
          { x: '50%', y: '45%', size: 6, dur: 20, delay: 3 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-[#c8a97e]/30 to-[#f4efe6]/50 blur-[1px]"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 15, 0],
              opacity: [0.15, 0.5, 0.15],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: particle.dur,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </>
  );
};
