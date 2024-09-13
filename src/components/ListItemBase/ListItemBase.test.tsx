import ListItemBaseSection from '../ListItemBaseSection';
import ButtonPill from '../ButtonPill';
import ListItemBase from '.';
import { mount } from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom';
import { STYLE } from './ListItemBase.constants';
import * as listUtils from '../List/List.utils';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import List from '../List/List';
import * as listItemBaseUtils from './ListItemBase.utils';
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

    it('should match snapshot with empty list item', () => {
      expect.assertions(1);

      container = mount(<ListItemBase />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with focusChild', () => {
      expect.assertions(1);

      container = mount(
        <ListItemBase focusChild>
          <ButtonPill>Test</ButtonPill>
        </ListItemBase>
      );

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

    it.each([true, false])(
      'should have provided data-allow-text-select when allowTextSelection is %s',
      () => {
        expect.assertions(1);

        const allowTextSelection = false;

        container = mount(
          <ListItemBase allowTextSelection={allowTextSelection}>Test</ListItemBase>
        );

        const element = container.find(ListItemBase).getDOMNode();

        expect(element.getAttribute('data-allow-text-select')).toBe(`${allowTextSelection}`);
      }
    );
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const user = userEvent.setup();

      render(
        <ListItemBase data-testid="list-item-1" key="1" itemIndex={0} onPress={mockCallback} />
      );

      const listItemBase = await screen.findByTestId('list-item-1');

      await user.click(listItemBase);

      expect(mockCallback).toBeCalledTimes(1);
    });

    it('should handle mouse press events when allowTextSelection is true', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const user = userEvent.setup();

      render(
        <ListItemBase
          data-testid="list-item-1"
          key="1"
          itemIndex={0}
          onPress={mockCallback}
          allowTextSelection={true}
        />
      );

      const listItemBase = await screen.findByTestId('list-item-1');

      await user.click(listItemBase);

      expect(mockCallback).toBeCalled();
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

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should call handleEmptyListItem when the item is empty and it has focus', async () => {
    const handleEmptyListItemSpy = jest.spyOn(listItemBaseUtils, 'handleEmptyListItem');

    const context = {
      listSize: 1,
      shouldFocusOnPress: false,
      shouldItemFocusBeInset: false,
      currentFocus: 0,
      setCurrentFocus: jest.fn(),
      setDirection: jest.fn(),
      setIsInitiallyRoving: jest.fn(),
    };

    render(
      <listUtils.ListContext.Provider value={context}>
        <ListItemBase itemIndex={0} key="0" />
      </listUtils.ListContext.Provider>
    );

    expect(handleEmptyListItemSpy).toBeCalledWith({
      direction: 'forward',
      itemIndex: 0,
      listSize: 1,
      noLoop: false,
      setCurrentFocus: context.setCurrentFocus,
      setDirection: context.setDirection,
    });
    expect(context.setIsInitiallyRoving).not.toBeCalled();
  });

  it('should not call handleEmptyListItem if the node is not empty', async () => {
    const handleEmptyListItemSpy = jest.spyOn(listItemBaseUtils, 'handleEmptyListItem');

    const context = {
      listSize: 1,
      shouldFocusOnPress: false,
      shouldItemFocusBeInset: false,
      currentFocus: 0,
      setCurrentFocus: jest.fn(),
      setIsInitiallyRoving: jest.fn(),
    };

    render(
      <listUtils.ListContext.Provider value={context}>
        <ListItemBase itemIndex={0} key="0">
          1
        </ListItemBase>
      </listUtils.ListContext.Provider>
    );

    expect(handleEmptyListItemSpy).not.toBeCalled();
    expect(context.setIsInitiallyRoving).toBeCalledWith(false);
  });

  it('should not call handleEmptyListItem if the empty list item does not have focus', async () => {
    const handleEmptyListItemSpy = jest.spyOn(listItemBaseUtils, 'handleEmptyListItem');

    const context = {
      listSize: 1,
      shouldFocusOnPress: false,
      shouldItemFocusBeInset: false,
      currentFocus: 0,
      setCurrentFocus: jest.fn(),
      setIsInitiallyRoving: jest.fn(),
    };

    render(
      <listUtils.ListContext.Provider value={context}>
        <ListItemBase itemIndex={0} key="0">
          1
        </ListItemBase>
        <ListItemBase itemIndex={1} key="1" />
      </listUtils.ListContext.Provider>
    );

    expect(handleEmptyListItemSpy).not.toBeCalled();
    expect(context.setIsInitiallyRoving).toBeCalledWith(false);
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

  const simulateOnPress = (getByTestId, testId) => {
    // All these are necessary to simulate a press event in react-aria
    fireEvent.mouseDown(getByTestId(testId));
    fireEvent.mouseUp(getByTestId(testId));
    fireEvent.click(getByTestId(testId));
  };

  it('should focus on press when shouldFocusOnPress is set', async () => {
    const { getByTestId } = render(
      <List shouldFocusOnPress listSize={1}>
        <ListItemBase data-testid="list-item-1" itemIndex={0}>
          <ButtonPill>1</ButtonPill>
        </ListItemBase>
      </List>
    );

    simulateOnPress(getByTestId, 'list-item-1');

    expect(getByTestId('list-item-1')).toHaveFocus();
  });

  it('should not focus on press with focusChild even if shouldFocusOnPress is set', async () => {
    const { getByTestId } = render(
      <List shouldFocusOnPress listSize={1}>
        <ListItemBase focusChild data-testid="list-item-1" itemIndex={0}>
          <ButtonPill>1</ButtonPill>
        </ListItemBase>
      </List>
    );

    simulateOnPress(getByTestId, 'list-item-1');

    expect(getByTestId('list-item-1')).not.toHaveFocus();
  });

  it('should focus on the first focusable child after arrow key nav when focusChild is set', async () => {
    const user = userEvent.setup();

    const { getByTestId } = render(
      <List shouldFocusOnPress listSize={2}>
        <ListItemBase data-testid="list-item-0" itemIndex={0}>
          <ListItemBaseSection position="fill">
            <ButtonPill>0</ButtonPill>
            <ButtonPill>1</ButtonPill>
          </ListItemBaseSection>
        </ListItemBase>
        <ListItemBase focusChild data-testid="list-item-1" itemIndex={1}>
          <ListItemBaseSection position="fill">
            <ButtonPill data-testid="button-1">2</ButtonPill>
            <ButtonPill>3</ButtonPill>
          </ListItemBaseSection>
        </ListItemBase>
      </List>
    );

    await user.tab();

    expect(getByTestId('list-item-0')).toHaveFocus();

    await user.keyboard('{ArrowDown}');

    expect(getByTestId('button-1')).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(getByTestId('list-item-0')).toHaveFocus();
  });

  it('should call focus and focus within callbacks', async () => {
    const onFocusWithin = jest.fn();
    const onBlurWithin = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const checkCalled = ({
      onFocusWithinCalled,
      onBlurWithinCalled,
      onFocusCalled,
      onBlurCalled,
    }) => {
      expect(onFocusWithin).toHaveBeenCalledTimes(onFocusWithinCalled);
      expect(onBlurWithin).toHaveBeenCalledTimes(onBlurWithinCalled);
      expect(onFocus).toHaveBeenCalledTimes(onFocusCalled);
      expect(onBlur).toHaveBeenCalledTimes(onBlurCalled);
      onFocusWithin.mockClear();
      onBlurWithin.mockClear();
      onFocus.mockClear();
      onBlur.mockClear();
    };

    const user = userEvent.setup();

    const { getByTestId } = render(
      <>
        <List listSize={2}>
          <ListItemBase
            onBlur={onBlur}
            onFocus={onFocus}
            onBlurWithin={onBlurWithin}
            onFocusWithin={onFocusWithin}
            data-testid="list-item-0"
            itemIndex={0}
          >
            <ListItemBaseSection position="fill">
              <ButtonPill data-testid="button-0-a">0</ButtonPill>
              <ButtonPill data-testid="button-0-b">1</ButtonPill>
            </ListItemBaseSection>
          </ListItemBase>
          <ListItemBase focusChild data-testid="list-item-1" itemIndex={1}>
            <ListItemBaseSection position="fill">
              <ButtonPill data-testid="button-1">2</ButtonPill>
              <ButtonPill>3</ButtonPill>
            </ListItemBaseSection>
          </ListItemBase>
        </List>
        <ButtonPill data-testid="after">2</ButtonPill>
      </>
    );

    checkCalled({
      onFocusWithinCalled: 0,
      onBlurWithinCalled: 0,
      onFocusCalled: 0,
      onBlurCalled: 0,
    });

    await user.tab();

    checkCalled({
      onFocusWithinCalled: 1,
      onBlurWithinCalled: 0,
      onFocusCalled: 1,
      onBlurCalled: 0,
    });

    await user.tab();

    checkCalled({
      onFocusWithinCalled: 0,
      onBlurWithinCalled: 0,
      onFocusCalled: 0,
      onBlurCalled: 1,
    });

    await user.keyboard('{ArrowDown}');

    checkCalled({
      onFocusWithinCalled: 0,
      onBlurWithinCalled: 1,
      onFocusCalled: 0,
      onBlurCalled: 0,
    });

    await user.keyboard('{ArrowUp}');

    checkCalled({
      onFocusWithinCalled: 1,
      onBlurWithinCalled: 0,
      onFocusCalled: 1,
      onBlurCalled: 0,
    });

    await user.tab();

    expect(getByTestId('button-0-a')).toHaveFocus();

    checkCalled({
      onFocusWithinCalled: 0,
      onBlurWithinCalled: 0,
      onFocusCalled: 0,
      onBlurCalled: 1,
    });

    await user.tab();

    expect(getByTestId('button-0-b')).toHaveFocus();

    checkCalled({
      onFocusWithinCalled: 0,
      onBlurWithinCalled: 0,
      onFocusCalled: 0,
      onBlurCalled: 0,
    });

    await user.tab();

    expect(getByTestId('after')).toHaveFocus();

    checkCalled({
      onFocusWithinCalled: 0,
      onBlurWithinCalled: 1,
      onFocusCalled: 0,
      onBlurCalled: 0,
    });

    await user.tab({ shift: true });

    expect(getByTestId('list-item-0')).toHaveFocus();

    checkCalled({
      onFocusWithinCalled: 1,
      onBlurWithinCalled: 0,
      onFocusCalled: 1,
      onBlurCalled: 0,
    });
  });
});
