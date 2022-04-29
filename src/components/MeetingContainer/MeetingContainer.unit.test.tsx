import React from 'react';
import { mount } from 'enzyme';
import Tag from '../Tag';
import ButtonPill from '../ButtonPill';
import Text, { TEXT_CONSTANTS } from '../Text';
import Avatar from '../Avatar';
import ButtonCircle from '../ButtonCircle';
import ButtonHyperlink from '../ButtonHyperlink';
import { BUTTON_SIMPLE_CONSTANTS } from '../ButtonSimple';
import { CARD_CONSTANTS } from '../Card';

import MeetingContainer, { MEETING_CONTAINER_CONSTANTS as CONSTANTS } from './';

const testProps = {
  meetingTitle: 'TestMeeting',
  scheduleInfoFirst: '10:00am-11:00am',
  scheduleInfoFirstColor: undefined,
  scheduleInfoSecond: 'Mon, Jan 1, 2023',
  scheduleInfoSecondColor: undefined,
};
const tags = [<Tag key={0}>Messages</Tag>, <Tag key={1}>Recording</Tag>];

const pillButtons = [
  <ButtonPill key={0} outline ghost={true} color="join" size={28}>
    <Text>Message</Text>
  </ButtonPill>,
  <ButtonPill key={1} color="join" size={28}>
    <Text>Join</Text>
  </ButtonPill>,
];

const spaceLink = <ButtonHyperlink>Example Link</ButtonHyperlink>;

const avatar = <Avatar>BR</Avatar>;

const scheduleInfo = '10:00am-11:00am';

const meetingTitle = 'Test Meeting Title';

const children = 'Test Child';

const circleButtons = [
  <ButtonCircle key={0} outline ghost={true} color="join" size={28}>
    T
  </ButtonCircle>,
  <ButtonCircle key={1} outline ghost={true} color="join" size={28}>
    T
  </ButtonCircle>,
  <ButtonCircle key={2} outline ghost={true} color="join" size={28}>
    T
  </ButtonCircle>,
];

