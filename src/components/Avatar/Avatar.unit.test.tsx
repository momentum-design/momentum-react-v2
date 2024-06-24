import Avatar from '.';
import { mount } from 'enzyme';
import React, { createRef } from 'react';
import { MAX_INITIALS_SPACE, SIZES, STYLE, AVATAR_COLORS } from './Avatar.constants';
import { AvatarColor, AvatarSize, PresenceType } from './Avatar.types';
import { mountAndWait } from '../../../test/utils';

describe('Avatar', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Avatar title="Cisco Webex" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with initials', () => {
      expect.assertions(1);

      const container = mount(<Avatar initials="CW" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const container = mount(<Avatar title="CW" size={size} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with presence', async () => {
      expect.assertions(1);

      const avatars = Object.values(PresenceType).map((presence, index) => {
        return <Avatar key={index} title="Cisco Webex" presence={presence} />;
      });

      const container = await mountAndWait(<div>{avatars}</div>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with src & alt', () => {
      expect.assertions(1);

      const container = mount(<Avatar title="CW" src={'src'} alt={'alt'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type', () => {
      expect.assertions(1);

      const container = mount(<Avatar title="Cisco Webex" type="space" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Avatar icon="check" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with onPress', async () => {
      expect.assertions(1);

      const onPress = () => {
        return 'hi';
      };

      const container = await mountAndWait(<Avatar onPress={onPress} title="Cisco Webex" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with failureBadge', async () => {
      expect.assertions(1);

      const failureBadge = true;

      const container = await mountAndWait(
        <Avatar failureBadge={failureBadge} title="Cisco Webex" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isTyping', async () => {
      expect.assertions(1);

      const isTyping = true;

      const container = await mountAndWait(<Avatar isTyping={isTyping} title="Cisco Webex" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with hideDefaultTooltip', async () => {
      expect.assertions(1);

      const hideDefaultTooltip = true;

      const container = await mountAndWait(
        <Avatar hideDefaultTooltip={hideDefaultTooltip} title="Cisco Webex" />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<Avatar initials="CW" />)
        .find(Avatar)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass the size prop', () => {
      expect.assertions(1);

      const size = SIZES[2] as AvatarSize;

      const element = mount(<Avatar initials="CW" size={size} />)
        .find(`div.${STYLE.wrapper}`)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should pass the presence prop', async () => {
      expect.assertions(1);

      const presence = PresenceType.Away;

      const container = await mountAndWait(<Avatar initials="CW" presence={presence} />);
      const element = container.find('svg').getDOMNode();

      expect(element).toBeDefined();
    });

    it('should pass the src & alt props', () => {
      expect.assertions(2);

      const src = 'src';
      const alt = 'alt';

      const element = mount(<Avatar initials="CW" src={src} alt={alt} />)
        .find('img')
        .getDOMNode();

      expect(element.getAttribute('src')).toBe(`${src}`);
      expect(element.getAttribute('alt')).toBe(`${alt}`);
    });

    it('should pass the initials prop', () => {
      expect.assertions(1);

      const initials = 'CW';

      const element = mount(<Avatar initials={initials} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the title prop', () => {
      expect.assertions(1);

      const title = 'Cisco Webex';
      const initials = 'CW';

      const element = mount(<Avatar title={title} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the color prop', () => {
      expect.assertions(1);

      const color = AVATAR_COLORS.cyan as AvatarColor;

      const element = mount(<Avatar initials="CW" color={color} />)
        .find(`div.${STYLE.wrapper}`)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(`${color}`);
    });

    it('should pass the type prop', () => {
      expect.assertions(2);

      // space type only generates 1 initial
      const type = 'space';
      const initials = 'C';

      const element = mount(<Avatar title="Cisco Webex" type={type} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent.length).toBe(MAX_INITIALS_SPACE);
      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the icon prop', async () => {
      expect.assertions(1);

      // space type only generates 1 initial
      const icon = 'check';

      const container = await mountAndWait(<Avatar title="Cisco Webex" icon={icon} />);
      const element = container.find('svg').getDOMNode();

      expect(element).toBeDefined();
    });

    it('should wrap inside button the onPress is provided', async () => {
      expect.assertions(2);

      const onPress = () => {
        return 'hi';
      };

      const ref = createRef<HTMLButtonElement>();

      const container = await mountAndWait(
        <Avatar ref={ref} onPress={onPress} title="Cisco Webex" />
      );
      const element = container.find('button').getDOMNode();

      expect(element).toBeDefined();

      expect(ref.current).toEqual(element);
    });

    it('should pass warning icon when failureBadge is provided', async () => {
      expect.assertions(1);

      const failureBadge = true;

      const container = await mountAndWait(
        <Avatar failureBadge={failureBadge} title="Cisco Webex" />
      );

      const element = container.find('svg[data-test="warning"]').getDOMNode();
      expect(element).toBeDefined();
    });

    it('should render Loading when isTyping is provided', async () => {
      expect.assertions(1);

      const isTyping = true;

      const container = await mountAndWait(<Avatar isTyping={isTyping} title="Cisco Webex" />);
      const element = container.find('.md-loading');
      expect(element).toBeDefined();
    });

    it('should match snapshot with hideDefaultTooltip', async () => {
      expect.assertions(1);

      const hideDefaultTooltip = true;

      const container = await mountAndWait(
        <Avatar hideDefaultTooltip={hideDefaultTooltip} title="Cisco Webex" />
      );

      const title = container.getDOMNode().getAttribute('title');

      expect(title).toBe('');
    });
  });
});
