import React from 'react';

import SpaceListItem from './';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import Avatar from '../Avatar';
import Icon from '../Icon';
import { mountAndWait } from '../../../test/utils';
import ListItemBase from '../ListItemBase';

import * as ListContext from '../List/List.utils';
import { STYLE } from './SpaceListItem.constants';

describe('<SpaceListItem />', () => {
  beforeEach(() => {
    jest
      .spyOn(ListContext, 'useListContext')
      .mockImplementation(() => ({ currentFocus: 0, shouldFocusOnPres: false }));
  });

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<SpaceListItem />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<SpaceListItem className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<SpaceListItem id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<SpaceListItem style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with firstLine', async () => {
      expect.assertions(1);

      const firstLine = 'firstLine';

      const container = await mountAndWait(<SpaceListItem firstLine={firstLine} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with secondLine', async () => {
      expect.assertions(1);

      const secondLine = 'secondLine';

      const container = await mountAndWait(<SpaceListItem secondLine={secondLine} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isNewActivity', async () => {
      expect.assertions(1);

      const isNewActivity = true;

      const container = await mountAndWait(<SpaceListItem isNewActivity={isNewActivity} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isUnread', async () => {
      expect.assertions(1);

      const isUnread = true;

      const container = await mountAndWait(<SpaceListItem isUnread={isUnread} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with teamColor', async () => {
      expect.assertions(1);

      const teamColor = TEAM_COLORS.cobalt;

      const container = await mountAndWait(<SpaceListItem teamColor={teamColor as TeamColor} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isMention', async () => {
      expect.assertions(1);

      const isMention = true;

      const container = await mountAndWait(<SpaceListItem isMention={isMention} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isEnterRoom', async () => {
      expect.assertions(1);

      const isEnterRoom = true;

      const container = await mountAndWait(<SpaceListItem isEnterRoom={isEnterRoom} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isAlertMuted', async () => {
      expect.assertions(1);

      const isAlertMuted = true;

      const container = await mountAndWait(<SpaceListItem isAlertMuted={isAlertMuted} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isAlert', async () => {
      expect.assertions(1);

      const isAlert = true;

      const container = await mountAndWait(<SpaceListItem isAlert={isAlert} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isError', async () => {
      expect.assertions(1);

      const isError = true;

      const container = await mountAndWait(<SpaceListItem isError={isError} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with action', async () => {
      expect.assertions(1);

      const action = <p>action</p>;

      const container = await mountAndWait(<SpaceListItem action={action} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected', async () => {
      expect.assertions(1);

      const isSelected = true;

      const container = await mountAndWait(<SpaceListItem isSelected={isSelected} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (await mountAndWait(<SpaceListItem className={className} />))
        .find(SpaceListItem)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = (await mountAndWait(<SpaceListItem id={id} />))
        .find(SpaceListItem)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (await mountAndWait(<SpaceListItem style={style} />))
        .find(SpaceListItem)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided avatar when id is avatar', async () => {
      expect.assertions(1);

      const avatar = <Avatar title="C" />;

      const element = (await mountAndWait(<SpaceListItem avatar={avatar} />))
        .find(Avatar)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe('C');
    });

    it('should have provided firstLine when firstLine is provided', async () => {
      expect.assertions(1);

      const firstLine = 'firstLine';

      const element = (await mountAndWait(<SpaceListItem firstLine={firstLine} />))
        .find(`[data-type="body-primary"]`)
        .getDOMNode();

      expect(element.textContent).toBe(firstLine);
    });

    it('should have provided secondLine when secondLine is provided', async () => {
      expect.assertions(1);

      const secondLine = ['one', 'two'];

      const element = (
        await mountAndWait(<SpaceListItem firstLine="firstLine" secondLine={secondLine} />)
      )
        .find(`[data-type="body-secondary"]`)
        .getDOMNode();

      expect(element.textContent).toBe('one - two');
    });

    it('should have provided isNewActivity class when isNewActivity is provided', async () => {
      expect.assertions(1);

      const isNewActivity = true;

      const element = (await mountAndWait(<SpaceListItem isNewActivity={isNewActivity} />)).find(
        ListItemBase
      );

      expect(element.hasClass(STYLE.isNewActivity)).toBe(true);
    });

    it('should have provided unread when isUnread is provided', async () => {
      expect.assertions(1);

      const isUnread = true;

      const element = (await mountAndWait(<SpaceListItem isUnread={isUnread} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided mention icon when isMention is provided', async () => {
      expect.assertions(1);

      const isMention = true;

      const element = (await mountAndWait(<SpaceListItem isMention={isMention} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided enter-room icon when isEnterRoom is provided', async () => {
      expect.assertions(1);

      const isEnterRoom = true;

      const element = (await mountAndWait(<SpaceListItem isEnterRoom={isEnterRoom} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided alert-muted icon when isAlertMuted is provided', async () => {
      expect.assertions(1);

      const isAlertMuted = true;

      const element = (await mountAndWait(<SpaceListItem isAlertMuted={isAlertMuted} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided alert icon when isAlert is provided', async () => {
      expect.assertions(1);

      const isAlert = true;

      const element = (await mountAndWait(<SpaceListItem isAlert={isAlert} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided error icon when isError is provided', async () => {
      expect.assertions(1);

      const isError = true;

      const element = (await mountAndWait(<SpaceListItem isError={isError} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided action when action is provided', async () => {
      expect.assertions(1);

      const action = <p>action</p>;

      const element = (await mountAndWait(<SpaceListItem action={action} />))
        .find(`[data-position="end"]`)
        .getDOMNode();

      expect(element.textContent).toBe('action');
    });

    it('should have provided active class when isSelected is provided', async () => {
      expect.assertions(1);

      const isSelected = true;

      const element = (
        await mountAndWait(<SpaceListItem isSelected={isSelected}>Test</SpaceListItem>)
      )
        .find(ListItemBase)
        .getDOMNode();

      expect(element.classList.contains('active')).toBe(true);
    });
  });
});
