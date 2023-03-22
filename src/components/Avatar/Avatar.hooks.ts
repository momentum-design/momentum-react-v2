/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from 'react';

export const useAvatarImage = (src?: string) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      // reset image loaded if src is empty
      setImageLoaded(false);
    }
  }, [src]);

  const handleOnLoad = () => {
    setImageLoaded(true);
  };

  const handleOnError = () => {
    setImageLoaded(false);
  };

  return { imageLoaded, handleOnLoad, handleOnError };
};
