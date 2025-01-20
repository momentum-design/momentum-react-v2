import React from 'react';
import { mount } from 'enzyme';
import { Mock } from 'jest-mock';

import SpatialNavigationProvider from './SpatialNavigationProvider';

import { NavKeyMapping } from './SpatialNavigationProvider.types';
import { renderHook } from '@testing-library/react-hooks';
import { useSpatialNavigationContext } from './SpatialNavigationProvider.utils';
import { fireEvent, render } from '@testing-library/react';
import { SpatialNavigation } from './SpatialNavigation';

jest.mock('./SpatialNavigation');
const MockedSpatialNavigation = SpatialNavigation as unknown as Mock<SpatialNavigation>;

const CUSTOM_KEYMAP = {
  left: 'a',
  right: 'd',
  up: 'w',
  down: 's',
  back: 'q',
  enter: 'e',
} as NavKeyMapping;

describe('<SpatialNavigationProvider />', () => {
  let container;

  beforeEach(() => {
    MockedSpatialNavigation.mockClear();
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<SpatialNavigationProvider />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with custom key mapping', () => {
      expect.assertions(1);

      const container = mount(<SpatialNavigationProvider navigationKeyMapping={CUSTOM_KEYMAP} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should pass child props', () => {
      expect.assertions(1);

      const children = [<div key="0" />, <div key="1" />, <div key="2" />];

      const divInElement = mount(
        <SpatialNavigationProvider>{children}</SpatialNavigationProvider>
      ).find('SpatialNavigationProvider > div');

      expect(divInElement.length).toBe(children.length);
    });
  });

  describe('context value', () => {
    it('should be with the default values', () => {
      const { result } = renderHook(() => useSpatialNavigationContext(), {
        wrapper: ({ children }) => (
          <SpatialNavigationProvider>{children}</SpatialNavigationProvider>
        ),
      });

      expect(result.current).toEqual({
        back: 'Escape',
        directionKeys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
        enter: 'Enter',
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
      });
    });

    it('should use values from navigationKeyMapping', () => {
      const { result } = renderHook(() => useSpatialNavigationContext(), {
        wrapper: ({ children }) => (
          <SpatialNavigationProvider navigationKeyMapping={CUSTOM_KEYMAP}>
            {children}
          </SpatialNavigationProvider>
        ),
      });

      expect(result.current).toEqual({
        back: 'q',
        directionKeys: ['w', 's', 'a', 'd'],
        enter: 'e',
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd',
      });
    });
  });

  describe('interaction with SpatialNavigation', () => {
    it('should initialise SpatialNavigation', () => {
      render(<SpatialNavigationProvider />);

      expect(MockedSpatialNavigation).toHaveBeenCalledTimes(1);
    });

    it('should call dispose when provider unmounted', () => {
      const { unmount } = render(<SpatialNavigationProvider />);

      expect(MockedSpatialNavigation).toHaveBeenCalledTimes(1);

      unmount();

      expect(MockedSpatialNavigation.mock.instances[0].dispose).toHaveBeenCalledTimes(1);
    });

    it.each`
      key             | expectedDirection
      ${'ArrowUp'}    | ${'up'}
      ${'ArrowDown'}  | ${'down'}
      ${'ArrowLeft'}  | ${'left'}
      ${'ArrowRight'} | ${'right'}
    `('should call focusNext when direction key $key pressed', ({ key, expectedDirection }) => {
      const { container } = render(<SpatialNavigationProvider />);

      fireEvent.keyDown(container, { key });

      expect(MockedSpatialNavigation.mock.instances[0].focusNext).toHaveBeenNthCalledWith(
        1,
        expectedDirection
      );
    });
    it.each`
      key    | expectedDirection
      ${'w'} | ${'up'}
      ${'s'} | ${'down'}
      ${'a'} | ${'left'}
      ${'d'} | ${'right'}
    `('should call focusNext when custom direction key pressed', ({ key, expectedDirection }) => {
      const { container } = render(
        <SpatialNavigationProvider navigationKeyMapping={CUSTOM_KEYMAP} />
      );

      fireEvent.keyDown(container, { key });

      expect(MockedSpatialNavigation.mock.instances[0].focusNext).toHaveBeenNthCalledWith(
        1,
        expectedDirection
      );
    });

    it.each`
      modifier
      ${'shift'}
      ${'ctrl'}
      ${'alt'}
      ${'meta'}
    `(
      'should not call focusNext when modifier key $modifier pressed with a direction key',
      ({ modifier }) => {
        const { container } = render(<SpatialNavigationProvider />);

        fireEvent.keyDown(container, { key: 'ArrowDown', [`${modifier}Key`]: true });
        expect(MockedSpatialNavigation.mock.instances[0].focusNext).not.toHaveBeenCalled();
      }
    );

    it('should call goBack handler when back button pressed', () => {
      const { container } = render(<SpatialNavigationProvider />);

      fireEvent.keyDown(container, { key: 'Escape' });

      expect(MockedSpatialNavigation.mock.instances[0].goBack).toHaveBeenNthCalledWith(1);
    });

    it('should call goBack handler when custom back button pressed', () => {
      const { container } = render(
        <SpatialNavigationProvider navigationKeyMapping={CUSTOM_KEYMAP} />
      );

      fireEvent.keyDown(container, { key: 'q' });

      expect(MockedSpatialNavigation.mock.instances[0].goBack).toHaveBeenNthCalledWith(1);
    });
  });
});
