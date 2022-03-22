import { mount } from 'enzyme';
import React from 'react';

import { STYLE } from './AvatarCompact.constants';

import AvatarCompact from '.';

describe('AvatarCompact', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<AvatarCompact count={1} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with 50 -> +50', () => {
      expect.assertions(1);

      const container = mount(<AvatarCompact count={50} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with 1000 -> +1K', () => {
      expect.assertions(1);

      const container = mount(<AvatarCompact count={1000} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with 1001 -> +1K', () => {
      expect.assertions(1);

      const container = mount(<AvatarCompact count={1001} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with 100000 -> +100K', () => {
      expect.assertions(1);

      const container = mount(<AvatarCompact count={100000} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with 125343 -> +125.3K', () => {
      expect.assertions(1);

      const container = mount(<AvatarCompact count={125343} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with 15343 -> +15.3K', () => {
      expect.assertions(1);

      const container = mount(<AvatarCompact count={15343} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<AvatarCompact count={10} />)
        .find(AvatarCompact)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass the count prop', () => {
      expect.assertions(1);

      const count = 10;

      const element = mount(<AvatarCompact count={count} />)
        .find(AvatarCompact)
        .getDOMNode();

      expect(element.innerHTML).toBe(`+${count}`);
    });
  });
});
