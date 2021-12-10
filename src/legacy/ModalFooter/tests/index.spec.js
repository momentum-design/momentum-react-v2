import React from 'react';
import { shallow, mount } from 'enzyme';
import { ModalFooter } from '@momentum-ui/react-collaboration';

describe('tests for <ModalFooter />', () => {
  it('should match SnapShot', () => {
    const container = mount(<ModalFooter id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ModalFooter', () => {
    const container = shallow(<ModalFooter />);

    expect(container.find('.md-modal__footer').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ModalFooter>
        <div className="testingforMF" />
      </ModalFooter>
    );

    expect(container.find('.testingforMF').length).toEqual(1);
  });
});
