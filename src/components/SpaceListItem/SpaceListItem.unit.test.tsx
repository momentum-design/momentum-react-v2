import React from 'react';

import SpaceListItem from './';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import Avatar from '../Avatar';
import Icon from '../Icon';
import { mountAndWait } from '../../../test/utils';

describe('<SpaceListItem />', () => {
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

    /* ...additional snapshot tests... */
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

    it('should have provided avatarProps when id is avatarProps', async () => {
      expect.assertions(1);

      const avatarProps = { title: 'C' };

      const element = (await mountAndWait(<SpaceListItem avatarProps={avatarProps} />))
        .find(Avatar)
        .find('span')
        .getDOMNode();

      expect(element.textContent).toBe(avatarProps.title);
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

    it('should have provided isNewActivity when isNewActivity is provided', async () => {
      expect.assertions(1);

      const isNewActivity = true;

      const element = (await mountAndWait(<SpaceListItem isNewActivity={isNewActivity} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided isMention when isMention is provided', async () => {
      expect.assertions(1);

      const isMention = true;

      const element = (await mountAndWait(<SpaceListItem isMention={isMention} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided isEnterRoom when isEnterRoom is provided', async () => {
      expect.assertions(1);

      const isEnterRoom = true;

      const element = (await mountAndWait(<SpaceListItem isEnterRoom={isEnterRoom} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided isAlertMuted when isAlertMuted is provided', async () => {
      expect.assertions(1);

      const isAlertMuted = true;

      const element = (await mountAndWait(<SpaceListItem isAlertMuted={isAlertMuted} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided isError when isError is provided', async () => {
      expect.assertions(1);

      const isError = true;

      const element = (await mountAndWait(<SpaceListItem isError={isError} />))
        .find(Icon)
        .getDOMNode();

      expect(element).toBeDefined();
    });

    it('should have provided isError when isError is provided', async () => {
      expect.assertions(1);

      const action = <p>action</p>;

      const element = (await mountAndWait(<SpaceListItem action={action} />))
        .find(`[data-position="end"]`)
        .getDOMNode();

      expect(element.textContent).toBe('action');
    });
  });
});
