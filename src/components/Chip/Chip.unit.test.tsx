import React from 'react';
import { mount } from 'enzyme';

import Chip from './';

const label = 'Some chip text';

describe('<Chip />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Chip />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Chip className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Chip id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Chip style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with text', () => {
      const container = mount(<Chip label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', () => {
      const container = mount(<Chip iconName={'accessibility-regular'} />);

      expect(container).toMatchSnapshot();
    });

    it('it should match snapshot with disabled', () => {
      const container = mount(<Chip disabled />);

      expect(container).toMatchSnapshot();
    });
  });
});
