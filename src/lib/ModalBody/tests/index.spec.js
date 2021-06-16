import React from 'react';
import { shallow, mount } from 'enzyme';
import { ModalBody } from '@momentum-ui/react';

describe('tests for <ModalBody />', () => {
  it('should match SnapShot', () => {
    const container = mount(<ModalBody id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ModalBody', () => {
    const container = shallow(<ModalBody />);

    expect(container.find('.md-modal__body').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ModalBody>
        <div className="testingforMB" />
      </ModalBody>
    );

    expect(container.find('.testingforMB').length).toEqual(1);
  });
});
