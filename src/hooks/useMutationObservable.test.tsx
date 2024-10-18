import React, { useEffect, useRef, useState } from 'react';
import { act, render } from '@testing-library/react';
import { useMutationObservable } from './useMutationObservable';

describe('useMutationObservable', () => {
  const setup = (callback: () => void, config?: Parameters<typeof useMutationObservable>[2]) => {
    let timer;
    const DynamicComponent = () => {
      const [counter, setCounter] = useState(0);
      // Update component 3 times
      useEffect(() => {
        timer = setInterval(
          () =>
            act(() => {
              setCounter((n) => {
                if (n === 1) clearInterval(timer);
                return n + 1;
              });
            }),
          100
        );
      }, []);

      return <button name={counter.toString()}>{counter}</button>;
    };

    const Wrapper = () => {
      const ref = useRef();
      useMutationObservable(ref.current, callback, config);
      return (
        <div ref={ref}>
          <DynamicComponent />
        </div>
      );
    };

    return Wrapper;
  };

  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should call the callback after DOM change', async function () {
    expect.assertions(1);
    const callback = jest.fn();
    const Wrapper = setup(callback, {
      subtree: true,
      attributes: true,
      childList: true,
    });

    const { findAllByText } = render(<Wrapper />);

    await findAllByText('2');

    expect(callback.mock.calls).toEqual([
      [[expect.any(MutationRecord)], expect.any(MutationObserver)],
      [[expect.any(MutationRecord)], expect.any(MutationObserver)],
    ]);
  });
});
