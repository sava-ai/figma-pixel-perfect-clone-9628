import React, { useState, useEffect, useRef } from 'react';
import logoSearch from '@/assets/logo-search.svg';

interface AnimatedLogoProps {
  className?: string;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '' }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
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

      // Move the logo towards the cursor (max 20px movement)
      const maxMove = 20;
      const moveX = Math.min(Math.max(deltaX / 25, -maxMove), maxMove);
      const moveY = Math.min(Math.max(deltaY / 25, -maxMove), maxMove);

      setOffset({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={logoRef}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <img 
        src={logoSearch} 
        alt="Search Logo" 
        className="w-[90px] h-auto"
        draggable={false}
      />
    </div>
  );
};
