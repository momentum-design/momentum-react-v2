import ComboBox from '.';
import React, { createRef } from 'react';
import { Item, Section } from '@react-stately/collections';
import { STYLE } from './ComboBox.constants';
import { mountAndWait } from '../../../test/utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { IComboBoxGroup } from './ComboBox.types';
import { act } from 'react-dom/test-utils';
import TextInput from '../TextInput';
jest.mock('@react-aria/utils');
jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('ComboBox', () => {
  let container;

  const withoutSection: IComboBoxGroup[] = [
    {
      items: [
        { key: 'key1', label: 'item1' },
        { key: 'key2', label: 'item2' },
        { key: 'key3', label: 'item3' },
        { key: 'key4', label: 'menu1' },
        { key: 'key5', label: 'menu2' },
        { key: 'key6', label: 'menu3' },
      ],
    },
  ];

  const withSection: IComboBoxGroup[] = [
    {
      section: 'section1',
      items: [
        { key: 'key1', label: 'item1' },
        { key: 'key2', label: 'item2' },
        { key: 'key3', label: 'item3' },
        { key: 'key4', label: 'item4' },
      ],
    },
    {
      section: 'section2',
      items: [
        { key: 'key5', label: 'item5' },
        { key: 'key6', label: 'item6' },
        { key: 'key7', label: 'item7' },
        { key: 'key8', label: 'item8' },
      ],
    },
  ];

  describe('snapshot', () => {
    const renderChildren = (group) => {
      const itemsEle: any = group?.items?.map((menuItem) => {
        return menuItem.popoverText ? (
          <Item key={menuItem.key} textValue={menuItem.key} data-test="menuItem">
            <div>{menuItem.popoverText}</div>
          </Item>
        ) : (
          <Item key={menuItem.key} textValue={menuItem.key}>
            <div>{menuItem.label}</div>
          </Item>
        );
      });

      return <Section key="noSection">{itemsEle}</Section>;
    };

    it('should match snapshot label', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <ComboBox label="comboBox_label" comboBoxGroups={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot withSection', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <ComboBox comboBoxGroups={withSection}>
          {(group) => {
            const itemsEle = group?.items?.map((menuItem) => {
              return menuItem.popoverText ? (
                <Item key={menuItem.key} textValue={menuItem.key} data-test="menuItem">
                  <div>{menuItem.popoverText}</div>
                </Item>
              ) : (
                <Item key={menuItem.key} textValue={menuItem.key}>
                  <div>{menuItem.label}</div>
                </Item>
              );
            });

            return (
              <Section title={group.section} key={group.section}>
                {itemsEle}
              </Section>
            );
          }}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      container = await mountAndWait(
        <ComboBox className={className} comboBoxGroups={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = await mountAndWait(
        <ComboBox style={style} comboBoxGroups={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with placeholder', async () => {
      expect.assertions(1);

      const placeholder = 'ComboBox';

      container = await mountAndWait(
        <ComboBox placeholder={placeholder} comboBoxGroups={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with noResultText', async () => {
      expect.assertions(1);

      const noResultText = 'No result';

      container = await mountAndWait(
        <ComboBox noResultText={noResultText} comboBoxGroups={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });


    it('should match snapshot with width', async () => {
      expect.assertions(1);

      const width = '16rem';

      container = await mountAndWait(
        <ComboBox width={width} comboBoxGroups={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    describe('attributes', () => {
      it('should have its wrapper class', async () => {
        container = await mountAndWait(
          <ComboBox comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
        );
        const element = container.find(ComboBox).getDOMNode();

        expect(element.classList.contains(STYLE.wrapper));
      });

      it('should have provided class when className is provided', async () => {
        expect.assertions(1);
        const className = 'example-class';

        container = await mountAndWait(
          <ComboBox className={className} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        const element = container.find(ComboBox).getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided style when style is provided', async () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const wrapper = await mountAndWait(
          <ComboBox style={style} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );
        const element = wrapper.find(ComboBox).getDOMNode();

        expect(element.getAttribute('style')).toBe(
          `--local-width: 16.25rem; ${styleString}`
        );
      });

      it('should have provided style when style is width', async () => {
        expect.assertions(1);

        const width = '16rem';
        const styleString = '--local-width: 16rem;';

        const wrapper = await mountAndWait(
          <ComboBox width={width} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );
        const element = wrapper.find(ComboBox).getDOMNode();

        expect(element.getAttribute('style')).toBe(`${styleString}`);
      });

      it('should have provided label when label is provided', async () => {
        expect.assertions(1);

        const label = 'ComboBox';

        const wrapper = await mountAndWait(
          <ComboBox label={label} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        const labelContainer = wrapper.find('div').filter({ className: 'md-combo-box-label' });

        expect(labelContainer.props()).toEqual({
          className: 'md-combo-box-label',
          children: label,
        });
      });

      it('should have provided description when description is provided', async () => {
        expect.assertions(1);

        const description = 'ComboBox description';

        const wrapper = await mountAndWait(
          <ComboBox description={description} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        const descriptionContainer = wrapper
          .find('div')
          .filter({ className: 'md-combo-box-description' });

        expect(descriptionContainer.props()).toEqual({
          className: 'md-combo-box-description',
          children: description,
        });
      });

      it('should have provided error style when error is provided', async () => {
        expect.assertions(1);

        const error = true;

        const wrapper = await mountAndWait(
          <ComboBox error={error} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );
        const element = wrapper.find(ComboBox).getDOMNode();

        expect(element.getAttribute('data-error')).toBe(`${error}`);
      });

      it('should have expected props on selectedKey', async () => {
        expect.assertions(1);

        const selectedKey = 'key1';

        const wrapper = await mountAndWait(
          <ComboBox selectedKey={selectedKey} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        expect(
          wrapper.find('[aria-label="md-combo-box-input"]').at(0).props()
        ).toHaveProperty('value', 'item1');
      });

      it('should have expected props on placeholder', async () => {
        expect.assertions(1);

        const placeholder = 'please select';

        const wrapper = await mountAndWait(
          <ComboBox placeholder={placeholder} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        expect(
          wrapper.find('[aria-label="md-combo-box-input"]').at(0).props()
        ).toHaveProperty('placeholder', placeholder);
      });

      it('should match inputRef props', async () => {
        expect.assertions(1);

        const inputRef = createRef<HTMLInputElement>();

        const wrapper = await mountAndWait(
          <ComboBox inputRef={inputRef} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        expect(
          wrapper.find(TextInput).props()['aria-label']
        ).toEqual(inputRef.current.getAttribute('aria-label'));
      });

      describe('actions', () => {
        it('should show menu on click', async () => {
          const user = userEvent.setup();

          render(<ComboBox comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>);

          const menuItem = screen.queryByRole('menu');
          expect(menuItem).not.toBeInTheDocument();

          await user.click(screen.getByRole('button'));

          expect(screen.getByRole('menu')).toBeVisible();
        });

        it('should call onArrowButtonPress when click', async () => {
          const user = userEvent.setup();
          const onArrowButtonPress = jest.fn();

          render(
            <ComboBox onArrowButtonPress={onArrowButtonPress} comboBoxGroups={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          await user.click(screen.getByRole('button'));

          expect(onArrowButtonPress).toHaveBeenCalled();
        });

        it('should call onInputChange when type on input', async () => {
          const onInputChange = jest.fn();

          render(
            <ComboBox onInputChange={onInputChange} comboBoxGroups={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          await userEvent.type(screen.getByLabelText('md-combo-box-input'), 'hello');

          expect(onInputChange).toHaveBeenCalled();
        });

        it('should call onSelectionChange when an item is selected', async () => {
          const user = userEvent.setup();
          const onSelectionChange = jest.fn();

          render(
            <ComboBox onSelectionChange={onSelectionChange} comboBoxGroups={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          const button = screen
          .queryAllByRole('button')
          .find((button) => button.classList.contains('md-combo-box-button'));

          act(()=>{
            button.focus();
          });
          await user.keyboard('{Enter}');
          expect(screen.getByRole('menu')).toBeVisible();
          
          const item = screen.getByText('item1').parentElement;
          await waitFor(() => {
            expect(item.parentElement).toHaveFocus();
          });
          expect(onSelectionChange).not.toHaveBeenCalled();
          await user.keyboard('{Enter}');
          expect(onSelectionChange).toHaveBeenCalled();
        });

        it('should call openStateChange when list is expanded or collapsed', async () => {
          const user = userEvent.setup();
          const openStateChange = jest.fn();

          render(
            <ComboBox openStateChange={openStateChange} comboBoxGroups={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          const button = screen
          .queryAllByRole('button')
          .find((button) => button.classList.contains('md-combo-box-button'));

          act(()=>{
            button.focus();
          });;
          expect(openStateChange).toBeCalledWith(false);
          await user.keyboard('{Enter}');
          expect(screen.getByRole('menu')).toBeVisible();
          expect(openStateChange).toBeCalledWith(true);
          await user.keyboard('{Escape}');
          expect(openStateChange).toBeCalledWith(false);
        });

        it('should show disabledKeys when click', async () => {
          const user = userEvent.setup();

          const disabledKeys = ['key1'];

          const { container } = render(
            <ComboBox disabledKeys={disabledKeys} comboBoxGroups={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          await user.click(screen.getByRole('button'));

          expect(container.querySelector('li[data-key="key1"]')).toHaveAttribute(
            'data-disabled',
            'true'
          );
        });

        it('should show menu when focused and pressing enter', async () => {
          const user = userEvent.setup();

          render(<ComboBox comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>);

          const menuItem = screen.queryByRole('menu');
          expect(menuItem).not.toBeInTheDocument();

          const button = screen.getByRole('button');
          act(()=>{
            button.focus();
          });;
          expect(button).toHaveFocus();

          await user.keyboard('{Enter}');
          expect(screen.getByRole('menu')).toBeVisible();
        });

        it('should hide menu when clicking outside', async () => {
          const user = userEvent.setup();

          render(
            <>
              <ComboBox comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
              <button>button-outside</button>
            </>
          );

          const ele = screen
            .queryAllByRole('button')
            .find((button) => button.classList.contains('md-combo-box-button'));

          await user.click(ele);
          expect(screen.getByRole('menu')).toBeVisible();

          await user.click(screen.getByRole('button', { name: 'button-outside' }));
          await waitFor(() => {
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
          });
        });
      });

      it('should have show noResultText when items is empty', async () => {
        const noResultText = 'empty result';

        render(
          <ComboBox noResultText={noResultText} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        await userEvent.type(screen.getByLabelText('md-combo-box-input'), 'hello');

        expect(screen.getByLabelText('md-combo-box-no-result-text')).toHaveTextContent(
          noResultText
        );
      });

      it('if shouldFilterOnArrowButton is false, should not filter when press arrowButton', async () => {

        render(
          <ComboBox shouldFilterOnArrowButton={false} comboBoxGroups={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        const user = userEvent.setup();
        const input = screen.getByLabelText('md-combo-box-input');
        const button = screen.getByRole('button');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{4}');
        await user.keyboard('{Escape}');
        await user.click(button);
        expect(screen.getByRole('menu')).toBeVisible();

        const item = screen.getByText('item1').parentElement;
        expect(item).toBeVisible();
      });

      it('When list is hidden, entering text in the input, list will display', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );

        const input = screen.getByLabelText('md-combo-box-input');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{Enter}');
        expect(screen.getByRole('menu')).toBeVisible();

        await waitFor(() => {
          expect(screen.queryByRole('menu')).toBeInTheDocument();
        });
      });

      it('when input is focused, list is hidden, press Enter, list will display, and item will be focused', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox selectedKey={'key2'} comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );

        const input = screen.getByLabelText('md-combo-box-input');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{Enter}');
        expect(screen.getByRole('menu')).toBeVisible();

        const item = screen.getByText('item2').parentElement;
        await waitFor(() => {
          expect(item.parentElement).toHaveFocus();
        });
      });

      it('when input is focused, list is hidden, press ArrowDown, list will display, and item will be focused', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );

        const input = screen.getByLabelText('md-combo-box-input');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('menu')).toBeVisible();

        const item = screen.getByText('item1').parentElement;
 
        await waitFor(() => {
          expect(item.parentElement).toHaveFocus();
        });
      });
      it('when input is focused, list is displayed, press Escape, list will be hidden', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );

        const input = screen.getByLabelText('md-combo-box-input');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{i}');
        expect(screen.getByRole('menu')).toBeVisible();

        await user.keyboard('{Escape}');
        await waitFor(() => {
          expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });
      });

      it('when input is focused, input has value, press Escape, clear input value', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox selectedKey='key1' comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );

        const input = screen.getByLabelText('md-combo-box-input');
        expect(input).toHaveProperty('value','item1');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{Escape}');

        expect(input).toHaveProperty('value','');
      });

      it('when listitem is focused, press Escape, input will be focused', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox  comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );
        const input = screen.getByLabelText('md-combo-box-input');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{Enter}');
        expect(screen.getByRole('menu')).toBeVisible();

        const item = screen.getByText('item1').parentElement;
        await waitFor(() => {
          expect(item.parentElement).toHaveFocus();
        });

        await user.keyboard('{Escape}');
        await waitFor(() => {
          expect(input).toHaveFocus();
        });
      });

      it('when listitem is focused, press Tab, The focus will not escape.', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox  comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );
        const input = screen.getByLabelText('md-combo-box-input');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{Enter}');
        expect(screen.getByRole('menu')).toBeVisible();

        const item = screen.getByText('item1').parentElement;
        await waitFor(() => {
          expect(item.parentElement).toHaveFocus();
        });

        await user.keyboard('{Tab}');
        await waitFor(() => {
          expect(item.parentElement).toHaveFocus();
        });
      });

      it('reset inputValue, when focus shifts from inside the component to outside', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox  selectedKey='key1' comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
            <button>button-outside</button>
          </>
        );
        const input = screen.getByLabelText('md-combo-box-input');
        act(()=>{
          input.focus();
        });
        await user.keyboard('{Escape}');
        expect(input).toHaveProperty('value','');

        const button = screen.getByRole('button', { name: 'button-outside' });
        act(()=>{
          button.focus();
        });

        await waitFor(() => {
          expect(input).toHaveProperty('value','item1');
        });
      });

      it('reset inputValue, when mousedown outside the component', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox  selectedKey='key1' comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
            <button>button-outside</button>
          </>
        );
        const input = screen.getByLabelText('md-combo-box-input');


        await waitFor(() => {
          expect(input).toHaveProperty('value','item1');
        });
        act(()=>{
          input.focus();
        });
        await user.keyboard('{1}');
        await waitFor(() => {
          expect(input).toHaveProperty('value','item11');
        });

        const button = screen.getByRole('button', { name: 'button-outside' });
        await user.click(button);

        await waitFor(() => {
          expect(input).toHaveProperty('value','item1');
        });
      });

      it('filter list when the input is focused', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox  selectedKey='key1' shouldFilterOnArrowButton={false} comboBoxGroups={withoutSection}>{renderChildren}</ComboBox>
          </>
        );
        const input = screen.getByLabelText('md-combo-box-input');
        const button = screen
        .queryAllByRole('button')
        .find((button) => button.classList.contains('md-combo-box-button'));

        await waitFor(() => {
          expect(input).toHaveProperty('value','item1');
        });
        await user.click(button);
        const menu = screen.getByRole('menu');
        expect(menu).toBeVisible();
        const item2 = screen.getByText('item2').parentElement;
        await user.click(button);
        await user.click(input);
        await user.keyboard('{Enter}');
        expect(input).toHaveProperty('value','item1');
        const item1 = screen.getByText('item1').parentElement;
        await waitFor(() => {
          expect(item1.parentElement).toHaveFocus();
          expect(item2).not.toBeInTheDocument();
        });
      });
    });     
  });
});
