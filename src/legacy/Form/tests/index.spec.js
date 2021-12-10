import React from 'react';
import { shallow, mount } from 'enzyme';
import { Form } from '@momentum-ui/react-collaboration';

describe('tests for <Form />', () => {
  it('should match SnapShot', () => {
    const container = mount(<Form name="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render only Form', () => {
    const container = shallow(<Form name="test" />);

    expect(container.find('.md-form').length).toEqual(1);
  });

  it('should render children under Form Content wrapper', () => {
    const container = shallow(
      <Form name="test">
        <div className="testingChildren" />
      </Form>
    );

    expect(container.find('.testingChildren').length).toEqual(1);
  });
});
