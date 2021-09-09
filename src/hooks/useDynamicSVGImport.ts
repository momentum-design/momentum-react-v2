import { useRef, useState, useEffect } from 'react';

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
  cancel(): void;
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

  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        setError(undefined);
        ImportedIconRef.current = (
          await require(`@momentum-ui/icons-rebrand/svg/${name}.svg`)
        ).ReactComponent;
        if (!cancelled) {
          onCompleted?.(name, ImportedIconRef.current);
        }
      } catch (err) {
        if (!cancelled) {
          onError?.(err);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current, cancel };
}

export { useDynamicSVGImport };
