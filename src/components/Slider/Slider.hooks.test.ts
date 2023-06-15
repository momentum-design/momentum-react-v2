import { useSliderSideEffects } from './Slider.hooks';
import { renderHook } from '@testing-library/react-hooks';
import type { SliderHookArgs } from './Slider.types';
import { act } from '@testing-library/react';
import * as utils from './Slider.utils';

describe('useSliderSideEffects', () => {
  let result;

  const render = (args: SliderHookArgs) => {
    ({ result } = renderHook((props) => useSliderSideEffects(props), {
      initialProps: args,
    }));
  };

  it('should fire handleChange as expected', () => {
    const args = {
      onChange: jest.fn(),
      value: 5,
      minValue: 0,
      maxValue: 10,
      step: 1,
    };

    const changeEvent = {
      currentTarget: {
        value: '8',
        min: '0',
        max: '10',
      },
    };

    const setLocalSpy = jest.spyOn(utils, 'setLocalValueOnElement').mockImplementation(jest.fn());

    render(args);
    act(() => {
      result.current.handleChange(changeEvent);
    });

    expect(args.onChange).toBeCalledWith(+changeEvent.currentTarget.value);
    expect(setLocalSpy).toBeCalledWith(changeEvent.currentTarget);
  });
});
