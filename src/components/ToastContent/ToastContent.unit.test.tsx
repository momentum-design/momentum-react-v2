import React from 'react';
import { mount } from 'enzyme';

import ButtonGroup from '../ButtonGroup';
import ButtonPill from '../ButtonPill';

import ToastContent, { TOAST_CONTENT_CONSTANTS as CONSTANTS, ToastContentProps } from './';

describe('<ToastContent />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ToastContent />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ToastContent className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ToastContent id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ToastContent style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with action', () => {
      expect.assertions(1);

      const action = 'Action';

      const container = mount(<ToastContent action={action} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with action and actionColor', () => {
      expect.assertions(1);

      const action = 'Action';
      const actionColor = 'success';

      const container = mount(<ToastContent action={action} actionColor={actionColor} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with actor', () => {
      expect.assertions(1);

      const actor = 'Actor';

      const container = mount(<ToastContent actor={actor} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with info', () => {
      expect.assertions(1);

      const info = 'Information';

      const container = mount(<ToastContent info={info} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = 'Information';

      const container = mount(<ToastContent>{children}</ToastContent>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children and info', () => {
      expect.assertions(1);

      const children = 'Information';
      const info = 'Information';

      const container = mount(<ToastContent info={info}>{children}</ToastContent>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with complex props', () => {
      expect.assertions(1);

      const props: ToastContentProps = {
        action: 'Action',
        actionColor: 'success',
        actions: (
          <ButtonGroup spaced>
            <ButtonPill>Button</ButtonPill>
          </ButtonGroup>
        ),
        actor: 'Actor',
        children: 'Children',
        info: 'Information',
      };

      const container = mount(<ToastContent {...props} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ToastContent />)
        .find(ToastContent)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ToastContent className={className} />)
        .find(ToastContent)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ToastContent id={id} />)
        .find(ToastContent)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ToastContent style={style} />)
        .find(ToastContent)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided action when action is provided', () => {
      expect.assertions(1);

      const action = 'Action';

      const element = mount(<ToastContent action={action} />)
        .find(ToastContent)
        .getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.action)[0];

      expect(target.innerHTML).toBe(action);
    });

    it('should have provided data-color when actionColor is provided', () => {
      expect.assertions(1);

      const action = 'Action';
      const actionColor = 'success';

      const element = mount(<ToastContent action={action} actionColor={actionColor} />)
        .find(ToastContent)
        .getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.action)[0];

      expect(target.getAttribute('data-color')).toBe(actionColor);
    });

    it('should have a ButtonGroup when actions is provided', () => {
      expect.assertions(1);

      const actions = (
        <ButtonGroup spaced>
          <ButtonPill>Button</ButtonPill>
        </ButtonGroup>
      );

      const component = mount(<ToastContent actions={actions} />).find(ToastContent);

      const target = component.find(ButtonGroup);

      expect(target).toBeDefined();
    });

    it('should have provided actor when actor is provided', () => {
      expect.assertions(1);

      const actor = 'Actor';

      const element = mount(<ToastContent actor={actor} />)
        .find(ToastContent)
        .getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.actor)[0];

      expect(target.innerHTML).toBe(actor);
    });

    it('should have provided info when info is provided', () => {
      expect.assertions(1);

      const info = 'Information';

      const element = mount(<ToastContent info={info} />)
        .find(ToastContent)
        .getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.info)[0];

      expect(target.innerHTML).toBe(info);
    });

    it('should have provided info when children is provided', () => {
      expect.assertions(1);

      const children = 'Children';

      const element = mount(<ToastContent>{children}</ToastContent>)
        .find(ToastContent)
        .getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.info)[0];

      expect(target.innerHTML).toBe(children);
    });

    it('should prioritize info over children with info and children are provided', () => {
      expect.assertions(1);

      const children = 'Children';
      const info = 'Information';

      const element = mount(<ToastContent info={info}>{children}</ToastContent>)
        .find(ToastContent)
        .getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.info)[0];

      expect(target.innerHTML).toBe(info);
    });
  });
});
