import { mount } from 'enzyme';
import React, { useRef } from 'react';

import { Item, Section } from '@react-stately/collections';
import { useListState } from '@react-stately/list';
import { CollectionChildren } from '@react-types/shared';

import MenuListBackground from 'components/MenuListBackground';

import ListBoxBase, { ListBoxBaseProps } from '.';

// eslint-disable-next-line @typescript-eslint/ban-types
const WrappedComponent = <T extends object>(
  props: Omit<ListBoxBaseProps<T>, 'state'> & { children: CollectionChildren<T>; label: string }
) => {
  const _ref = useRef<HTMLUListElement>();
  const state = useListState(props);
  return <ListBoxBase {...props} ref={_ref} state={state} />;
};

describe('ListBoxBase', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      const wrapper = mount(
        <WrappedComponent label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = mount(
        <WrappedComponent className={className} label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = mount(
        <WrappedComponent id={id} label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const wrapper = mount(
        <WrappedComponent style={style} label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot when autoFocus provided', () => {
      const wrapper = mount(
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <WrappedComponent autoFocus={true} label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with sections', () => {
      const wrapper = mount(
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <WrappedComponent autoFocus={true} label="test-label">
          <Section>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
          </Section>
          <Section>
            <Item>Item 3</Item>
          </Section>
        </WrappedComponent>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', () => {
      expect.assertions(1);
      const className = 'example-class';

      const wrapper = mount(
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <WrappedComponent className={className} label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );

      const element = wrapper.find(MenuListBackground).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'test-ID';

      const wrapper = mount(
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <WrappedComponent id={id} label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );
      const element = wrapper.find(MenuListBackground).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = mount(
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <WrappedComponent style={style} label="test-label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </WrappedComponent>
      );
      const element = wrapper.find(MenuListBackground).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });
});
