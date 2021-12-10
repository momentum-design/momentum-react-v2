import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal } from '@momentum-ui/react-collaboration';
//Add test for Background once Portals are supported in Enzyme

describe('tests for <Modal />', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('should render a Modal', () => {
    wrapper = mount(<Modal onHide={() => {}} applicationId="test" show htmlId="testModal" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Modal', () => {
    wrapper = shallow(<Modal onHide={() => {}} applicationId="test" show htmlId="testModal" />);

    expect(wrapper.children().length).toEqual(1);
  });

  it('should not render without Show Prop equaling true', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show={false} htmlId="testModal" />
    );

    expect(wrapper.children().length).toEqual(0);
  });

  it('should render based on size prop', () => {
    wrapper = shallow(<Modal onHide={() => {}} applicationId="test" show htmlId="testModal" />);

    expect(wrapper.find('.md-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('md-modal--default');
  });

  it('should render based on size prop (small)', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show size="small" htmlId="testModal" />
    );

    expect(wrapper.find('.md-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('md-modal--small');
  });

  it('should render based on size prop (medium)', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show size="medium" htmlId="testModal" />
    );

    expect(wrapper.find('.md-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('md-modal--medium');
  });

  it('should render based on size prop (large)', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show size="large" htmlId="testModal" />
    );

    expect(wrapper.find('.md-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('md-modal--large');
  });

  it('should render based on background prop', () => {
    wrapper = shallow(<Modal onHide={() => {}} applicationId="test" show htmlId="testModal" />);

    expect(wrapper.find('.reveal-modal-bg').length).toEqual(0);
  });

  it('should render based on size prop (dialog)', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show size="dialog" htmlId="testModal" />
    );

    expect(wrapper.find('.md-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('md-modal--dialog');
  });

  it('should throw error if icon prop is not of type icon in dialog', () => {
    try {
      shallow(
        <Modal
          onHide={() => {}}
          icon={<div />}
          applicationId="test"
          show
          size="dialog"
          htmlId="testModal"
        />
      );
    } catch (e) {
      expect(e.message).toEqual('icon prop needs to be of type Icon.');
    }
  });

  it('should render based on size prop (full)', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show size="full" htmlId="testModal" />
    );

    expect(wrapper.find('.md-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('md-modal--full');
  });

  it('should render to given dom element', () => {
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'test-id');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    expect(modalRoot.hasChildNodes()).toBeFalsy();

    mount(
      <div>
        <Modal onHide={() => {}} applicationId="test" show htmlId="testModal" renderTo="test-id">
          <div className="testchild" />
        </Modal>
      </div>
    );

    expect(modalRoot.hasChildNodes()).toBeTruthy();
  });

  it('should render children', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show htmlId="testModal">
        <div className="testchild" />
      </Modal>
    );

    expect(wrapper.find('.testchild').length).toEqual(1);
  });

  it('should not render Backdrop if prop pass in as false', () => {
    wrapper = shallow(
      <Modal onHide={() => {}} applicationId="test" show backdrop={false} htmlId="testModal" />
    );

    expect(wrapper.find('.reveal-modal-bg').exists()).toEqual(false);
  });

  it('should render content wrapper if prop provided', () => {
    // eslint-disable-next-line react/prop-types
    const TestWrapper = ({ children }) => {
      return <div className="test-wrapper">{children}</div>;
    };

    wrapper = mount(
      <Modal
        onHide={() => {}}
        applicationId="test"
        show
        htmlId="testModal"
        ContentWrapper={TestWrapper}
      >
        <div className="testchild" />
      </Modal>
    );
    const contentWrapper = wrapper.find('.test-wrapper');
    expect(contentWrapper.length).toEqual(1);

    const contentContainer = contentWrapper.find('.md-modal__content');
    expect(contentContainer.length).toEqual(1);

    const content = contentContainer.find('.testchild');
    expect(content.length).toEqual(1);
  });

  it('should not render content wrapper if prop not provided', () => {
    wrapper = mount(
      <Modal onHide={() => {}} applicationId="test" show htmlId="testModal">
        <div className="testchild" />
      </Modal>
    );
    expect(wrapper.find('.md-modal').children().at(0).hasClass('md-modal__content')).toBe(true);
  });
});
