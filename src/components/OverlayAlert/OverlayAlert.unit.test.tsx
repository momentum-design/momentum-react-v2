import React from 'react';
import { mount } from 'enzyme';

import ButtonControl from '../ButtonControl';
import ButtonPill from '../ButtonPill';
import ModalContainer, { MODAL_CONTAINER_CONSTANTS } from '../ModalContainer';
import Overlay, { OVERLAY_CONSTANTS } from '../Overlay';

import OverlayAlert, { OVERLAY_ALERT_CONSTANTS as CONSTANTS, OVERLAY_ALERT_CONSTANTS } from './';

describe('<OverlayAlert />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<OverlayAlert />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<OverlayAlert className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<OverlayAlert id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<OverlayAlert style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'example-title';

      const container = mount(<OverlayAlert title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with details', () => {
      expect.assertions(1);

      const details = 'example-details';

      const container = mount(<OverlayAlert details={details} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with actions', () => {
      expect.assertions(1);

      const actions = <ButtonPill>Button Pill</ButtonPill>;

      const container = mount(<OverlayAlert actions={actions} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with multiple actions', () => {
      expect.assertions(1);

      const actions = (
        <>
          <ButtonPill key={0}>Button Pill</ButtonPill>,<ButtonPill key={1}>Button Pill</ButtonPill>,
          <ButtonPill key={2}>Button Pill</ButtonPill>,
        </>
      );

      const container = mount(<OverlayAlert actions={actions} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with controls', () => {
      expect.assertions(1);

      const controls = <ButtonControl control="close" />;

      const container = mount(<OverlayAlert controls={controls} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with multiple controls', () => {
      expect.assertions(1);

      const controls = (
        <>
          <ButtonControl key={0} control="close" />,
          <ButtonControl key={1} control="favorite" />,
          <ButtonControl key={2} control="maximize" />,
        </>
      );

      const container = mount(<OverlayAlert controls={controls} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with details and children', () => {
      expect.assertions(1);

      const details = 'example-details';
      const children = 'example-children';

      const container = mount(<OverlayAlert details={details}>{children}</OverlayAlert>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<OverlayAlert />)
        .find(OverlayAlert)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<OverlayAlert className={className} />)
        .find(OverlayAlert)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<OverlayAlert id={id} />)
        .find(OverlayAlert)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<OverlayAlert style={style} />)
        .find(OverlayAlert)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should provided the local <Overlay /> with the "secondary" color by default', () => {
      expect.assertions(1);

      const overlayColor = OVERLAY_ALERT_CONSTANTS.DEFAULTS.OVERLAY_COLOR;

      const element = mount(<OverlayAlert />).find(Overlay);

      expect(element.props().color).toBe(overlayColor);
    });

    it('should provide the local <Overlay /> with its respective color', () => {
      expect.assertions(1);

      const overlayColor = Object.values(OVERLAY_CONSTANTS.COLORS).shift();

      const element = mount(<OverlayAlert overlayColor={overlayColor} />).find(Overlay);

      expect(element.props().color).toBe(overlayColor);
    });

    it('should provide the local <ModalContainer /> with its respective color', () => {
      expect.assertions(1);

      const modalColor = Object.values(MODAL_CONTAINER_CONSTANTS.COLORS).pop();

      const element = mount(<OverlayAlert modalColor={modalColor} />).find(ModalContainer);

      expect(element.props().color).toBe(modalColor);
    });

    it('should have provided actions when actions is provided', () => {
      expect.assertions(1);

      const innerHTML = 'Button Pill';
      const actions = <ButtonPill>{innerHTML}</ButtonPill>;

      const component = mount(<OverlayAlert actions={actions} />).find(OverlayAlert);

      const target = component.find(ButtonPill).html();

      expect(target.includes(innerHTML)).toBe(true);
    });

    it('should have provided controls when controls are provided', () => {
      expect.assertions(1);

      const control = 'close';
      const controls = <ButtonControl control={control} />;

      const component = mount(<OverlayAlert controls={controls} />).find(OverlayAlert);

      const target = component.find(ButtonControl);

      expect(target.props().control).toBe(control);
    });

    it('should have provided details when details are provided', () => {
      expect.assertions(1);

      const details = 'details-example';

      const component = mount(<OverlayAlert details={details} />).find(OverlayAlert);

      const target = component
        .getDOMNode()
        .getElementsByClassName(OVERLAY_ALERT_CONSTANTS.STYLE.details)[0];

      expect(target.innerHTML).toBe(details);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'title-example';

      const component = mount(<OverlayAlert title={title} />).find(OverlayAlert);

      const target = component
        .getDOMNode()
        .getElementsByClassName(OVERLAY_ALERT_CONSTANTS.STYLE.title)[0];

      expect(target.innerHTML.includes(title)).toBe(true);
    });

    it('should still render a empty div with the appropriate class when no title is provided', () => {
      expect.assertions(1);

      const component = mount(<OverlayAlert />).find(OverlayAlert);

      const target = component
        .getDOMNode()
        .getElementsByClassName(OVERLAY_ALERT_CONSTANTS.STYLE.title)[0];

      expect(target.classList.contains(OVERLAY_ALERT_CONSTANTS.STYLE.title)).toBe(true);
    });

    it('should have provided children when details and children are provided', () => {
      expect.assertions(2);

      const children = 'children-example';
      const details = 'details-example';

      const tree = mount(<OverlayAlert details={details}>{children}</OverlayAlert>)
        .find(OverlayAlert)
        .html();

      expect(tree.includes(children)).toBe(true);
      expect(tree.includes(details)).toBe(false);
    });
  });
});
