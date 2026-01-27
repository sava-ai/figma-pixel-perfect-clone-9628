import React from 'react';
import { useEmbedScale } from '@/hooks/useEmbedScale';

interface EmbedScaleWrapperProps {
  children: React.ReactNode;
}

export const EmbedScaleWrapper: React.FC<EmbedScaleWrapperProps> = ({ children }) => {
  const { scale, isScaled } = useEmbedScale();
  
  if (!isScaled) {
    return <>{children}</>;
  }
  
  // Calculate compensated dimensions
  const compensatedSize = `${100 / scale}%`;
  
  return (
    <div 
      className="embed-scale-container"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: compensatedSize,
          height: compensatedSize,
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};
