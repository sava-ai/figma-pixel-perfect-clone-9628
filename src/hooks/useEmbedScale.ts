import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface EmbedScaleResult {
  scale: number;
  isEmbedded: boolean;
  isScaled: boolean;
}

export const useEmbedScale = (): EmbedScaleResult => {
  const [searchParams] = useSearchParams();
  
  const result = useMemo(() => {
    const scaleParam = searchParams.get('scale');
    const scale = scaleParam ? parseFloat(scaleParam) : 1;
    
    // Validate scale is between 0.1 and 1
    const validScale = Math.min(Math.max(scale, 0.1), 1);
    
    // Detect if running in an iframe
    const isEmbedded = window.self !== window.top;
    
    return {
      scale: validScale,
      isEmbedded,
      isScaled: validScale !== 1
    };
  }, [searchParams]);
  
  return result;
};
