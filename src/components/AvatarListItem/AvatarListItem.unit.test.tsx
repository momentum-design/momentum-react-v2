import React from 'react';
import { mountAndWait } from '../../../test/utils';
import { PresenceType } from '../Avatar/Avatar.types';
import AvatarListItem, { AVATAR_LIST_ITEM_CONSTANTS as CONSTANTS } from './';
import ButtonCircle from '../ButtonCircle';
import { AvatarListItemActions } from './AvatarListItem.types';

describe('<AvatarListItem />', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<AvatarListItem />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<AvatarListItem className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<AvatarListItem id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<AvatarListItem style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scheduler state = unknown', async () => {
      expect.assertions(1);

      const schedulerState = 'unknown';

      const container = await mountAndWait(<AvatarListItem schedulerState={schedulerState} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scheduler state = unavailable', async () => {
      expect.assertions(1);

      const schedulerState = 'unavailable';

      const container = await mountAndWait(<AvatarListItem schedulerState={schedulerState} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scheduler state = available', async () => {
      expect.assertions(1);

      const schedulerState = 'available';

      const container = await mountAndWait(<AvatarListItem schedulerState={schedulerState} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scheduler state = quiet-hours', async () => {
      expect.assertions(1);

      const schedulerState = 'quiet-hours';

      const container = await mountAndWait(<AvatarListItem schedulerState={schedulerState} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with firstLine', async () => {
      expect.assertions(1);

      const firstLine = 'firstLine';

      const container = await mountAndWait(<AvatarListItem firstLine={firstLine} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with secondLine', async () => {
      expect.assertions(1);

      const secondLine = 'secondLine';

      const container = await mountAndWait(<AvatarListItem secondLine={secondLine} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with displayMuteAction', async () => {
      expect.assertions(1);

      const displayActions = [AvatarListItemActions.mute];

      const container = await mountAndWait(<AvatarListItem displayActions={displayActions} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with displayMuteAction && !isMuted', async () => {
      expect.assertions(1);

      const displayActions = [AvatarListItemActions.mute];
      const isMuted = false;

      const container = await mountAndWait(
        <AvatarListItem displayActions={displayActions} isMuted={isMuted} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with displayMoreAction', async () => {
      expect.assertions(1);

      const displayActions = [AvatarListItemActions.more];

      const container = await mountAndWait(<AvatarListItem displayActions={displayActions} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with avatarProps', async () => {
      expect.assertions(1);

      const avatarProps = {
        title: 'Cisco',
        presence: PresenceType.Active,
      };

      const container = await mountAndWait(<AvatarListItem avatarProps={avatarProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<AvatarListItem />)).find(AvatarListItem).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (await mountAndWait(<AvatarListItem className={className} />))
        .find(AvatarListItem)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = (await mountAndWait(<AvatarListItem id={id} />))
        .find(AvatarListItem)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (await mountAndWait(<AvatarListItem style={style} />))
        .find(AvatarListItem)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided correct icon when state = unknown is provided', async () => {
      expect.assertions(1);

      const schedulerState = 'unknown';

      const element = (await mountAndWait(<AvatarListItem schedulerState={schedulerState} />))
        .find('Icon[name="scheduler-unknown"]')
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided correct icon when schedulerState = unavailable is provided', async () => {
      expect.assertions(1);

      const schedulerState = 'unavailable';

      const element = (await mountAndWait(<AvatarListItem schedulerState={schedulerState} />))
        .find('Icon[name="scheduler-unavailable"]')
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided correct icon when schedulerState = available is provided', async () => {
      expect.assertions(1);

      const schedulerState = 'available';

      const element = (await mountAndWait(<AvatarListItem schedulerState={schedulerState} />))
        .find('Icon[name="scheduler-available"]')
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided correct icon when schedulerState = quiet-hours is provided', async () => {
      expect.assertions(1);

      const schedulerState = 'quiet-hours';

      const element = (await mountAndWait(<AvatarListItem schedulerState={schedulerState} />))
        .find('Icon[name="scheduler-not-working-hours"]')
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should display firstLine when firstLine is provided', async () => {
      expect.assertions(1);

      const firstLine = 'firstLine';

      const element = (await mountAndWait(<AvatarListItem firstLine={firstLine} />))
        .find('Text[type="body-primary"]')
        .getDOMNode();

      expect(element.innerHTML).toBe(firstLine);
    });

    it('should display firstLine when firstLine is provided', async () => {
      expect.assertions(1);

      const firstLine = 'firstLine';
      const secondLine = 'secondLine';

      const element = (
        await mountAndWait(<AvatarListItem firstLine={firstLine} secondLine={secondLine} />)
      )
        .find('Text[type="body-secondary"]')
        .getDOMNode();

      expect(element.innerHTML).toBe(secondLine);
    });

    it('should display correct icon when displayMuteAction && isMuted is provided', async () => {
      expect.assertions(1);

      const displayActions = [AvatarListItemActions.mute];
      const isMuted = true;

      const element = (
        await mountAndWait(<AvatarListItem displayActions={displayActions} isMuted={isMuted} />)
      )
        .find('Icon[name="microphone-muted"]')
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should display correct icon when displayMuteAction && !isMuted is provided', async () => {
      expect.assertions(1);

      const displayActions = [AvatarListItemActions.mute];
      const isMuted = false;

      const element = (
        await mountAndWait(<AvatarListItem displayActions={displayActions} isMuted={isMuted} />)
      )
        .find('Icon[name="audio-microphone-on-green-colored"]')
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should display correct icon when displayMoreAction is provided', async () => {
      expect.assertions(1);

      const displayActions = [AvatarListItemActions.more];

      const element = (await mountAndWait(<AvatarListItem displayActions={displayActions} />))
        .find('Icon[name="more"]')
        .getDOMNode();

      expect(element).toBeDefined();
    });
  });

  describe('actions', () => {
    it('should handle mouse press events when onPressMuteAction is provided', async () => {
      expect.assertions(1);

      const mockOnPressMuteAction = jest.fn();

      const component = (
        await mountAndWait(
          <AvatarListItem
            displayActions={[AvatarListItemActions.mute]}
            onPressMuteAction={mockOnPressMuteAction}
          />
        )
      ).find(ButtonCircle);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        altKey: false,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockOnPressMuteAction).toBeCalledTimes(1);

      jest.restoreAllMocks();
    });
  });
});
