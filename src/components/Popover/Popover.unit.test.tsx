import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';

import Popover from './';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import { PopoverInstance } from './Popover.types';
import { ModalContainer } from '..';
import { triggerPress, waitForComponentToPaint } from '../../../test/utils';

describe('<Popover />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} color={COLORS.TERTIARY}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    // it('should have its wrapper class', () => {
    //   expect.assertions(1);
    //   const element = render(
    //     <Popover triggerComponent={<button>Click Me!</button>}>
    //       <p>Content</p>
    //     </Popover>
    //   )
    //     .find(ContentContainer)
    //     .getDOMNode();
    //   expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    // });
    // it('should have provided class when className is provided', () => {
    //   expect.assertions(1);
    //   const className = 'example-class';
    //   const element = render(
    //     <Popover triggerComponent={<button>Click Me!</button>} className={className}>
    //       <p>Content</p>
    //     </Popover>
    //   )
    //     .find(ContentContainer)
    //     .getDOMNode();
    //   expect(element.classList.contains(className)).toBe(true);
    // });
    // it('should have provided id when id is provided', () => {
    //   expect.assertions(1);
    //   const id = 'example-id';
    //   const element = render(
    //     <Popover triggerComponent={<button>Click Me!</button>} id={id}>
    //       <p>Content</p>
    //     </Popover>
    //   )
    //     .find(ContentContainer)
    //     .getDOMNode();
    //   expect(element.id).toBe(id);
    // });
    // it('should have provided style when style is provided', () => {
    //   expect.assertions(1);
    //   const style = { color: 'pink' };
    //   const styleString = 'color: pink;';
    //   const element = render(
    //     <Popover triggerComponent={<button>Click Me!</button>} style={style}>
    //       <p>Content</p>
    //     </Popover>
    //   )
    //     .find(ContentContainer)
    //     .getDOMNode();
    //   expect(element.getAttribute('style')).toBe(styleString);
    // });
    // it('should have provided color when color is provided', () => {
    //   expect.assertions(1);
    //   const element = render(
    //     <Popover triggerComponent={<button>Click Me!</button>} color={CONSTANTS.COLORS.TERTIARY}>
    //       <p>Content</p>
    //     </Popover>
    //   )
    //     .find(ContentContainer)
    //     .getDOMNode();
    //   expect(element.getAttribute('data-color')).toBe(CONSTANTS.COLORS.TERTIARY);
    // });
  });

  describe('actions', () => {
    // for Marcin - this test is failing:
    it('should show Popover on click', async () => {
      expect.assertions(2);

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container.find(ModalContainer).length).toEqual(0);
      triggerPress(container.find('button'));
      await waitForComponentToPaint(container);
      expect(container.find(ModalContainer).length).toEqual(1);
    });

    it('should show/hide Popover on click', async () => {
      render(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      userEvent.click(screen.getByRole('button', { name: /click me!/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after another click, popover should be hidden again
      userEvent.click(screen.getByRole('button', { name: /click me!/i }));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should show Popover on mouseenter', async () => {
      expect.assertions(2);

      render(
        <Popover triggerComponent={<button>Hover Me!</button>} trigger="mouseenter">
          <p>Content</p>
        </Popover>
      );

      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      userEvent.hover(screen.getByRole('button', { name: /hover me!/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();
    });

    it('should show Popover on focusin', async () => {
      expect.assertions(2);

      render(
        <Popover triggerComponent={<button>Focus Me!</button>} trigger="focusin">
          <p>Content</p>
        </Popover>
      );

      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      userEvent.tab();

      const content = await screen.findByText('Content');
      expect(content).toBeVisible();
    });

    it('should show/hide Popover when triggered through instance', async () => {
      expect.assertions(2);

      const ParentComponent = () => {
        const [instance, setInstance] = React.useState<PopoverInstance>();

        const handleShow = React.useCallback(() => {
          instance.show();
        }, [instance]);

        const handleHide = React.useCallback(() => {
          instance.hide();
        }, [instance]);

        return (
          <>
            <Popover
              triggerComponent={<button>Focus Me!</button>}
              trigger="focusin"
              setInstance={setInstance}
            >
              <p>Content</p>
            </Popover>
            <button id="show" onClick={handleShow}>
              Show
            </button>
            <button id="hide" onClick={handleHide}>
              Hide
            </button>
          </>
        );
      };

      render(<ParentComponent />);

      // show popover from the parent component
      userEvent.click(screen.getByRole('button', { name: /show/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // hide popover from the parent component
      userEvent.click(screen.getByRole('button', { name: /hide/i }));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });
  });
});
