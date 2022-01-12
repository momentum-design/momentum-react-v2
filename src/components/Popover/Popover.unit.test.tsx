import React from 'react';
import { mount } from 'enzyme';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import Popover, { POPOVER_CONSTANTS as CONSTANTS } from './';
import ContentContainer from './ContentContainer';
import { PopoverInstance } from './Popover.types';
import { triggerPress, waitForComponentToPaint } from '../../../test/utils';

jest.useFakeTimers();

describe('<Popover />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} color={CONSTANTS.COLORS.TERTIARY}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      )
        .find(ContentContainer)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      )
        .find(ContentContainer)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      )
        .find(ContentContainer)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      )
        .find(ContentContainer)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided color when color is provided', () => {
      expect.assertions(1);

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>} color={CONSTANTS.COLORS.TERTIARY}>
          <p>Content</p>
        </Popover>
      )
        .find(ContentContainer)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(CONSTANTS.COLORS.TERTIARY);
    });
  });

  describe('actions', () => {
    it.only('should render Popover on click', async () => {
      expect.assertions(2);

      const container = mount(
        <div>
          <Popover triggerComponent={<button>Click Me!</button>}>
            <p>Content</p>
          </Popover>
        </div>
      );

      expect(container.find(ContentContainer).length).toEqual(0);

      await act(async () => {
        triggerPress(container);
      });
      jest.runAllTimers();
      await waitForComponentToPaint(container);

      expect(container.find(ContentContainer).length).toEqual(1);

      // render(
      //   <Popover triggerComponent={<button>Click Me!</button>}>
      //     <p>Content</p>
      //   </Popover>
      // );

      // userEvent.click(screen.getByRole('button', { name: /click me!/i }));
      // const content = await screen.findByText('Content');
      // expect(content).toBeVisible();
    });

    it('should render Popover on mouseenter', () => {
      expect.assertions(1);

      const container = mount(
        <Popover triggerComponent={<button>Hover Me!</button>} trigger="mouseenter">
          <p>Content</p>
        </Popover>
      );

      container.find('button').simulate('mouseenter');
      container.update();
      expect(container.find(ContentContainer).length).toEqual(1);
    });

    it('should render Popover on focusin', () => {
      expect.assertions(1);

      const container = mount(
        <Popover triggerComponent={<button>Focus Me!</button>} trigger="focusin">
          <p>Content</p>
        </Popover>
      );

      container.find('button').simulate('focusin');
      container.update();
      expect(container.find(ContentContainer).length).toEqual(1);
    });

    it('should show/hide Popover when triggered through instance', () => {
      expect.assertions(1);

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

      const container = mount(<ParentComponent />);

      expect(container.find(ContentContainer).length).toEqual(0);
      container.find('#show').simulate('click');
      container.update();
      expect(container.find(ContentContainer).length).toEqual(1);
    });
  });
});
