import Icon from '.';
import React, { useEffect, useState } from 'react';
import { STYLE, EXCEPTION_ICONS_LIST, VIEW_BOX_SPECS } from './Icon.constants';

import { mountAndWait } from '../../../test/utils';
import { InferredIconName } from './Icon.types';

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

      container = await mountAndWait(<Icon name="draft-indicator" weight="bold" ariaLabel={ariaLabel} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-label', async () => {
      expect.assertions(1);

      const ariaLabel = 'This participant is muted';

      container = await mountAndWait(<Icon name="draft-indicator" weight="bold" aria-label={ariaLabel} />);

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

    it('should match snapshot with color', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" color="red" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with fillColor', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" fillColor="red" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with strokeColor', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" strokeColor="red" />);

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
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      const wrapper = await mountAndWait(<Icon name="accessibility" />);
      const icon = wrapper.find(Icon).getDOMNode();

      expect(icon.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<Icon name="accessibility" className={className} />);
      const element = wrapper.find(Icon).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<Icon name="accessibility" id={id} />);
      const element = wrapper.find(Icon).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<Icon name="accessibility" style={style} />);
      const element = wrapper.find(Icon).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided title when title is provided', async () => {
      expect.assertions(1);

      const title = 'You have a draft message';

      const wrapper = await mountAndWait(<Icon name="draft-indicator" weight="bold" title={title} />);
      const element = wrapper.find(Icon).getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should have aria-label when ariaLabel is provided', async () => {
      expect.assertions(2);

      const ariaLabel = 'This participant is muted';

      const wrapper = await mountAndWait(
        <Icon name="draft-indicator" weight="bold" ariaLabel={ariaLabel} />
      );
      const element = wrapper.find(Icon).getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
      expect(element.getAttribute('aria-hidden')).toBe('false');
    });

    it('should have aria-label when aria-label is provided', async () => {
      expect.assertions(2);

      const ariaLabel = 'This participant is muted';

      const wrapper = await mountAndWait(
        <Icon name="draft-indicator" weight="bold" aria-label={ariaLabel} />
      );
      const element = wrapper.find(Icon).getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
      expect(element.getAttribute('aria-hidden')).toBe('false');
    });

    it('should pass scale prop', async () => {
      const scale = 16;

      const wrapper = await mountAndWait(
        <Icon name={'accessibility'} id={'fake-id'} scale={scale} />
      );
      const icon = wrapper.find('svg').getDOMNode();
      const div = wrapper.find('div').filter({ id: 'fake-id' });

      expect(icon.getAttribute('data-scale')).toBe(`${scale}`);
      expect(div.props().className).toBe(
        'md-icon-wrapper md-icon-auto-scales md-icon-scales md-icon-no-shrink'
      );
    });

    it.each([
      {
        props: {
          title: undefined,
          ariaLabel: 'fake aria label',
          'aria-label': 'fake-aria-label',
        },
        expectedAriaLabel: 'fake aria label',
        expectedAriaHidden: 'false',
      },
      {
        props: {
          title: 'fake title',
          ariaLabel: undefined,
          'aria-label': 'fake aria-label',
        },
        expectedAriaLabel: 'fake aria-label',
        expectedAriaHidden: 'false',
      },
      {
        props: {
          title: 'fake title',
          ariaLabel: 'fake aria label',
          'aria-label': undefined,
        },
        expectedAriaLabel: 'fake aria label',
        expectedAriaHidden: 'false',
      },
      {
        props: {
          title: undefined,
          ariaLabel: 'fake aria label',
          'aria-label': undefined,
        },
        expectedAriaLabel: 'fake aria label',
        expectedAriaHidden: 'false',
      },
      {
        props: {
          title: 'fake title',
          ariaLabel: undefined,
          'aria-label': undefined,
        },
        expectedAriaLabel: 'fake title',
        expectedAriaHidden: 'false',
      },
      {
        props: {
          title: undefined,
          ariaLabel: undefined,
          'aria-label': 'fake aria-label',
        },
        expectedAriaLabel: 'fake aria-label',
        expectedAriaHidden: 'false',
      },
      {
        props: {
          title: undefined,
          ariaLabel: undefined,
          'aria-label': undefined,
        },
        expectedAriaLabel: undefined,
        expectedAriaHidden: 'true',
      },
    ])(
      'should pass title and ariaLabel prop when %s',
      async ({ props, expectedAriaHidden, expectedAriaLabel }) => {
        const wrapper = await mountAndWait(
          <Icon name={'accessibility'} id={'fake-id'} {...props} />
        );
        const icon = wrapper.find('svg').getDOMNode();
        const div = wrapper.find('div').filter({ id: 'fake-id' });

        expect(div.props().className).toBe('md-icon-wrapper md-icon-auto-scales md-icon-scales');
        expect(div.props().title).toBe(props.title);
        expect(div.props().role).toBe('img');
        expect(div.props()['aria-label']).toBe(expectedAriaLabel);
        expect(div.props()['aria-hidden']).toBe(expectedAriaHidden);

        expect(icon.getAttribute('aria-hidden')).toBe('true');
      }
    );

    it('should pass autoScale prop and disable scale prop', async () => {
      const autoScale = true;

      const wrapper = await mountAndWait(
        <Icon name={'accessibility'} autoScale={autoScale} id={'fake-id'} />
      );
      const icon = wrapper.find('svg').getDOMNode();
      const div = wrapper.find('div').filter({ id: 'fake-id' });

      expect(icon.getAttribute('data-autoscale')).toBe(`${autoScale}`);
      expect(icon.getAttribute('data-scale')).toBe('false');
      expect(div.props().className).toBe('md-icon-wrapper md-icon-auto-scales md-icon-scales');
    });

    it('should pass autoScale prop as numeric value when set appropriately', async () => {
      const autoScale = 150;

      const wrapper = await mountAndWait(<Icon name={'accessibility'} autoScale={autoScale} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('data-autoscale')).toBe(`${autoScale}`);
      expect(icon.getAttribute('data-scale')).toBe('false');
    });

    it('should pass color prop', async () => {
      const color = 'blue';

      const wrapper = await mountAndWait(<Icon name={'accessibility'} color={color} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`fill: ${color}; stroke: ${color};`);
    });

    it('should pass fillColor prop', async () => {
      const fillColor = 'blue';

      const wrapper = await mountAndWait(<Icon name={'accessibility'} fillColor={fillColor} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`fill: ${fillColor};`);
    });

    it('should pass strokeColor prop', async () => {
      const strokeColor = 'blue';

      const wrapper = await mountAndWait(<Icon name={'accessibility'} strokeColor={strokeColor} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`stroke: ${strokeColor};`);
    });

    it('should override fillColor and strokeColor when color is provided', async () => {
      const color = 'blue';
      const fillColor = 'green';
      const strokeColor = 'red';

      const wrapper = await mountAndWait(
        <Icon
          name={'accessibility'}
          color={color}
          fillColor={fillColor}
          strokeColor={strokeColor}
        />
      );

      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`fill: ${color}; stroke: ${color};`);
    });

    it('should not pass fillColor prop if icon is already coloured', async () => {
      const fillColor = 'blue';

      const wrapper = await mountAndWait(
        <Icon name={'apple-business-chat-colored'} fillColor={fillColor} />
      );
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(null);
    });

    EXCEPTION_ICONS_LIST.forEach((name) => {
      it(`check if icon ${name} receive right viewBox size`, async () => {
        const wrapper = await mountAndWait(<Icon name={name} scale={14} />);
        const icon = wrapper.find('svg').getDOMNode();

        expect(icon.getAttribute('viewBox')).toBe(VIEW_BOX_SPECS.SMALL);
      });
    });

    it(`check if icon receive default viewBox size`, async () => {
      const wrapper = await mountAndWait(<Icon name="accessibility" scale={32} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('viewBox')).toBe(VIEW_BOX_SPECS.NORMAL);
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
