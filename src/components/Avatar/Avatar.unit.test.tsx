import Avatar from '.';
import { mount } from 'enzyme';
import React, { createRef } from 'react';
import { MAX_INITIALS_SPACE, SIZES, STYLE, AVATAR_COLORS } from './Avatar.constants';
import { AvatarColor, AvatarSize, PresenceType } from './Avatar.types';
import { mountAndWait } from '../../../test/utils';
import Icon from '../Icon';

describe('Avatar', () => {

  const sampleProps = {
    type: 'person',
    title: 'Name',
    pictureLabel: 'Picture for',
    actionLabel: 'Open card of',
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
    expectedLabel,
  }) => {
    const onPress = withOnPress
      ? () => {
        return 'hi';
      }
      : null;
  
    const mockAvatar = mount(
      <Avatar
        actionLabel={withOnPress ? sampleProps.actionLabel : ''}
        pictureLabel={withOnPress ? '' : sampleProps.pictureLabel}
        type={isPerson ? 'person' : 'space'}
        title={sampleProps.title}
        onPress={onPress}
        icon={avatarType === 'icon' ? sampleProps.icon : ''}
        src={avatarType === 'src' ? sampleProps.src : ''}
        presence={withPresence ? sampleProps.presence : null}
        presenceLabel={withPresence ? sampleProps.presenceLabel : ''}
        isTyping={isTyping}
        typingLabel={sampleProps.typingLabel}
      />,
    );
  
    let assertCount = 2;

    if (withPresence) {
      assertCount += 1;
    }

    expect.assertions(assertCount);
  
    const wrapper = mockAvatar.find('.md-avatar-wrapper');
    expect(wrapper.props().title).toEqual(sampleProps.title);
  
    if (withOnPress) {
      const button = mockAvatar.find('button');
      expect(button.props()['aria-label']).toEqual(expectedLabel);
    } else {
      const container = mockAvatar.find('.md-avatar-wrapper');
      expect(container.props()['aria-label']).toEqual(expectedLabel);
    }

    if (withPresence) {
      const status = mockAvatar.find(Icon).at(avatarType === 'icon' ? 1 : 0);
      expect(status.props().ariaLabel).toEqual(sampleProps.presenceLabel);
    }
  };
  

  describe('snapshot', () => {

    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Avatar  title="Cisco Webex" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with initials', () => {
      expect.assertions(1);

      const container = mount(<Avatar  initials="CW" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const container = mount(<Avatar  title="CW" size={size} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with presence and presenceLabel', async () => {
      expect.assertions(1);

      const avatars = Object.values(PresenceType).map((presence, index) => {
        return <Avatar  key={index} title="Cisco Webex" presence={presence} presenceLabel={presence}/>;
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

      const container = mount(<Avatar  title="Cisco Webex" type="space" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Avatar  icon="check" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with iconOnHover', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Avatar  iconOnHover="check" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with onPress', async () => {
      expect.assertions(1);

      const onPress = () => {
        return 'hi';
      };

      const container = await mountAndWait(<Avatar  onPress={onPress} title="Cisco Webex" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with failureBadge', async () => {
      expect.assertions(1);

      const failureBadge = true;

      const container = await mountAndWait(
        <Avatar  failureBadge={failureBadge} title="Cisco Webex" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with actionLabel', async () => {
      expect.assertions(1);

      const actionLabel = 'Action';

      const container = await mountAndWait(
        <Avatar actionLabel={actionLabel} onPress={jest.fn()} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with pictureLabel', async () => {
      expect.assertions(1);

      const pictureLabel = 'Picture';

      const container = await mountAndWait(
        // eslint-disable-next-line no-console
        <Avatar  pictureLabel={pictureLabel}/>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-label', async () => {
      expect.assertions(1);

      const ariaLabel = 'ariaLabel';

      const container = await mountAndWait(
        // eslint-disable-next-line no-console
        <Avatar  aria-label={ariaLabel}/>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isTyping and typingLabel', async () => {
      expect.assertions(1);

      const isTyping = true;
      const typingLabel = 'isTyping';

      const container = await mountAndWait(<Avatar  isTyping={isTyping} typingLabel={typingLabel} title="Cisco Webex" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with hideDefaultTooltip', async () => {
      expect.assertions(1);

      const hideDefaultTooltip = true;

      const container = await mountAndWait(
        <Avatar  hideDefaultTooltip={hideDefaultTooltip} title="Cisco Webex" />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<Avatar  initials="CW" />)
        .find(Avatar)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass the size prop', () => {
      expect.assertions(1);

      const size = SIZES[2] as AvatarSize;

      const element = mount(<Avatar  initials="CW" size={size} />)
        .find(`div.${STYLE.wrapper}`)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should pass the presence prop', async () => {
      expect.assertions(1);

      const presence = PresenceType.Away;

      const container = await mountAndWait(<Avatar  initials="CW" presence={presence} />);
      const element = container.find('svg').getDOMNode();

      expect(element).toBeDefined();
    });

    it('should pass the initials prop', () => {
      expect.assertions(1);

      const initials = 'CW';

      const element = mount(<Avatar  initials={initials} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the title prop', () => {
      expect.assertions(1);

      const title = 'Cisco Webex';
      const initials = 'CW';

      const element = mount(<Avatar  title={title} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the aria-label prop', () => {
      expect.assertions(1);

      const ariaLabel = 'aria-label';

      const element = mount(<Avatar  aria-label={ariaLabel} />)
        .find('.md-avatar-wrapper');

      expect(element.props()['aria-label']).toBe(`${ariaLabel}`);
    });

    it('should pass the color prop', () => {
      expect.assertions(1);

      const color = AVATAR_COLORS.cyan as AvatarColor;

      const element = mount(<Avatar  initials="CW" color={color} />)
        .find(`div.${STYLE.wrapper}`)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(`${color}`);
    });

    it('should pass the type prop', () => {
      expect.assertions(2);

      // space type only generates 1 initial
      const type = 'space';
      const initials = 'C';

      const element = mount(<Avatar  title="Cisco Webex" type={type} />)
        .find('span')
        .getDOMNode();

      expect(element.textContent.length).toBe(MAX_INITIALS_SPACE);
      expect(element.textContent).toBe(`${initials}`);
    });

    it('should pass the icon prop', async () => {
      expect.assertions(1);

      // space type only generates 1 initial
      const icon = 'check';

      const container = await mountAndWait(<Avatar  title="Cisco Webex" icon={icon} />);
      const element = container.find('svg').getDOMNode();

      expect(element).toBeDefined();
    });


    it('should pass the iconOnHover prop', async () => {
      expect.assertions(1);

      // space type only generates 1 initial
      const iconOnHover = 'check';

      const container = await mountAndWait(<Avatar  title="Cisco Webex" iconOnHover={iconOnHover} />);
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
        <Avatar  failureBadge={failureBadge} title="Cisco Webex" />
      );

      const element = container.find('svg[data-test="warning"]').getDOMNode();
      expect(element).toBeDefined();
    });

    it('should render Loading when isTyping is provided', async () => {
      expect.assertions(1);

      const isTyping = true;

      const container = await mountAndWait(<Avatar  isTyping={isTyping} title="Cisco Webex" />);
      const element = container.find('.md-loading');
      expect(element).toBeDefined();
    });

    it('should match snapshot with hideDefaultTooltip', async () => {
      expect.assertions(1);

      const hideDefaultTooltip = true;

      const container = await mountAndWait(
        <Avatar  hideDefaultTooltip={hideDefaultTooltip} title="Cisco Webex" />
      );

      const title = container.getDOMNode().getAttribute('title');

      expect(title).toBe('');
    });

    it('container has the default role - group', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <Avatar title="Cisco Webex" />
      );

      const title = container.getDOMNode().getAttribute('role');

      expect(title).toBe('group');
    });

    it('should pass the actionLabel prop', () => {
      expect.assertions(1);

      const actionLabel = 'Open card of';
      const onPress = () => {
        return 'hi';
      };

      const element = mount(<Avatar  onPress={onPress} actionLabel={actionLabel} />)
        .find('button');

      expect(element.props()['aria-label']).toEqual(actionLabel);
    });

    it('should pass the pictureLabel prop', () => {
      expect.assertions(1);

      const pictureLabel = 'Picture for';

      const element = mount(<Avatar  pictureLabel={pictureLabel} />)
        .find('.md-avatar-wrapper');

      expect(element.props()['aria-label']).toEqual(pictureLabel);
    });

    it('should pass the typingLabel prop', () => {
      expect.assertions(1);

      const typingLabel = 'typing';

      const element = mount(<Avatar isTyping={true} typingLabel={typingLabel} />)
        .find('.md-avatar-wrapper');

      expect(element.props()['aria-label']).toEqual(typingLabel);
    });

    it('should pass the extraLabel prop', () => {
      expect.assertions(1);

      const extraLabel = 'extraLabel';

      const element = mount(<Avatar isTyping={true} extraLabel={extraLabel} />)
        .find('.md-avatar-wrapper');

      expect(element.props()['aria-label']).toEqual(extraLabel);
    });

    it('aria-label has a higher priority', () => {
      expect.assertions(1);

      const ariaLabel = 'aria-label';
      const pictureLabel = 'pictureLabel';

      const element = mount(<Avatar  aria-label={ariaLabel} pictureLabel={pictureLabel} />)
        .find('.md-avatar-wrapper');

      expect(element.props()['aria-label']).toBe(ariaLabel);
    });

    it('when aria-label is not a valid value, it is not used', () => {
      expect.assertions(1);

      const ariaLabel = '';
      const pictureLabel = 'pictureLabel';

      const element = mount(<Avatar  aria-label={ariaLabel} pictureLabel={pictureLabel} />)
        .find('.md-avatar-wrapper');

      expect(element.props()['aria-label']).toBe(pictureLabel);
    });

      it.each`
      withOnPress | withPresence  | isPerson    | avatarType   | isTyping  | expectedLabel
      ${true}     | ${true}       | ${true}     | ${'src'}     | ${true}   | ${'Open card of Name, Active, is typing'}
      ${true}     | ${true}       | ${false}    | ${'src'}     | ${true}   | ${'Open card of Name, Active, is typing'}
      ${true}     | ${true}       | ${true}     | ${'icon'}    | ${true}   | ${'Open card of Name, Active, is typing'}
      ${true}     | ${true}       | ${false}    | ${'icon'}    | ${true}   | ${'Open card of Name, Active, is typing'}
      ${true}     | ${true}       | ${true}     | ${null}      | ${true}   | ${'Open card of Name, Active, is typing'}
      ${true}     | ${true}       | ${false}    | ${null}      | ${true}   | ${'Open card of Name, Active, is typing'}
      ${true}     | ${false}      | ${true}     | ${'src'}     | ${true}   | ${'Open card of Name, is typing'}
      ${true}     | ${false}      | ${false}    | ${'src'}     | ${true}   | ${'Open card of Name, is typing'}
      ${true}     | ${false}      | ${true}     | ${'icon'}    | ${true}   | ${'Open card of Name, is typing'}
      ${true}     | ${false}      | ${false}    | ${'icon'}    | ${true}   | ${'Open card of Name, is typing'}
      ${true}     | ${false}      | ${true}     | ${null}      | ${true}   | ${'Open card of Name, is typing'}
      ${true}     | ${false}      | ${false}    | ${null}      | ${true}   | ${'Open card of Name, is typing'}
      ${false}    | ${true}       | ${true}     | ${'src'}     | ${true}   | ${'Picture for Name, Active, is typing'}
      ${false}    | ${true}       | ${false}    | ${'src'}     | ${true}   | ${'Picture for Name, Active, is typing'}
      ${false}    | ${true}       | ${true}     | ${'icon'}    | ${true}   | ${'Picture for Name, Active, is typing'}
      ${false}    | ${true}       | ${false}    | ${'icon'}    | ${true}   | ${'Picture for Name, Active, is typing'}
      ${false}    | ${true}       | ${true}     | ${null}      | ${true}   | ${'Picture for Name, Active, is typing'}
      ${false}    | ${true}       | ${false}    | ${null}      | ${true}   | ${'Picture for Name, Active, is typing'}
      ${false}    | ${false}      | ${true}     | ${'src'}     | ${true}   | ${'Picture for Name, is typing'}
      ${false}    | ${false}      | ${false}    | ${'src'}     | ${true}   | ${'Picture for Name, is typing'}
      ${false}    | ${false}      | ${true}     | ${'icon'}    | ${true}   | ${'Picture for Name, is typing'}
      ${false}    | ${false}      | ${false}    | ${'icon'}    | ${true}   | ${'Picture for Name, is typing'}
      ${false}    | ${false}      | ${true}     | ${null}      | ${true}   | ${'Picture for Name, is typing'}
      ${false}    | ${false}      | ${false}    | ${null}      | ${true}   | ${'Picture for Name, is typing'}
      ${true}     | ${true}       | ${true}     | ${'src'}     | ${false}   | ${'Open card of Name, Active'}
      ${true}     | ${true}       | ${false}    | ${'src'}     | ${false}   | ${'Open card of Name, Active'}
      ${true}     | ${true}       | ${true}     | ${'icon'}    | ${false}   | ${'Open card of Name, Active'}
      ${true}     | ${true}       | ${false}    | ${'icon'}    | ${false}   | ${'Open card of Name, Active'}
      ${true}     | ${true}       | ${true}     | ${null}      | ${false}   | ${'Open card of Name, Active'}
      ${true}     | ${true}       | ${false}    | ${null}      | ${false}   | ${'Open card of Name, Active'}
      ${true}     | ${false}      | ${true}     | ${'src'}     | ${false}   | ${'Open card of Name'}
      ${true}     | ${false}      | ${false}    | ${'src'}     | ${false}   | ${'Open card of Name'}
      ${true}     | ${false}      | ${true}     | ${'icon'}    | ${false}   | ${'Open card of Name'}
      ${true}     | ${false}      | ${false}    | ${'icon'}    | ${false}   | ${'Open card of Name'}
      ${true}     | ${false}      | ${true}     | ${null}      | ${false}   | ${'Open card of Name'}
      ${true}     | ${false}      | ${false}    | ${null}      | ${false}   | ${'Open card of Name'}
      ${false}    | ${true}       | ${true}     | ${'src'}     | ${false}   | ${'Picture for Name, Active'}
      ${false}    | ${true}       | ${false}    | ${'src'}     | ${false}   | ${'Picture for Name, Active'}
      ${false}    | ${true}       | ${true}     | ${'icon'}    | ${false}   | ${'Picture for Name, Active'}
      ${false}    | ${true}       | ${false}    | ${'icon'}    | ${false}   | ${'Picture for Name, Active'}
      ${false}    | ${true}       | ${true}     | ${null}      | ${false}   | ${'Picture for Name, Active'}
      ${false}    | ${true}       | ${false}    | ${null}      | ${false}   | ${'Picture for Name, Active'}
      ${false}    | ${false}      | ${true}     | ${'src'}     | ${false}   | ${'Picture for Name'}
      ${false}    | ${false}      | ${false}    | ${'src'}     | ${false}   | ${'Picture for Name'}
      ${false}    | ${false}      | ${true}     | ${'icon'}    | ${false}   | ${'Picture for Name'}
      ${false}    | ${false}      | ${false}    | ${'icon'}    | ${false}   | ${'Picture for Name'}
      ${false}    | ${false}      | ${true}     | ${null}      | ${false}   | ${'Picture for Name'}
      ${false}    | ${false}      | ${false}    | ${null}      | ${false}   | ${'Picture for Name'}
    `(
      'Test accessibility of Avatar',
      ({withOnPress, withPresence, isPerson, avatarType, isTyping ,expectedLabel}) => {
        checkAvatarAccessibility({withOnPress,withPresence,isPerson,avatarType,isTyping,expectedLabel});
      }
    );
  });
});
