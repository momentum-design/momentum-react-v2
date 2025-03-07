import React from 'react';
import { mount } from 'enzyme';

import TooltipWrapper from './TooltipWrapper';
import ButtonPill from '../ButtonPill';
import Tooltip from '../Tooltip';

describe('<TooltipWrapper />', () => {
  it('moves the props around correctly', () => {
    const onPressHandler = jest.fn();

    const wrapper = mount(
      <TooltipWrapper
        _tooltipProps={{ type: 'label', children: 'Tooltip Content' }}
        _triggerComponent={<ButtonPill aria-describedby="test">Trigger</ButtonPill>}
        onPress={onPressHandler}
      />
    );

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.props()).toEqual({
      type: 'label',
      children: 'Tooltip Content',
      triggerComponent: expect.any(Object),
    });

    const triggerComponent = tooltip.prop('triggerComponent');
    expect(triggerComponent.type).toBe(ButtonPill);
    expect(triggerComponent.props).toEqual({
      children: 'Trigger',
      'aria-describedby': 'test',
      onPress: onPressHandler,
    });
  });
});
