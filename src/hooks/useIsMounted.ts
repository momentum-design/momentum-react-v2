import { useEffect, useRef } from 'react';

type UseIsMountedReturn = () => boolean;

const useIsMounted = (): UseIsMountedReturn => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => isMounted.current;
};

export { useIsMounted };
