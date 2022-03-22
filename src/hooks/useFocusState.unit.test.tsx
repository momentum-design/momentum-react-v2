import React from 'react';
import { act } from 'react-dom/test-utils';

import { mountAndWait } from '../../test/utils';

import { useFocusState } from './useFocusState';

describe('useFocusStateTests', () => {
  it('focus and blur update state and call original event handlers', async () => {
    let focused = null;
    const originalOnFocus = jest.fn();
    const originalOnBlur = jest.fn();

    const Component = () => {
      const { isFocused, focusProps } = useFocusState({
        onFocus: originalOnFocus,
        onBlur: originalOnBlur,
      });
      focused = isFocused;

      return <input {...focusProps} />;
    };
    const wrapper = await mountAndWait(<Component />);

    const focusEvent = {} as React.FocusEvent<HTMLInputElement>;

    expect(focused).toEqual(false);

    await act(async () => {
      const input = wrapper.find('input');
      input.prop('onFocus')(focusEvent);
    });

    expect(focused).toEqual(true);
    expect(originalOnFocus).toHaveBeenCalledTimes(1);
    expect(originalOnFocus).toHaveBeenCalledWith(focusEvent);
    expect(originalOnBlur).not.toHaveBeenCalled();

    originalOnFocus.mockReset();

    const blurEvent = {} as React.FocusEvent<HTMLInputElement>;

    await act(async () => {
      const input = wrapper.find('input');
      input.prop('onBlur')(blurEvent);
    });

    expect(focused).toEqual(false);
    expect(originalOnBlur).toHaveBeenCalledTimes(1);
    expect(originalOnBlur).toHaveBeenCalledWith(blurEvent);
    expect(originalOnFocus).not.toHaveBeenCalled();
  });
});
