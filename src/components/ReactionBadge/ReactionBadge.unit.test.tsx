import React from 'react';
import { renderWithWebComponent } from '../../../test/utils';
import userEvent from '@testing-library/user-event';

import ReactionBadge, { REACTION_BADGE_CONSTANTS as CONSTANTS } from './';
import Reaction from '../Reaction';
import * as jsonImport from '../../hooks/useDynamicJSONImport';
import smile from '@momentum-design/animations/dist/lottie/reactions/smile.json';
import { screen } from '@testing-library/react';

describe('<ReactionBadge name="haha" />', () => {
  const reactionProp = <Reaction name="haha" />;

  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component);
  };
  describe('snapshot', () => {
    beforeEach(() => {
      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ animationData: smile });
    });

    it('should match snapshot', async () => {
      expect.assertions(1);

      const { container } = await setup(<ReactionBadge reaction={reactionProp} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = await setup(
        <ReactionBadge reaction={reactionProp} className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = await setup(<ReactionBadge reaction={reactionProp} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = await setup(<ReactionBadge reaction={reactionProp} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with reacted', async () => {
      expect.assertions(1);

      const { container } = await setup(<ReactionBadge reaction={reactionProp} reacted={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with count', async () => {
      expect.assertions(1);

      const { container } = await setup(<ReactionBadge reaction={reactionProp} count={1} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      await setup(<ReactionBadge reaction={reactionProp} />);
      const element = screen.getByRole('button');

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      await setup(<ReactionBadge reaction={reactionProp} className={className} />);
      const element = screen.getByRole('button');

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      await setup(<ReactionBadge reaction={reactionProp} id={id} />);
      const element = screen.getByRole('button');

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      await setup(<ReactionBadge reaction={reactionProp} style={style} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided reacted when reacted is provided', async () => {
      expect.assertions(1);

      const reacted = true;

      await setup(<ReactionBadge reaction={reactionProp} reacted={reacted} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('data-reacted')).toBe(`${reacted}`);
    });

    it('should have provided count when count is provided', async () => {
      expect.assertions(1);

      const count = 1;

      await setup(<ReactionBadge reaction={reactionProp} count={count} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('data-count')).toBe(`${count}`);
    });

    it('should map the reaction name to the generated child', async () => {
      expect.assertions(1);

      const name = 'haha';
      const reactionName = 'haha';

      const { container } = await setup(<ReactionBadge reaction={<Reaction name={name} />} />);
      const child = container.querySelector(`div[data-name="${reactionName}"]`);

      expect(child).not.toBeNull();
    });
  });

  describe('actions', () => {
    const user = userEvent.setup();
    it('should handle mouse click events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      await setup(<ReactionBadge reaction={reactionProp} onClick={mockCallback} />);
      const component = screen.getByRole('button');

      await user.click(component);

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
