/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { useFocusAndFocusWithinState, useFocusState, useFocusWithinState } from './useFocusState';
import { act } from 'react-dom/test-utils';
import { mountAndWait } from '../../test/utils';
import { render } from '@testing-library/react';
import classNames from 'classnames';

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

describe('useFocusWithinStateTests', () => {
  it('works as expected', () => {
    const onFocusWithin = jest.fn();
    const onBlurWithin = jest.fn();

    const Component = () => {
      const { isFocusedWithin, focusWithinProps } = useFocusWithinState({
        onFocusWithin,
        onBlurWithin,
      });

      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      return (
        <div
          tabIndex={0}
          {...focusWithinProps}
          data-testid="div"
          className={isFocusedWithin ? 'focusedWithin' : ''}
        >
          <button data-testid="button" />
        </div>
      );
    };

    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    const { getByTestId } = render(
      <>
        <div data-testid="other" tabIndex={0} />
        <Component />
      </>
    );

    const div = getByTestId('div');
    const otherDiv = getByTestId('other');
    const button = getByTestId('button');

    expect(div.className).toEqual('');

    button.focus();

    expect(onFocusWithin).toHaveBeenCalledTimes(1);
    expect(onBlurWithin).not.toHaveBeenCalled();

    expect(div.className).toEqual('focusedWithin');

    button.blur();

    expect(onFocusWithin).toHaveBeenCalledTimes(1);
    expect(onBlurWithin).toHaveBeenCalledTimes(1);

    expect(div.className).toEqual('');

    div.focus();

    expect(onFocusWithin).toHaveBeenCalledTimes(2);
    expect(onBlurWithin).toHaveBeenCalledTimes(1);

    expect(div.className).toEqual('focusedWithin');

    otherDiv.focus();

    expect(onFocusWithin).toHaveBeenCalledTimes(2);
    expect(onBlurWithin).toHaveBeenCalledTimes(2);

    expect(div.className).toEqual('');
  });
});

describe('useFocusAndFocusWithinStateTests', () => {
  it('works as expected', () => {
    const onFocusWithin = jest.fn();
    const onBlurWithin = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const Component = () => {
      const { isFocusedWithin, isFocused, focusProps } = useFocusAndFocusWithinState({
        onFocusWithin,
        onBlurWithin,
        onBlur,
        onFocus,
      });
      return (
        <div
          tabIndex={0}
          {...focusProps}
          data-testid="div"
          className={classNames({ isFocusedWithin, isFocused })}
        >
          <button data-testid="button" />
        </div>
      );
    };

    const { getByTestId } = render(
      <>
        <div data-testid="other" tabIndex={0} />
        <Component />
      </>
    );

    const div = getByTestId('div');
    const otherDiv = getByTestId('other');
    const button = getByTestId('button');

    expect(div.className).toEqual('');

    button.focus();

    expect(onFocusWithin).toHaveBeenCalledTimes(1);
    expect(onBlurWithin).not.toHaveBeenCalled();
    expect(onFocus).not.toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();

    expect(div.className).toEqual('isFocusedWithin');

    button.blur();

    expect(onFocusWithin).toHaveBeenCalledTimes(1);
    expect(onBlurWithin).toHaveBeenCalledTimes(1);
    expect(onFocus).not.toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();

    expect(div.className).toEqual('');

    div.focus();

    expect(onFocusWithin).toHaveBeenCalledTimes(2);
    expect(onBlurWithin).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();

    expect(div.className).toEqual('isFocusedWithin isFocused');

    otherDiv.focus();

    expect(onFocusWithin).toHaveBeenCalledTimes(2);
    expect(onBlurWithin).toHaveBeenCalledTimes(2);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);

    expect(div.className).toEqual('');
  });
});
