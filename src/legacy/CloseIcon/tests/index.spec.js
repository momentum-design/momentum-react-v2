import React from 'react';
import { shallow, mount } from 'enzyme';
import CloseIcon from '../../CloseIcon';

describe('tests for <CloseIcon />', () => {
  it('should match SnapShot', () => {
    const container = mount(<CloseIcon className="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should call onClick on click of close', () => {
    const onClick = jest.fn();
    const container = shallow(<CloseIcon className="test" onClick={onClick} aria-label="Close" />);
    expect(container.find('.test').length).toEqual(1);
    expect(container.find('.test').props()['aria-label']).toEqual('Close');

    container.find('.md-close').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
