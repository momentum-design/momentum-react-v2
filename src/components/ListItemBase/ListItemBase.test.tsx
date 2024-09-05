import ListItemBaseSection from '../ListItemBaseSection';
import ButtonPill from '../ButtonPill';
import ListItemBase from '.';
import { mount } from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom';
import { STYLE } from './ListItemBase.constants';
import * as listUtils from '../List/List.utils';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import List from '../List/List';
import { ListContextValue } from '../List/List.types';

describe('ListItemBase', () => {
  let container;

  describe('snapshot', () => {
    beforeEach(() => {
      jest
        .spyOn(listUtils, 'useListContext')
        .mockImplementation(() => ({ currentFocus: 0, shouldFocusOnPres: false }));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ListItemBase>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBase className={className}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBase id={id}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<ListItemBase style={style}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItemBase isDisabled={isDisabled}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with lang', () => {
      expect.assertions(1);

      const lang = 'en-US';

      container = mount(<ListItemBase lang={lang}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = 40;

      container = mount(<ListItemBase size={size}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with shape', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(<ListItemBase shape={shape}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItemBase role={role}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected', () => {
      expect.assertions(1);

      const isSelected = true;

      container = mount(<ListItemBase isSelected={isSelected}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with interactive=false', () => {
      expect.assertions(1);

      const interactive = false;

      container = mount(<ListItemBase interactive={interactive}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with allowTextSelection=true', () => {
      expect.assertions(1);

      const allowTextSelection = true;

      container = mount(<ListItemBase allowTextSelection={allowTextSelection}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      container = mount(<ListItemBase>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBase className={className}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBase id={id}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<ListItemBase style={style}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-disabled when isDisabled is provided', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItemBase isDisabled={isDisabled}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe('true');
    });

    it('should have provided data-disabled when isDisabled is provided', () => {
      expect.assertions(1);

      const lang = 'en-US';

      container = mount(<ListItemBase lang={lang}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('lang')).toBe('en-US');
    });

    it('should have provided data-padding when isPadded is provided', () => {
      expect.assertions(1);

      const isPadded = true;

      container = mount(<ListItemBase isPadded={isPadded}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-padded')).toBe('true');
    });

    it('should have provided data-size when size is provided', () => {
      expect.assertions(1);

      const size = 32;

      container = mount(<ListItemBase size={size}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size.toString());
    });

    it('should have provided data-size auto when size auto is provided', () => {
      expect.assertions(1);

      const size = 'auto';

      container = mount(<ListItemBase size={size}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size.toString());
    });

    it('should have provided data-shape when shape is provided', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(<ListItemBase shape={shape}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(shape);
    });

    it('should have provided role when role is provided', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItemBase role={role}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('role')).toBe(role);
    });

    it('should have provided active class when isSelected is provided', () => {
      expect.assertions(1);

      const isSelected = true;

      container = mount(<ListItemBase isSelected={isSelected}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains('active')).toBe(true);
    });

    it('should have provided data-interactive when interactive is provided', () => {
      expect.assertions(2);

      const interactive = false;

      container = mount(<ListItemBase interactive={interactive}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-interactive')).toBe(`${interactive}`);
      expect(element.getAttribute('tabIndex')).toBe('-1');
    });

    it.each([true, false])('should have provided data-allow-text-select when allowTextSelection is %s', () => {
      expect.assertions(1);

      const allowTextSelection = false;

      container = mount(<ListItemBase allowTextSelection={allowTextSelection}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-allow-text-select')).toBe(`${allowTextSelection}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();
  
      const user = userEvent.setup();
  
      render(<ListItemBase data-testid="list-item-1" key="1" itemIndex={0} onPress={mockCallback} />);
  
      const listItemBase = await screen.findByTestId('list-item-1');

      await user.click(listItemBase);

      expect(mockCallback).toBeCalledTimes(1);
    });

    it('should not handle mouse press events when allowTextSelection is true', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();
  
      const user = userEvent.setup();

      render(<ListItemBase data-testid="list-item-1" key="1" itemIndex={0} onPress={mockCallback} allowTextSelection={true} />);
  
      const listItemBase = await screen.findByTestId('list-item-1');

      await user.click(listItemBase);

      expect(mockCallback).not.toBeCalled();
    });
  });

  describe('keydown', () => {
    const renderWithNButtons = (n: number) => {
      return render(
        <List listSize={2}>
          <ListItemBase data-testid="list-item-1" key="0" itemIndex={0}>
            <ListItemBaseSection position="end">
              {n > 0 ? (
                <ButtonPill data-testid="first-button-1" color="join" size={24}>
                  Join
                </ButtonPill>
              ) : (
                <span>Empty</span>
              )}
              {n > 1 ? (
                <ButtonPill data-testid="second-button-1" color="join" size={24}>
                  Join
                </ButtonPill>
              ) : (
                <span>Empty</span>
              )}
            </ListItemBaseSection>
          </ListItemBase>
          <ListItemBase data-testid="list-item-2" key="1" itemIndex={1}>
            <ListItemBaseSection position="end">
              {n > 0 ? (
                <ButtonPill data-testid="first-button-2" color="join" size={24}>
                  Join
                </ButtonPill>
              ) : (
                <span>Empty</span>
              )}
              {n > 1 ? (
                <ButtonPill data-testid="second-button-2" color="join" size={24}>
                  Join
                </ButtonPill>
              ) : (
                <span>Empty</span>
              )}
            </ListItemBaseSection>
          </ListItemBase>
        </List>
      );
    };

    it('should handle tab key', async () => {
      const user = userEvent.setup();

      const { getByTestId } = renderWithNButtons(2);
      await user.tab();
      await user.tab();
      expect(getByTestId('first-button-1')).toHaveFocus();
      await user.tab();
      expect(getByTestId('second-button-1')).toHaveFocus();

      // no loop back
      await user.tab();
      expect(document.body).toHaveFocus();
    });

    it('should handle shift+tab key', async () => {
      const user = userEvent.setup();
      const { getByTestId } = renderWithNButtons(2);

      await user.tab();

      // move focus to the last interactable
      await user.tab();
      await user.tab();
      expect(getByTestId('second-button-1')).toHaveFocus();

      await user.tab({ shift: true });
      expect(getByTestId('first-button-1')).toHaveFocus();

      // no loop back - focus should be on the list item
      await user.tab({ shift: true });
      expect(getByTestId('list-item-1')).toHaveFocus();
    });
  });

  it('should not steal focus when context update but the current focus does not changed', () => {
    const Wrapper = ({ value }: { value: ListContextValue }) => {
      return (
        <listUtils.ListContext.Provider value={value}>
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={0} />
          <ListItemBase data-testid="list-item-2" key="2" itemIndex={1} />
        </listUtils.ListContext.Provider>
      );
    };

    const { getByTestId, rerender } = render(<Wrapper value={undefined} />);

    expect(getByTestId('list-item-1')).not.toHaveFocus();

    rerender(
      <Wrapper
        value={{
          listSize: 2,
          shouldFocusOnPress: false,
          shouldItemFocusBeInset: false,
          currentFocus: 0,
          setCurrentFocus: jest.fn(),
        }}
      />
    );
    expect(getByTestId('list-item-1')).not.toHaveFocus();
  });

  it('onPress should work when Enter key is pressed', async () => {
    const mockCallback = jest.fn();
    const mockClick = jest.fn();

    const user = userEvent.setup();

    render(<ListItemBase data-testid="list-item-1" key="1" itemIndex={0} onPress={mockCallback} />);

    const listItemBase = await screen.findByTestId('list-item-1');

    listItemBase.onclick = mockClick;

    listItemBase.focus();

    expect(listItemBase).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockClick).toBeCalledTimes(1);
  });
});
