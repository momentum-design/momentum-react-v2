import ComboBox from '.';
import React from 'react';
import { Item, Section } from '@react-stately/collections';
import { STYLE } from './ComboBox.constants';
import { mountAndWait } from '../../../test/utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { IComboBoxGroup, IComboBoxItem } from './ComboBox.types';
import { act } from 'react-dom/test-utils';
jest.mock('@react-aria/utils');
jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('ComboBox', () => {
  let container;

  const withoutSection: IComboBoxItem[] = [
    { key: 'key1', label: 'item1' },
    { key: 'key2', label: 'item2' },
    { key: 'key3', label: 'item3' },
    { key: 'key4', label: 'listbox1' },
    { key: 'key5', label: 'listbox2' },
    { key: 'key6', label: 'listbox3' },
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
    const renderChildren = (itemOrGroup) => {
      if ('items' in itemOrGroup) {
        const group = itemOrGroup;
        const itemsEle = group.items.map((listboxItem: IComboBoxItem) => (
          <Item key={listboxItem.key} textValue={listboxItem.label}>
            <div key={listboxItem.key + '-label'}>{listboxItem.label}</div>
          </Item>
        ));

        return group.section ? (
          <Section title={group.section} key={group.section}>
            {itemsEle}
          </Section>
        ) : (
          <Section key="withoutSection">{itemsEle}</Section>
        );
      } else {
        const item = itemOrGroup;
        return (
          <Item key={item.key} textValue={item.label}>
            {item.label}
          </Item>
        );
      }
    };

    it('should match snapshot label', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <ComboBox label="comboBox_label" defaultItems={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot withSection', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <ComboBox defaultItems={withSection}>
          {(group) => {
            const itemsEle = group?.items?.map((listboxItem) => {
              return listboxItem.popoverText ? (
                <Item key={listboxItem.key} textValue={listboxItem.key} data-test="listboxItem">
                  <div>{listboxItem.popoverText}</div>
                </Item>
              ) : (
                <Item key={listboxItem.key} textValue={listboxItem.key}>
                  <div>{listboxItem.label}</div>
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
        <ComboBox className={className} defaultItems={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = await mountAndWait(
        <ComboBox style={style} defaultItems={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with placeholder', async () => {
      expect.assertions(1);

      const placeholder = 'ComboBox';

      container = await mountAndWait(
        <ComboBox placeholder={placeholder} defaultItems={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with noResultLabel', async () => {
      expect.assertions(1);

      const noResultLabel = 'No result';

      container = await mountAndWait(
        <ComboBox noResultLabel={noResultLabel} defaultItems={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with listboxWidth', async () => {
      expect.assertions(1);

      const listboxWidth = '16rem';

      container = await mountAndWait(
        <ComboBox listboxWidth={listboxWidth} defaultItems={withoutSection}>
          {renderChildren}
        </ComboBox>
      );

      expect(container).toMatchSnapshot();
    });

    describe('attributes', () => {
      it('should have its wrapper class', async () => {
        container = await mountAndWait(
          <ComboBox defaultItems={withoutSection}>{renderChildren}</ComboBox>
        );
        const element = container.find(ComboBox).getDOMNode();

        expect(element.classList.contains(STYLE.wrapper));
      });

      it('should have provided class when className is provided', async () => {
        expect.assertions(1);
        const className = 'example-class';

        container = await mountAndWait(
          <ComboBox className={className} defaultItems={withoutSection}>
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
          <ComboBox style={style} defaultItems={withoutSection}>
            {renderChildren}
          </ComboBox>
        );
        const element = wrapper.find(ComboBox).getDOMNode();

        expect(element.getAttribute('style')).toBe(`--local-width: 100%; ${styleString}`);
      });

      it('should have provided style when style is listboxWidth', async () => {
        expect.assertions(1);

        const listboxWidth = '16rem';
        const styleString = '--local-width: 16rem;';

        const wrapper = await mountAndWait(
          <ComboBox listboxWidth={listboxWidth} defaultItems={withoutSection}>
            {renderChildren}
          </ComboBox>
        );
        const element = wrapper.find(ComboBox).getDOMNode();

        expect(element.getAttribute('style')).toBe(`${styleString}`);
      });

      // it('should have provided error style when error is provided', async () => {
      //   expect.assertions(1);

      //   const error = true;

      //   const wrapper = await mountAndWait(
      //     <ComboBox error={error} defaultItems={withoutSection}>
      //       {renderChildren}
      //     </ComboBox>
      //   );
      //   const element = wrapper.find(ComboBox).getDOMNode();

      //   expect(element.getAttribute('data-error')).toBe(`${error}`);
      // });

      it('should have expected props on placeholder', async () => {
        expect.assertions(1);

        const placeholder = 'please select';

        const wrapper = await mountAndWait(
          <ComboBox placeholder={placeholder} defaultItems={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        expect(wrapper.find('.md-combo-box-input').at(0).props()).toHaveProperty(
          'placeholder',
          placeholder
        );
      });

      describe('actions', () => {
        it('should show list on click', async () => {
          const user = userEvent.setup();

          render(<ComboBox defaultItems={withoutSection}>{renderChildren}</ComboBox>);

          expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

          await user.click(screen.getByRole('button'));

          expect(screen.getByRole('listbox')).toBeVisible();
        });

        it('should call onInputChange when type on input', async () => {
          const onInputChange = jest.fn();

          render(
            <ComboBox onInputChange={onInputChange} defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          await userEvent.type(screen.getByRole('combobox'), 'hello');

          expect(onInputChange).toHaveBeenCalled();
        });

        it('should call onSelectionChange when an item is selected', async () => {
          const user = userEvent.setup();
          const onSelectionChange = jest.fn();

          render(
            <ComboBox onSelectionChange={onSelectionChange} defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          const button = screen
            .queryAllByRole('button')
            .find((button) => button.classList.contains('md-combo-box-button'));

          act(() => {
            button.focus();
          });
          await user.keyboard('{Enter}');
          expect(screen.getByRole('listbox')).toBeVisible();

          expect(onSelectionChange).not.toHaveBeenCalled();
          await user.click(screen.getAllByRole('option')[0]);
          expect(onSelectionChange).toHaveBeenCalled();
        });

        it('should show disabledKeys when click', async () => {
          const user = userEvent.setup();

          const disabledKeys = ['key1'];

          const { container } = render(
            <ComboBox disabledKeys={disabledKeys} defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
          );

          await user.click(screen.getByRole('button'));

          expect(container.querySelector('li[data-key="key1"]')).toHaveAttribute(
            'data-disabled',
            'true'
          );
        });

        it('should show list when focused and pressing enter', async () => {
          const user = userEvent.setup();

          render(<ComboBox defaultItems={withoutSection}>{renderChildren}</ComboBox>);

          const list = screen.queryByRole('listbox');
          expect(list).not.toBeInTheDocument();

          const button = screen.getByRole('button');
          act(() => {
            button.focus();
          });
          expect(button).toHaveFocus();

          await user.keyboard('{Enter}');
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        it('should hide list when clicking outside', async () => {
          const user = userEvent.setup();

          render(
            <>
              <ComboBox defaultItems={withoutSection}>{renderChildren}</ComboBox>
              <button>button-outside</button>
            </>
          );

          const ele = screen
            .queryAllByRole('button')
            .find((button) => button.classList.contains('md-combo-box-button'));

          await user.click(ele);
          expect(screen.getByRole('listbox')).toBeVisible();

          await user.click(screen.getAllByRole('button')[1]);
          await waitFor(() => {
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
          });
        });
      });

      it('should have show noResultLabel when items is empty', async () => {
        const noResultLabel = 'empty result';

        render(
          <ComboBox noResultLabel={noResultLabel} defaultItems={withoutSection}>
            {renderChildren}
          </ComboBox>
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        await userEvent.type(screen.getByRole('combobox'), 'hello');

        expect(screen.getByRole('option')).toHaveTextContent(noResultLabel);
      });

      it('When list is hidden, entering text in the input, list will display', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultItems={withoutSection}>{renderChildren}</ComboBox>
          </>
        );

        const input = screen.getByRole('combobox');
        act(() => {
          input.focus();
        });
        await user.keyboard('{i}');
        expect(screen.getByRole('listbox')).toBeVisible();

        await waitFor(() => {
          expect(screen.queryByRole('listbox')).toBeInTheDocument();
        });
      });

      it('when input is focused, list is hidden, press arrowDown, list will display, and item will be focused', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultSelectedKey={'key2'} defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
          </>
        );

        const input = screen.getByRole('combobox');
        act(() => {
          input.focus();
        });
        await user.keyboard('{arrowDown}');
        expect(screen.getByRole('listbox')).toBeVisible();

        const item = screen.getAllByRole('option')[1];
        expect(item.getAttribute('data-focused')).toBe('true');
      });

      it('when input is focused, list is displayed, press Escape, list will be hidden', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultItems={withoutSection}>{renderChildren}</ComboBox>
          </>
        );

        const input = screen.getByRole('combobox');
        act(() => {
          input.focus();
        });
        await user.keyboard('{i}');
        expect(screen.getByRole('listbox')).toBeVisible();

        await user.keyboard('{Escape}');
        await waitFor(() => {
          expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });
      });

      it('when input is focused, input has value, press Escape, clear input value', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultSelectedKey="key1" defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
          </>
        );

        const input = screen.getByRole('combobox');
        expect(input).toHaveProperty('value', 'item1');
        act(() => {
          input.focus();
        });
        await user.keyboard('{Escape}');
        expect(input).toHaveProperty('value', '');
      });

      it('when listitem is focused, press Escape, input will be focused', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultItems={withoutSection}>{renderChildren}</ComboBox>
          </>
        );
        const input = screen.getByRole('combobox');
        act(() => {
          input.focus();
        });
        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('listbox')).toBeVisible();

        const item = screen.getAllByRole('option')[0];
        expect(item.getAttribute('data-focused')).toBe('true');

        await user.keyboard('{Escape}');
        await waitFor(() => {
          expect(input).toHaveFocus();
        });
      });

      it('reset inputValue, when focus shifts from inside the component to outside', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultSelectedKey="key1" defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
            <button>button-outside</button>
          </>
        );
        const input = screen.getByRole('combobox');
        act(() => {
          input.focus();
        });
        await user.keyboard('{i}');
        expect(input).toHaveProperty('value', 'item1i');

        const button = screen.getByRole('button', { name: 'button-outside' });
        act(() => {
          button.focus();
        });

        await waitFor(() => {
          expect(input).toHaveProperty('value', 'item1');
        });
      });

      it('reset inputValue, when click outside the component', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultSelectedKey="key1" defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
            <button>button-outside</button>
          </>
        );
        const input = screen.getByRole('combobox');

        await waitFor(() => {
          expect(input).toHaveProperty('value', 'item1');
        });
        act(() => {
          input.focus();
        });
        await user.keyboard('{1}');
        await waitFor(() => {
          expect(input).toHaveProperty('value', 'item11');
        });

        const button = screen.getByRole('button', { name: 'button-outside' });
        await user.click(button);

        await waitFor(() => {
          expect(input).toHaveProperty('value', 'item1');
        });
      });

      it('filter list when input', async () => {
        const user = userEvent.setup();

        render(
          <>
            <ComboBox defaultSelectedKey="key1" defaultItems={withoutSection}>
              {renderChildren}
            </ComboBox>
          </>
        );
        const input = screen.getByRole('combobox');

        await waitFor(() => {
          expect(input).toHaveProperty('value', 'item1');
        });
        act(() => {
          input.focus();
        });
        await user.keyboard('{ArrowDown}');
        const listbox = screen.getByRole('listbox');
        expect(listbox).toBeVisible();
        const item2 = screen.getAllByRole('option')[1];
        const item1 = screen.getAllByRole('option')[0];
        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
        await user.keyboard('{Backspace}');
        await user.keyboard('{1}');
        expect(input).toHaveProperty('value', 'item1');
        await waitFor(() => {
          expect(item1).toBeInTheDocument();
          expect(item2).not.toBeInTheDocument();
        });
      });
    });
  });
});
