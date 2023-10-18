import { useCallback, useEffect, useState } from 'react';

export function useControlsActivity (idleTime: number) {
  const [isIdle, setIsIdle] = useState(true);

  const handleIdle = useCallback(() => {

  }, []);

  useEffect(() => {

    window.addEventListener('mousemove', handleIdle);
    window.addEventListener('keydown', handleIdle);

    return () => {
      window.removeEventListener('mousemove', handleIdle);
      window.removeEventListener('keydown', handleIdle);
    };

  }, [handleIdle]);

  return {
    isIdle,
  };
}
