import React, { useState, useEffect, useRef } from 'react';
import logoSearch from '@/assets/logo-search.svg';

interface AnimatedLogoProps {
  className?: string;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '' }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center of logo to cursor
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Limit the rotation amount (max ~15 degrees)
      const maxRotation = 15;
      const distanceX = Math.min(Math.max(deltaX / 30, -maxRotation), maxRotation);
      const distanceY = Math.min(Math.max(deltaY / 30, -maxRotation), maxRotation);

      setRotation({
        x: -distanceY * 0.5, // Invert Y for natural tilt
        y: distanceX * 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={logoRef}
      className={`inline-block transition-transform duration-150 ease-out ${className}`}
      style={{
        transform: `perspective(500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <img 
        src={logoSearch} 
        alt="Search Logo" 
        className="w-[180px] h-auto"
        draggable={false}
      />
    </div>
  );
};
