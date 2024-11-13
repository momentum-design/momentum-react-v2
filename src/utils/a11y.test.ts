import { renderHook } from '@testing-library/react-hooks';
import { AriaLabelRequired, useCheckForScreenReaderLabel } from './a11y';
import { Equal, Expect } from './types.test.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  // Check that the AriaLabelRequired type is correct
  Expect<Equal<AriaLabelRequired, { 'aria-label': string } | { 'aria-labelledby': string }>>
];

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
