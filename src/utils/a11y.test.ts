import { renderHook } from '@testing-library/react-hooks';
import { useCheckForScreenReaderLabel } from './a11y';

describe('a11y utils', () => {
  describe('useCheckForScreenReaderLabel', () => {
    let consoleWarnSpy: jest.SpyInstance;
    let unmount: () => void;

    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      consoleWarnSpy.mockReset();
      unmount?.();
    });

    const mountHook = (...args: Parameters<typeof useCheckForScreenReaderLabel>) => {
      ({ unmount } = renderHook(() => useCheckForScreenReaderLabel(...args)));
    };

    it.each`
      componentName | props                            | expectedWarn
      ${'Test'}     | ${{}}                            | ${true}
      ${'Hello'}    | ${{ 'aria-label': '' }}          | ${true}
      ${'World'}    | ${{ 'aria-labelledby': '' }}     | ${true}
      ${'Test'}     | ${{ 'aria-label': 'test' }}      | ${false}
      ${'Test'}     | ${{ 'aria-labelledby': 'test' }} | ${false}
    `(
      'checks if label is defined ($props): warns = $expectedWarn',
      ({ componentName, props, expectedWarn }) => {
        mountHook(componentName, props);

        if (expectedWarn) {
          expect(consoleWarnSpy).toHaveBeenCalledWith(
            `MRV2: ${componentName} requires aria-labelledby or aria-label.`
          );
        } else {
          expect(consoleWarnSpy).not.toHaveBeenCalled();
        }

        consoleWarnSpy.mockReset();
        unmount();
      }
    );
  });
});
