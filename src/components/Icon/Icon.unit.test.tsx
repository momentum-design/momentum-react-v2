import Icon from '.';
import React, { useEffect, useState } from 'react';
import { STYLE } from './Icon.constants';

import { mountAndWait } from '../../../test/utils';
import { InferredIconName } from './Icon.types';
import Tooltip from '../Tooltip';

jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('<Icon />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      container = await mountAndWait(<Icon name="accessibility" className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      container = await mountAndWait(<Icon name="accessibility" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = await mountAndWait(<Icon name="accessibility" style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', async () => {
      expect.assertions(1);

      const title = 'You have a draft message';

      container = await mountAndWait(<Icon name="draft-indicator" weight="bold" title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabel', async () => {
      expect.assertions(1);

      const ariaLabel = 'This participant is muted';

      container = await mountAndWait(
        <Icon name="draft-indicator" weight="bold" ariaLabel={ariaLabel} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-label', async () => {
      expect.assertions(1);

      const ariaLabel = 'This participant is muted';

      container = await mountAndWait(
        <Icon name="draft-indicator" weight="bold" aria-label={ariaLabel} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scale', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" scale={16} />);

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with autoScale set to 'true'", async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" autoScale={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with autoScale set to a percentage value', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" autoScale={150} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with weight', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" weight="light" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with fillColor', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" fillColor="red" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with invalid name', async () => {
      expect.assertions(1);
      jest.mock(
        '@momentum-design/icons/dist/svg/invalid_icon_name.svg?svgr',
        () => {
          throw new Error('error');
        },
        { virtual: true }
      );

      container = await mountAndWait(<Icon name={`invalid_icon_name` as InferredIconName} />);

      expect(container).toMatchSnapshot();
      jest.dontMock('@momentum-design/icons/dist/svg/invalid_icon_name.svg?svgr');
    });

    it('should match snapshot with small icons', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="info-badge" scale={14} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tooltip (children)', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Icon name="accessibility" tooltipProps={{ children: 'Test' }} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tooltip (children and placement)', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Icon name="accessibility" tooltipProps={{ children: 'Test', placement: 'bottom' }} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      const wrapper = await mountAndWait(<Icon name="accessibility" />);
      const icon = wrapper.find('mdc-icon').getDOMNode();

      expect(icon.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<Icon name="accessibility" className={className} />);
      const element = wrapper.find('mdc-icon').getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<Icon name="accessibility" id={id} />);
      const element = wrapper.find('mdc-icon').getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<Icon name="accessibility" style={style} />);
      const element = wrapper.find('mdc-icon').getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided title when title is provided', async () => {
      expect.assertions(1);

      const title = 'You have a draft message';

      const wrapper = await mountAndWait(
        <Icon name="draft-indicator" weight="bold" title={title} />
      );
      const element = wrapper.find('mdc-icon').getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(title);
    });

    it('should have aria-label when ariaLabel is provided', async () => {
      expect.assertions(1);

      const ariaLabel = 'This participant is muted';

      const wrapper = await mountAndWait(
        <Icon name="draft-indicator" weight="bold" ariaLabel={ariaLabel} />
      );

      const element = wrapper.find('mdc-icon').getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
    });

    it('should have aria-label when aria-label is provided', async () => {
      expect.assertions(1);

      const ariaLabel = 'This participant is muted';

      const wrapper = await mountAndWait(
        <Icon name="draft-indicator" weight="bold" aria-label={ariaLabel} />
      );
      const element = wrapper.find('mdc-icon').getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
    });

    it('should pass scale prop', async () => {
      const scale = 16;

      const wrapper = await mountAndWait(<Icon name={'accessibility'} scale={scale} />);
      const icon = wrapper.find('mdc-icon').getDOMNode();

      expect(icon.getAttribute('data-scale')).toBe(`${scale}`);
      expect(icon.classList.toString()).toBe(
        'md-icon-wrapper md-icon-auto-scales md-icon-scales md-icon-no-shrink'
      );
    });

    it('should pass autoScale prop and disable scale prop', async () => {
      const autoScale = true;

      const wrapper = await mountAndWait(
        <Icon name={'accessibility'} autoScale={autoScale} id={'fake-id'} />
      );
      const icon = wrapper.find('mdc-icon').getDOMNode();

      expect(icon.getAttribute('data-autoscale')).toBe(`${autoScale}`);
      expect(icon.getAttribute('data-scale')).toBe('false');
      expect(icon.classList.toString()).toBe(
        'md-icon-wrapper md-icon-auto-scales md-icon-scales md-icon-no-shrink'
      );
    });

    it('should pass autoScale prop as numeric value when set appropriately', async () => {
      const autoScale = 150;

      const wrapper = await mountAndWait(<Icon name={'accessibility'} autoScale={autoScale} />);
      const icon = wrapper.find('mdc-icon').getDOMNode();

      expect(icon.getAttribute('data-autoscale')).toBe(`${autoScale}`);
      expect(icon.getAttribute('data-scale')).toBe('false');
    });

    it('should pass fillColor prop', async () => {
      const fillColor = 'blue';

      const wrapper = await mountAndWait(<Icon name={'accessibility'} fillColor={fillColor} />);
      const icon = wrapper.find('mdc-icon').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`--mdc-icon-fill-color: ${fillColor};`);
    });

    it('does not wrap icon in a tooltip if tooltipProps is not specified', async () => {
      const wrapper = await mountAndWait(<Icon name="accessibility" />);

      expect(wrapper.find(Tooltip).exists()).toBe(false);
    });

    it('does wraps icon in a tooltip if tooltipProps is specified', async () => {
      const wrapper = await mountAndWait(
        <Icon name="accessibility" tooltipProps={{ children: 'Tooltip content!' }} />
      );

      const tooltip = wrapper.find(Tooltip);

      expect(tooltip.props()).toStrictEqual({
        placement: 'top',
        strategy: 'fixed',
        type: 'label',
        triggerComponent: expect.any(Object),
        children: 'Tooltip content!',
      });

      expect(wrapper.find('mdc-icon').exists()).toBe(true);
    });
  });

  describe('clean up', () => {
    it('can unmount the Icon component without erroring', async () => {
      expect.assertions(0);

      const Component = () => {
        const [visible, setVisible] = useState(true);

        useEffect(() => {
          setVisible(false);
        }, []);

        return <div>{visible && <Icon name="accessibility" />}</div>;
      };

      await mountAndWait(<Component />);
    });
  });
});
