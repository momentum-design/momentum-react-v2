import { useRef, useState, useEffect } from 'react';
<<<<<<< HEAD
import { useIsMounted } from './useIsMounted';

interface UseDynamicJSONImportOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
=======

interface UseDynamicJSONImportOptions {
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
  onCompleted?: (name: string, animationData: any) => void;
  onError?: (err: Error) => void;
}

interface UseDynamicJSONImportReturn {
  error?: Error;
  loading?: boolean;
<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
=======
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
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
<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ImportedJSONRef = useRef<any | any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(undefined);
  const isMounted = useIsMounted();
=======
  const ImportedJSONRef = useRef<any | any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(undefined);
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importJSON = async (): Promise<void> => {
      try {
        setError(undefined);
<<<<<<< HEAD
        setError(undefined);
        ImportedJSONRef.current =
          await require(`@momentum-ui/animations/lottie/reactions/${name}.json`);
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
=======
        ImportedJSONRef.current =
          await require(`@momentum-ui/animations/lottie/reactions/${name}.json`);
        onCompleted?.(name, ImportedJSONRef.current);
      } catch (err) {
        onError?.(err);
        setError(err);
      } finally {
        setLoading(false);
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      }
    };
    importJSON();
  }, [name, onCompleted, onError]);

  return { error, loading, animationData: ImportedJSONRef.current };
}

export { useDynamicJSONImport };
