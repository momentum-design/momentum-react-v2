import Avatar from '.';
import { mount } from 'enzyme';
import React, { createRef } from 'react';
import { MAX_INITIALS_SPACE, SIZES, STYLE, AVATAR_COLORS } from './Avatar.constants';
import { AvatarColor, AvatarSize, PresenceType } from './Avatar.types';
import { mountAndWait } from '../../../test/utils';

describe('Avatar', () => {
  const sampleProps = {
    type: 'person',
    title: 'Name',
    mainLabel: 'Avatar of Name',
    presenceLabel: 'Active',
    presence: PresenceType.Active,
    src: 'src',
    icon: 'Accessibility',
    typingLabel: 'is typing',
  };

  const checkAvatarAccessibility = ({
    withOnPress,
    withPresence,
    isPerson,
    avatarType,
    isTyping,
    expectedRole,
    expectedLabel,
  }) => {
    const onPress = withOnPress
      ? () => {
          return 'hi';
        }
      : null;

    const mockAvatar = mount(
      <Avatar
        mainLabel={sampleProps.mainLabel}
        type={isPerson ? 'person' : 'space'}
        title={sampleProps.title}
        onPress={onPress}
        icon={avatarType === 'icon' ? sampleProps.icon : ''}
        src={avatarType === 'src' ? sampleProps.src : ''}
        presence={withPresence ? sampleProps.presence : null}
        presenceLabel={withPresence ? sampleProps.presenceLabel : ''}
        isTyping={isTyping}
        typingLabel={sampleProps.typingLabel}
      />
    );

    expect.assertions(2);

    const container = mockAvatar.find('.md-avatar-wrapper');
    expect(container.props().role).toEqual(expectedRole);

    if (withOnPress) {
      const button = mockAvatar.find('button');
      expect(button.props()['aria-label']).toEqual(expectedLabel);
    } else {
      expect(container.props()['aria-label']).toEqual(expectedLabel);
    }
  };

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

    it('should match snapshot with presence and presenceLabel', async () => {
      expect.assertions(1);

      const avatars = Object.values(PresenceType).map((presence, index) => {
        return (
          <Avatar key={index} title="Cisco Webex" presence={presence} presenceLabel={presence} />
        );
      });

      const container = await mountAndWait(<div>{avatars}</div>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with src & title', () => {
      expect.assertions(1);

      const container = mount(<Avatar src={'src'} title={'title'} />);

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

    it('should match snapshot with iconOnHover', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Avatar iconOnHover="check" />);

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

    it('should match snapshot with mainLabel', async () => {
      expect.assertions(1);

      const mainLabel = 'mainLabel';

      const container = await mountAndWait(<Avatar mainLabel={mainLabel} onPress={jest.fn()} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-label', async () => {
      expect.assertions(1);

      const ariaLabel = 'ariaLabel';

      const container = await mountAndWait(<Avatar aria-label={ariaLabel} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isTyping and typingLabel', async () => {
      expect.assertions(1);

      const isTyping = true;
      const typingLabel = 'isTyping';

      const container = await mountAndWait(
        <Avatar isTyping={isTyping} typingLabel={typingLabel} title="Cisco Webex" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with buttonClassName', async () => {
      expect.assertions(1);

      const buttonClassName = 'button classname test';

      const container = await mountAndWait(<Avatar buttonClassName={buttonClassName} />);

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

    it('should pass the aria-label prop', () => {
      expect.assertions(1);

      const ariaLabel = 'aria-label';

      const element = mount(<Avatar aria-label={ariaLabel} />).find('.md-avatar-wrapper');

      expect(element.props()['aria-label']).toBe(`${ariaLabel}`);
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

    it('should pass the iconOnHover prop', async () => {
      expect.assertions(1);

      // space type only generates 1 initial
      const iconOnHover = 'check';

      const container = await mountAndWait(
        <Avatar title="Cisco Webex" iconOnHover={iconOnHover} />
      );
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

    it('should pass the mainLabel prop', () => {
      expect.assertions(1);

      const mainLabel = 'avatar of Bob';
      const onPress = () => 'h1';

      const element = mount(<Avatar mainLabel={mainLabel} onPress={onPress} />).find('button');

      expect(element.props()['aria-label']).toEqual(mainLabel);
    });

    it('should pass the typingLabel prop', () => {
      expect.assertions(1);

      const typingLabel = 'typing';

      const element = mount(<Avatar isTyping={true} typingLabel={typingLabel} />).find(
        '.md-avatar-wrapper'
      );

      expect(element.props()['aria-label']).toEqual(typingLabel);
    });

    it('should pass the extraLabel prop', () => {
      expect.assertions(1);

      const extraLabel = 'extraLabel';

      const element = mount(<Avatar isTyping={true} extraLabel={extraLabel} />).find(
        '.md-avatar-wrapper'
      );

      expect(element.props()['aria-label']).toEqual(extraLabel);
    });

    it('aria-label has a higher priority', () => {
      expect.assertions(1);

      const ariaLabel = 'aria-label';
      const mainLabel = 'mainLabel';

      const element = mount(<Avatar aria-label={ariaLabel} mainLabel={mainLabel} />).find(
        '.md-avatar-wrapper'
      );

      expect(element.props()['aria-label']).toBe(ariaLabel);
    });

    it('when aria-label is not a valid value, it is not used', () => {
      expect.assertions(1);

      const ariaLabel = '';
      const mainLabel = 'mainLabel';

      const element = mount(<Avatar aria-label={ariaLabel} mainLabel={mainLabel} />).find(
        '.md-avatar-wrapper'
      );

      expect(element.props()['aria-label']).toBe(mainLabel);
    });

    it.each`
      withOnPress | withPresence | isPerson | avatarType | isTyping | expectedRole | expectedLabel
      ${true}     | ${true}      | ${true}  | ${'src'}   | ${true}  | ${undefined} | ${'Avatar of Name, Active, is typing'}
      ${true}     | ${true}      | ${false} | ${'src'}   | ${true}  | ${undefined} | ${'Avatar of Name, Active, is typing'}
      ${true}     | ${true}      | ${true}  | ${'icon'}  | ${true}  | ${undefined} | ${'Avatar of Name, Active, is typing'}
      ${true}     | ${true}      | ${false} | ${'icon'}  | ${true}  | ${undefined} | ${'Avatar of Name, Active, is typing'}
      ${true}     | ${true}      | ${true}  | ${null}    | ${true}  | ${undefined} | ${'Avatar of Name, Active, is typing'}
      ${true}     | ${true}      | ${false} | ${null}    | ${true}  | ${undefined} | ${'Avatar of Name, Active, is typing'}
      ${true}     | ${false}     | ${true}  | ${'src'}   | ${true}  | ${undefined} | ${'Avatar of Name, is typing'}
      ${true}     | ${false}     | ${false} | ${'src'}   | ${true}  | ${undefined} | ${'Avatar of Name, is typing'}
      ${true}     | ${false}     | ${true}  | ${'icon'}  | ${true}  | ${undefined} | ${'Avatar of Name, is typing'}
      ${true}     | ${false}     | ${false} | ${'icon'}  | ${true}  | ${undefined} | ${'Avatar of Name, is typing'}
      ${true}     | ${false}     | ${true}  | ${null}    | ${true}  | ${undefined} | ${'Avatar of Name, is typing'}
      ${true}     | ${false}     | ${false} | ${null}    | ${true}  | ${undefined} | ${'Avatar of Name, is typing'}
      ${false}    | ${true}      | ${true}  | ${'src'}   | ${true}  | ${'img'}     | ${'Avatar of Name, Active, is typing'}
      ${false}    | ${true}      | ${false} | ${'src'}   | ${true}  | ${'img'}     | ${'Avatar of Name, Active, is typing'}
      ${false}    | ${true}      | ${true}  | ${'icon'}  | ${true}  | ${'img'}     | ${'Avatar of Name, Active, is typing'}
      ${false}    | ${true}      | ${false} | ${'icon'}  | ${true}  | ${'img'}     | ${'Avatar of Name, Active, is typing'}
      ${false}    | ${true}      | ${true}  | ${null}    | ${true}  | ${'img'}     | ${'Avatar of Name, Active, is typing'}
      ${false}    | ${true}      | ${false} | ${null}    | ${true}  | ${'img'}     | ${'Avatar of Name, Active, is typing'}
      ${false}    | ${false}     | ${true}  | ${'src'}   | ${true}  | ${'img'}     | ${'Avatar of Name, is typing'}
      ${false}    | ${false}     | ${false} | ${'src'}   | ${true}  | ${'img'}     | ${'Avatar of Name, is typing'}
      ${false}    | ${false}     | ${true}  | ${'icon'}  | ${true}  | ${'img'}     | ${'Avatar of Name, is typing'}
      ${false}    | ${false}     | ${false} | ${'icon'}  | ${true}  | ${'img'}     | ${'Avatar of Name, is typing'}
      ${false}    | ${false}     | ${true}  | ${null}    | ${true}  | ${'img'}     | ${'Avatar of Name, is typing'}
      ${false}    | ${false}     | ${false} | ${null}    | ${true}  | ${'img'}     | ${'Avatar of Name, is typing'}
      ${true}     | ${true}      | ${true}  | ${'src'}   | ${false} | ${undefined} | ${'Avatar of Name, Active'}
      ${true}     | ${true}      | ${false} | ${'src'}   | ${false} | ${undefined} | ${'Avatar of Name, Active'}
      ${true}     | ${true}      | ${true}  | ${'icon'}  | ${false} | ${undefined} | ${'Avatar of Name, Active'}
      ${true}     | ${true}      | ${false} | ${'icon'}  | ${false} | ${undefined} | ${'Avatar of Name, Active'}
      ${true}     | ${true}      | ${true}  | ${null}    | ${false} | ${undefined} | ${'Avatar of Name, Active'}
      ${true}     | ${true}      | ${false} | ${null}    | ${false} | ${undefined} | ${'Avatar of Name, Active'}
      ${true}     | ${false}     | ${true}  | ${'src'}   | ${false} | ${undefined} | ${'Avatar of Name'}
      ${true}     | ${false}     | ${false} | ${'src'}   | ${false} | ${undefined} | ${'Avatar of Name'}
      ${true}     | ${false}     | ${true}  | ${'icon'}  | ${false} | ${undefined} | ${'Avatar of Name'}
      ${true}     | ${false}     | ${false} | ${'icon'}  | ${false} | ${undefined} | ${'Avatar of Name'}
      ${true}     | ${false}     | ${true}  | ${null}    | ${false} | ${undefined} | ${'Avatar of Name'}
      ${true}     | ${false}     | ${false} | ${null}    | ${false} | ${undefined} | ${'Avatar of Name'}
      ${false}    | ${true}      | ${true}  | ${'src'}   | ${false} | ${'img'}     | ${'Avatar of Name, Active'}
      ${false}    | ${true}      | ${false} | ${'src'}   | ${false} | ${'img'}     | ${'Avatar of Name, Active'}
      ${false}    | ${true}      | ${true}  | ${'icon'}  | ${false} | ${'img'}     | ${'Avatar of Name, Active'}
      ${false}    | ${true}      | ${false} | ${'icon'}  | ${false} | ${'img'}     | ${'Avatar of Name, Active'}
      ${false}    | ${true}      | ${true}  | ${null}    | ${false} | ${'img'}     | ${'Avatar of Name, Active'}
      ${false}    | ${true}      | ${false} | ${null}    | ${false} | ${'img'}     | ${'Avatar of Name, Active'}
      ${false}    | ${false}     | ${true}  | ${'src'}   | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${false} | ${'src'}   | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${true}  | ${'icon'}  | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${false} | ${'icon'}  | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${true}  | ${null}    | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${false} | ${'src'}   | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${true}  | ${'icon'}  | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${false} | ${'icon'}  | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${true}  | ${null}    | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${true}  | ${null}    | ${false} | ${'img'}     | ${'Avatar of Name'}
      ${false}    | ${false}     | ${false} | ${null}    | ${false} | ${'img'}     | ${'Avatar of Name'}
    `(
      `Test accessibility of Avatar when onPress is passed ? $withOnPress, presence is passed ? $withPresence, is person ? $isPerson,
      avatar is $avatarType type, is typing ? $isTyping,containerRole should be $expectedRole , contaierLabel should be $expectedLabel`,
      ({
        withOnPress,
        withPresence,
        isPerson,
        avatarType,
        isTyping,
        expectedRole,
        expectedLabel,
      }) => {
        checkAvatarAccessibility({
          withOnPress,
          withPresence,
          isPerson,
          avatarType,
          isTyping,
          expectedRole,
          expectedLabel,
        });
      }
    );
  });
});