describe('<MeetingContainer />', () => {
  let container;
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<MeetingContainer className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<MeetingContainer id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<MeetingContainer style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tags supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer tags={tags} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with avatar supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer avatar={avatar} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer children={children} />);

      expect(container).toMatchSnapshot();
    });

    /* match with each scheduleInfo prop set */
    it('should match snapshot with scheduleInfoFirst supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer scheduleInfoFirst={scheduleInfo} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scheduleInfoSecond supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer scheduleInfoSecond={scheduleInfo} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scheduleInfoFirstColor supplied', () => {
      expect.assertions(1);

      container = mount(
        <MeetingContainer
          scheduleInfoFirst={scheduleInfo}
          scheduleInfoFirstColor={CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scheduleInfoSecondColor supplied', () => {
      expect.assertions(1);

      container = mount(
        <MeetingContainer
          scheduleInfoSecond={scheduleInfo}
          scheduleInfoSecondColor={CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disable supplied', () => {
      expect.assertions(1);

      container = mount(
        <MeetingContainer
          disabled={true}
          meetingTitle={meetingTitle}
          tags={tags}
          actionButtons={pillButtons}
          spaceLink={spaceLink}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with spacelink supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer spaceLink={spaceLink} {...testProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with pill action buttons supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer actionButtons={pillButtons} {...testProps} />);

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot with circle action buttons supplied', () => {
      expect.assertions(1);

      container = mount(<MeetingContainer actionButtons={circleButtons} {...testProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  /* ...additional snapshot tests... */
});

describe('attributes', () => {
  it('should have its wrapper class', () => {
    expect.assertions(1);

    const element = mount(<MeetingContainer />)
      .find(MeetingContainer)
      .getDOMNode();

    expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
  });

  it('should have provided class when className is provided', () => {
    expect.assertions(1);

    const className = 'example-class';

    const element = mount(<MeetingContainer className={className} />)
      .find(MeetingContainer)
      .getDOMNode();

    expect(element.classList.contains(className)).toBe(true);
  });

  it('should have provided id when id is provided', () => {
    expect.assertions(1);

    const id = 'example-id';

    const element = mount(<MeetingContainer id={id} />)
      .find(MeetingContainer)
      .getDOMNode();

    expect(element.id).toBe(id);
  });

  it('should have provided style when style is provided', () => {
    expect.assertions(1);

    const style = { color: 'pink' };
    const styleString = 'color: pink;';

    const element = mount(<MeetingContainer style={style} />)
      .find(MeetingContainer)
      .getDOMNode();

    expect(element.getAttribute('style')).toBe(styleString);
  });

  it('should have meetingTitle when meetingTitle is provided', () => {
    const element = mount(<MeetingContainer meetingTitle={meetingTitle} />)
      .find(Text)
      .at(0)
      .getDOMNode();

    expect(element.innerHTML).toBe(meetingTitle);
  });

  it('should extend ButtonSimple', () => {
    const element = mount(<MeetingContainer meetingTitle={meetingTitle} />)
      .find(MeetingContainer)
      .getDOMNode();

    expect(element.classList.contains(BUTTON_SIMPLE_CONSTANTS.STYLE.wrapper));
  });

  it('should extend Card', () => {
    const element = mount(<MeetingContainer meetingTitle={meetingTitle} />)
      .find(MeetingContainer)
      .getDOMNode();

    expect(element.classList.contains(CARD_CONSTANTS.STYLE.wrapper));
  });

  it('should have tags when they are provided', () => {
    const element = mount(<MeetingContainer tags={tags} meetingTitle={meetingTitle} />)
      .find(Tag)
      .exists();

    expect(element).toBe(true);
  });

  it('should set data-anchor when tags are provided', () => {
    const element = mount(
      <MeetingContainer tags={tags} actionButtons={pillButtons} meetingTitle={meetingTitle} />
    )
      .find(`div.${CONSTANTS.STYLE.actions}`)
      .getDOMNode();

    expect(element.getAttribute('data-anchor')).toBe(CONSTANTS.ANCHORS.TOP);
  });

  it('tags should mutate when isDisabled is true', () => {
    const element = mount(
      <MeetingContainer
        isDisabled={true}
        tags={tags}
        actionButtons={pillButtons}
        meetingTitle="Meeting"
      />
    )
      .find(Tag)
      .first()
      .props().isDisabled;

    expect(element).toBe(true);
  });

  it('should have tags when they are provided', () => {
    const element = mount(
      <MeetingContainer actionButtons={pillButtons} meetingTitle={meetingTitle} />
    )
      .find(ButtonPill)
      .exists();

    expect(element).toBe(true);
  });

  it('actionButtons should mutate when isDisabled is true', () => {
    const element = mount(
      <MeetingContainer
        isDisabled={true}
        tags={tags}
        actionButtons={pillButtons}
        meetingTitle="Meeting"
      />
    )
      .find(ButtonPill)
      .first()
      .props().disabled;

    expect(element).toBe(true);
  });

  it('should have tags when they are provided', () => {
    const element = mount(<MeetingContainer avatar={avatar} meetingTitle={meetingTitle} />)
      .find(Avatar)
      .exists();

    expect(element).toBe(true);
  });

  it('should have scheduleInfoFirst field when it is provided', () => {
    const element = mount(
      <MeetingContainer meetingTitle="Meeting" scheduleInfoFirst={scheduleInfo} />
    )
      .find(Text)
      .at(1)
      .getDOMNode();

    expect(element.innerHTML).toBe(scheduleInfo);
  });

  it('should have scheduleInfoFirst field when it is provided', () => {
    const element = mount(
      <MeetingContainer meetingTitle="Meeting" scheduleInfoSecond={scheduleInfo} />
    )
      .find(Text)
      .at(2)
      .getDOMNode();

    expect(element.innerHTML).toBe(scheduleInfo);
  });

  it('should apply scheduleInfoFirstColor', () => {
    const element = mount(
      <MeetingContainer
        meetingTitle={meetingTitle}
        scheduleInfoFirst={scheduleInfo}
        scheduleInfoFirstColor={CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS}
      />
    )
      .find(Text)
      .at(1)
      .getDOMNode();

    expect(element.getAttribute('data-color')).toBe(CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS);
  });

  it('should not apply scheduleInfoFirstColor when disabled', () => {
    const element = mount(
      <MeetingContainer
        meetingTitle={meetingTitle}
        isDisabled={true}
        scheduleInfoFirst={scheduleInfo}
        scheduleInfoFirstColor={CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS}
      />
    )
      .find(Text)
      .at(1)
      .getDOMNode();

    expect(element.getAttribute('data-color')).toBe(CONSTANTS.DEFAULTS.SCHEDULE_INFO_COLOR);
  });

  it('should apply scheduleInfoSecondColor when provided', () => {
    const element = mount(
      <MeetingContainer
        meetingTitle={meetingTitle}
        scheduleInfoFirst={scheduleInfo}
        scheduleInfoFirstColor={CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS}
      />
    )
      .find(Text)
      .at(1)
      .getDOMNode();

    expect(element.getAttribute('data-color')).toBe(CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS);
  });

  it('should not apply scheduleInfoSecondColor when disabled', () => {
    const element = mount(
      <MeetingContainer
        meetingTitle={meetingTitle}
        isDisabled={true}
        scheduleInfoSecond={scheduleInfo}
        scheduleInfoSecondColor={CONSTANTS.SCHEDULE_INFO_COLORS.SUCCESS}
      />
    )
      .find(Text)
      .at(1)
      .getDOMNode();

    expect(element.getAttribute('data-color')).toBe(CONSTANTS.DEFAULTS.SCHEDULE_INFO_COLOR);
  });

  it('should have children when they are provided', () => {
    const element = mount(<MeetingContainer children={meetingTitle} />)
      .find(Text)
      .at(0)
      .getDOMNode();

    expect(element.innerHTML).toBe(meetingTitle);
  });

  it('should use meetingTitle if provided with children', () => {
    const element = mount(<MeetingContainer meetingTitle={meetingTitle} children={children} />)
      .find(Text)
      .at(0)
      .getDOMNode();

    expect(element.innerHTML).toBe(meetingTitle);
  });

  it('should have spaceLink when provided', () => {
    const element = mount(<MeetingContainer spaceLink={spaceLink} meetingTitle={meetingTitle} />)
      .find(ButtonHyperlink)
      .exists();

    expect(element).toBe(true);
  });

  it('should have spaceLink when provided', () => {
    const element = mount(
      <MeetingContainer isDisabled={true} spaceLink={spaceLink} meetingTitle={meetingTitle} />
    )
      .find(ButtonHyperlink)
      .props().disabled;

    expect(element).toBe(true);
  });
  it('should use titleType when provided', () => {
    const element = mount(
      <MeetingContainer meetingTitle={meetingTitle} titleType={TEXT_CONSTANTS.TYPES.TITLE} />
    )
      .find(Text)
      .at(0)
      .getDOMNode();

    expect(element.getAttribute('data-type')).toBe(TEXT_CONSTANTS.TYPES.TITLE);
  });
  /* ...additional attribute tests... */

  describe('actions', () => {
    /* ...action tests... */
  });
});
