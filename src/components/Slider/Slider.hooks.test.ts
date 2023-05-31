import { useSliderSideEffects, useThumbSideEffects } from './Slider.hooks';
import { renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { useNumberFormatter, useSlider } from 'react-aria';
import { useSliderState } from '@react-stately/slider';
import type { SliderHookArgs, ThumbHookArgs } from './Slider.types';

describe('useSliderSideEffects', () => {
  let result;

  const render = (args: SliderHookArgs) => {
    ({ result } = renderHook((props) => useSliderSideEffects(props), {
      initialProps: args,
    }));
  };

  it.each([
    {
      value: 1,
      minValue: 0,
      maxValue: 10,
      step: 1,
      expectedValuePercentage: 10,
    },
    {
      value: 9,
      minValue: 0,
      maxValue: 10,
      step: 1,
      expectedValuePercentage: 90,
    },
    {
      value: 105,
      minValue: 100,
      maxValue: 110,
      step: 1,
      expectedValuePercentage: 50,
    },
    {
      value: 11,
      minValue: 0,
      maxValue: 10,
      step: 1,
      expectedValuePercentage: 100,
    },
    {
      value: 4,
      minValue: 5,
      maxValue: 10,
      step: 1,
      expectedValuePercentage: 0,
    },
  ])(
    'should return as expected for %o',
    ({ value, minValue, maxValue, step, expectedValuePercentage }) => {
      render({
        value,
        minValue,
        maxValue,
        step,
        onChange: jest.fn(),
        isDisabled: false,
        ariaLabel: 'test label',
      });

      expect(result.current).toStrictEqual({
        groupProps: {
          'aria-label': 'test label',
          'aria-labelledby': undefined,
          id: 'test-ID',
          role: 'group',
        },
        trackProps: {
          onKeyDown: expect.any(Function),
          onMouseDown: expect.any(Function),
          onPointerDown: expect.any(Function),
          onTouchStart: expect.any(Function),
        },
        state: expect.any(Object),
        trackRef: expect.any(Object),
        trackStyle: {
          '--local-value': `${expectedValuePercentage}%`,
        },
      });
    }
  );
});

describe('useThumbSideEffects', () => {
  let result;
  const sliderProps = { step: 1, minValue: 0, maxValue: 10, value: [5] };

  const render = (args: Omit<ThumbHookArgs, 'state'>) => {
    ({ result } = renderHook(
      (props) => {
        const trackRef = useRef<HTMLDivElement>(null);
        const numberFormatter = useNumberFormatter();

        const state = useSliderState({ ...sliderProps, numberFormatter });
        useSlider(sliderProps, state, trackRef);
        return useThumbSideEffects({ ...props, state });
      },
      {
        initialProps: args,
      }
    ));
  };

  it('should return as expected', () => {
    render({
      trackRef: { current: null },
    });

    expect(result.current).toEqual({
      inputProps: {
        'aria-errormessage': undefined,
        'aria-invalid': undefined,
        'aria-label': undefined,
        'aria-labelledby': 'test-ID',
        'aria-orientation': undefined,
        'aria-required': undefined,
        'aria-valuetext': `${sliderProps.value[0]}`,
        disabled: undefined,
        id: 'test-ID',
        max: sliderProps.maxValue,
        min: sliderProps.minValue,
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        onKeyDown: undefined,
        onKeyUp: undefined,
        step: sliderProps.step,
        tabIndex: 0,
        type: 'range',
        value: sliderProps.value[0],
      },
      inputRef: {
        current: null,
      },
      thumbProps: {
        onKeyDown: expect.any(Function),
        onMouseDown: expect.any(Function),
        onPointerDown: expect.any(Function),
        onTouchStart: expect.any(Function),
      },
    });
  });
});
