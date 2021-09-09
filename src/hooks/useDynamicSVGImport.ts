import { useRef, useState, useEffect } from 'react';
import { makeCancelable } from '../utils/makeCancelable';

interface UseDynamicSVGImportOptions {
  onCompleted?: (
    name: string,
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined
  ) => void;
  onError?: (err: Error) => void;
}

interface UseDynamicSVGImportReturn {
  error?: Error;
  loading?: boolean;
  SvgIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

/**
 * Dynamically load SVG into a Ref object which
 * can be rendered to the dom as a react component.
 * @param name The name of the icon
 * @param options onCompleted, onError callbacks
 * @returns error, loading, SvgIcon
 */
function useDynamicSVGImport(
  name: string,
  options: UseDynamicSVGImportOptions = {}
): UseDynamicSVGImportReturn {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(undefined);

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        setError(undefined);
        ImportedIconRef.current = (
          await require(`@momentum-ui/icons-rebrand/svg/${name}.svg`)
        ).ReactComponent;
        onCompleted?.(name, ImportedIconRef.current);
      } catch (err) {
        onError?.(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const { cancel } = makeCancelable(importIcon());
    return () => {
      return cancel();
    };
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
}

export { useDynamicSVGImport };
