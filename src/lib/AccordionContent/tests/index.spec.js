import React from 'react';
import { shallow, mount } from 'enzyme';
import { AccordionContent } from '@momentum-ui/react';

describe('tests for <AccordionContent />', () => {
  it('should match SnapShot', () => {
    const container = mount(<AccordionContent />);

    expect(container).toMatchSnapshot();
  });

  it('should render one AccordionContent', () => {
    const container = shallow(<AccordionContent />);

    expect(container.find('.md-accordion__content').length).toEqual(1);
  });

  it('should pass ClassName Prop', () => {
    const container = shallow(<AccordionContent className="testClass" />);

    expect(container.find('.testClass').exists()).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(
      <AccordionContent>
        <div className="testingforTC" />
      </AccordionContent>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });
});
