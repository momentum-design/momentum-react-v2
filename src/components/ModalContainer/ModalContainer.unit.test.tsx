import React from 'react';
import { mount } from 'enzyme';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ModalContainer, { MODAL_CONTAINER_CONSTANTS as CONSTANTS } from './';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';

describe('<ModalContainer />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ModalContainer />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ModalContainer className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ModalContainer id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const role = 'tooltip';

      const container = mount(<ModalContainer role={role} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-modal', () => {
      expect.assertions(1);

      const ariaModal = false;

      const container = mount(<ModalContainer aria-modal={ariaModal} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ModalContainer style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const container = mount(<ModalContainer color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with elevation', () => {
      expect.assertions(1);

      const elevation = Object.values(CONSTANTS.ELEVATIONS).pop();

      const container = mount(<ModalContainer elevation={elevation} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isPadded', () => {
      expect.assertions(1);

      const container = mount(<ModalContainer isPadded />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with radius', () => {
      expect.assertions(1);

      const round = Object.values(CONSTANTS.ROUNDS).pop();

      const container = mount(<ModalContainer round={round} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with arrow', () => {
      expect.assertions(1);

      const container = mount(<ModalContainer showArrow />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with arrowId', () => {
      expect.assertions(1);

      const arrowId = 'example-id';

      const container = mount(<ModalContainer arrowId={arrowId} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = <div>Example Text</div>;

      const container = mount(<ModalContainer>{children}</ModalContainer>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with focusLockProps', () => {
      expect.assertions(1);

      const container = mount(<ModalContainer focusLockProps={{ restoreFocus: true }} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ModalContainer />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ModalContainer className={className} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ModalContainer id={id} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ModalContainer style={style} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-color when color is provided', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const element = mount(<ModalContainer color={color} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(color);
    });

    it('should have provided data-elevation when elevation is provided', () => {
      expect.assertions(1);

      const elevation = Object.values(CONSTANTS.ELEVATIONS).pop();

      const element = mount(<ModalContainer elevation={elevation} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-elevation')).toBe(`${elevation}`);
    });

    it('should have provided data-padded when isPadded is provided', () => {
      expect.assertions(1);

      const isPadded = true;

      const element = mount(<ModalContainer isPadded={isPadded} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-padded')).toBe(`${isPadded}`);
    });

    it('should have provided data-round when round is provided', () => {
      expect.assertions(1);

      const round = Object.values(CONSTANTS.ROUNDS).pop();

      const element = mount(<ModalContainer round={round} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-round')).toBe(`${round}`);
    });

    it('should have provided data-placement when placement is provided', () => {
      expect.assertions(1);

      const placement = Object.values(PLACEMENTS).pop();

      const element = mount(<ModalContainer placement={placement} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-placement')).toBe(`${placement}`);
    });

    it('should have provided data-arrow-orientation when a vertical placement is provided', () => {
      expect.assertions(1);

      const placement = PLACEMENTS.BOTTOM_START;

      const element = mount(<ModalContainer placement={placement} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-arrow-orientation')).toBe('vertical');
    });

    it('should have provided data-arrow-orientation when a horizontal placement is provided', () => {
      expect.assertions(1);

      const placement = PLACEMENTS.LEFT_END;

      const element = mount(<ModalContainer placement={placement} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-arrow-orientation')).toBe('horizontal');
    });

    it('should have provided arrowId to arrowWrapper when arrowId is provided and showArrow is true', () => {
      expect.assertions(1);

      const arrowId = 'example-id';
      const element = mount(<ModalContainer arrowId={arrowId} showArrow />)
        .find('div')
        .filter({ className: 'md-modal-container-arrow-wrapper' })
        .getDOMNode();

      expect(element.getAttribute('id')).toBe(arrowId);
    });
  });

  describe('actions', () => {
    it('should not lock focus if no focusLockProps are supplied', async () => {
      expect.assertions(5);

      const Component = () => {
        return (
          <>
            <button>button</button>
            <ModalContainer>
              <button>button</button>
              <button>button</button>
            </ModalContainer>
          </>
        );
      };

      const user = userEvent.setup();

      render(<Component />);

      const buttons = await screen.findAllByText('button');

      expect(document.body).toHaveFocus();

      await user.tab();

      expect(buttons[0]).toHaveFocus();

      await user.tab();

      expect(buttons[1]).toHaveFocus();

      await user.tab();

      expect(buttons[2]).toHaveFocus();

      await user.tab();

      expect(document.body).toHaveFocus();
    });

    it('should lock focus around the children', async () => {
      expect.assertions(3);

      const Component = () => {
        return (
          <>
            <button>button</button>
            <ModalContainer focusLockProps={{}}>
              <button>button</button>
              <button>button</button>
            </ModalContainer>
          </>
        );
      };

      const user = userEvent.setup();

      render(<Component />);

      const buttons = await screen.findAllByText('button');

      expect(buttons[1]).toHaveFocus();

      await user.tab();

      expect(buttons[2]).toHaveFocus();

      await user.tab();

      expect(buttons[1]).toHaveFocus();
    });
  });
});
