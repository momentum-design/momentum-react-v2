import { useRef, useState, useEffect } from 'react';

import { useIsMounted } from './useIsMounted';

interface UseDynamicJSONImportOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCompleted?: (name: string, animationData: any) => void;
  onError?: (err: Error) => void;
}

interface UseDynamicJSONImportReturn {
  error?: Error;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData?: any;
}

/**
 * Dynamically load JSON animation data into a Ref object which
 * can be rendered to the dom as a react component.
 * @param name The name of the icon
 * @param options onCompleted, onError callbacks
 * @returns error, loading, SvgIcon
 */
function useDynamicJSONImport(
  name: string,
  options: UseDynamicJSONImportOptions = {}
): UseDynamicJSONImportReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ImportedJSONRef = useRef<any | any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(undefined);
  const isMounted = useIsMounted();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importJSON = async (): Promise<void> => {
      try {
        setError(undefined);
        setError(undefined);
        ImportedJSONRef.current = (
          await import(`@momentum-ui/animations/lottie/reactions/${name}.json?lottie`)
        ).default;
        if (isMounted()) {
          onCompleted?.(name, ImportedJSONRef.current);
        }
      } catch (err) {
        if (isMounted()) {
          onError?.(err);
          setError(err);
        }
      } finally {
        if (isMounted()) {
          setLoading(false);
        }
      }
    };
    importJSON();
  }, [name, onCompleted, onError]);

  return { error, loading, animationData: ImportedJSONRef.current };
}

export { useDynamicJSONImport };
