import React, { useRef } from 'react';
import { mount } from 'enzyme';

import ContextMenu, { CONTEXT_MENU_CONSTANTS as CONSTANTS } from './';
import { act } from 'react-dom/test-utils';

const defaultProps = {
  contextMenuActions: [
    { text: 'Action 1', action: () => null },
    { text: 'Action 2', action: () => null },
  ],
};

const TestComponent = (props) => {
  const triggerRef = useRef(null);

  return (
    <div>
      <button ref={triggerRef}>Right click on me</button>
      <ContextMenu triggerRef={triggerRef} {...props} />
    </div>
  );
};

const rightClickOnElement = (element) => {
  act(() => {
    // simulate('contextmenu') won't work when the event listener is added directly to the element instead of using props
    element.dispatchEvent(new MouseEvent('contextmenu'));
  });
};

const renderAndTriggerContextMenu = (props) => {
  const container = mount(<TestComponent {...props} />, {
    attachTo: document.getElementById('container'),
  });
  rightClickOnElement(container.find('button').getDOMNode());
  const contextMenu = document.getElementById(props.id || 'context-menu');
  return { container, contextMenu };
};

describe('<ContextMenu />', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
  });

  afterEach(() => {
    const div = document.getElementById('container');
    if (div) {
      document.body.removeChild(div);
    }
  });

  // these snapshots will test both the container and contextMenu
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = renderAndTriggerContextMenu(defaultProps);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = renderAndTriggerContextMenu({ ...defaultProps, className });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = renderAndTriggerContextMenu({ ...defaultProps, id });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = renderAndTriggerContextMenu({ ...defaultProps, style });

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const { contextMenu } = renderAndTriggerContextMenu(defaultProps);

      expect(contextMenu.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { contextMenu } = renderAndTriggerContextMenu({ ...defaultProps, className });

      expect(contextMenu.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { contextMenu } = renderAndTriggerContextMenu({ ...defaultProps, id });

      expect(contextMenu.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'position: fixed; color: pink;';

      const { contextMenu } = renderAndTriggerContextMenu({ ...defaultProps, style });

      expect(contextMenu.getAttribute('style')).toBe(styleString);
    });
  });

  describe('actions', () => {
    it('does not show context menu when contextMenuActions is not provided', () => {
      const { contextMenu } = renderAndTriggerContextMenu({});
      expect(contextMenu).toBe(null);
    });

    it('does shows context menu on right click', () => {
      const { contextMenu } = renderAndTriggerContextMenu(defaultProps);
      expect(contextMenu).toBeTruthy();
      expect(contextMenu.children.length).toBe(2);
      expect(contextMenu.children[0].tagName).toBe('BUTTON');
      expect(contextMenu.children[0].textContent).toBe('Action 1');
      expect(contextMenu.children[1].tagName).toBe('BUTTON');
      expect(contextMenu.children[1].textContent).toBe('Action 2');
    });
  });
});
