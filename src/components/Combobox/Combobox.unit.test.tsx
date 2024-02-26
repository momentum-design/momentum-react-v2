import Combobox from '.';
import React from 'react';
import { Item, Section } from '@react-stately/collections';
import { STYLE } from './Combobox.constants';
import { mountAndWait } from '../../../test/utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { IComboboxGroup } from './Combobox.types';
jest.mock('@react-aria/utils');
jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('Combobox', () => {
  let container;

  const withoutSection: IComboboxGroup[] = [
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

  const withSection: IComboboxGroup[] = [
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
        <Combobox label="combobox_label" comboboxGroups={withoutSection}>
          {renderChildren}
        </Combobox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot withSection', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Combobox comboboxGroups={withSection}>
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
        </Combobox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      container = await mountAndWait(
        <Combobox className={className} comboboxGroups={withoutSection}>
          {renderChildren}
        </Combobox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = await mountAndWait(
        <Combobox style={style} comboboxGroups={withoutSection}>
          {renderChildren}
        </Combobox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with placeholder', async () => {
      expect.assertions(1);

      const placeholder = 'Combobox';

      container = await mountAndWait(
        <Combobox placeholder={placeholder} comboboxGroups={withoutSection}>
          {renderChildren}
        </Combobox>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with noResultText', async () => {
      expect.assertions(1);

      const noResultText = 'No result';

      container = await mountAndWait(
        <Combobox noResultText={noResultText} comboboxGroups={withoutSection}>
          {renderChildren}
        </Combobox>
      );

      expect(container).toMatchSnapshot();
    });


    it('should match snapshot with width', async () => {
      expect.assertions(1);

      const width = '16rem';

      container = await mountAndWait(
        <Combobox width={width} comboboxGroups={withoutSection}>
          {renderChildren}
        </Combobox>
      );

      expect(container).toMatchSnapshot();
    });

    describe('attributes', () => {
      it('should have its wrapper class', async () => {
        container = await mountAndWait(
          <Combobox comboboxGroups={withoutSection}>{renderChildren}</Combobox>
        );
        const element = container.find(Combobox).getDOMNode();

        expect(element.classList.contains(STYLE.wrapper));
      });

      it('should have provided class when className is provided', async () => {
        expect.assertions(1);
        const className = 'example-class';

        container = await mountAndWait(
          <Combobox className={className} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );

        const element = container.find(Combobox).getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided style when style is provided', async () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const wrapper = await mountAndWait(
          <Combobox style={style} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );
        const element = wrapper.find(Combobox).getDOMNode();

        expect(element.getAttribute('style')).toBe(
          `--local-width: 16.25rem; ${styleString}`
        );
      });

      it('should have provided style when style is width', async () => {
        expect.assertions(1);

        const width = '16rem';
        const styleString = '--local-width: 16rem;';

        const wrapper = await mountAndWait(
          <Combobox width={width} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );
        const element = wrapper.find(Combobox).getDOMNode();

        expect(element.getAttribute('style')).toBe(`${styleString}`);
      });

      it('should have provided label when label is provided', async () => {
        expect.assertions(1);

        const label = 'Combobox';

        const wrapper = await mountAndWait(
          <Combobox label={label} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );

        const labelContainer = wrapper.find('div').filter({ className: 'md-combobox-label' });

        expect(labelContainer.props()).toEqual({
          className: 'md-combobox-label',
          children: label,
        });
      });

      it('should have provided description when description is provided', async () => {
        expect.assertions(1);

        const description = 'Combobox description';

        const wrapper = await mountAndWait(
          <Combobox description={description} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );

        const descriptionContainer = wrapper
          .find('div')
          .filter({ className: 'md-combobox-description' });

        expect(descriptionContainer.props()).toEqual({
          className: 'md-combobox-description',
          children: description,
        });
      });

      it('should have provided error style when error is provided', async () => {
        expect.assertions(1);

        const error = true;

        const wrapper = await mountAndWait(
          <Combobox error={error} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );
        const element = wrapper.find(Combobox).getDOMNode();

        expect(element.getAttribute('data-error')).toBe(`${error}`);
      });

      it('should have expected props on selectedKey', async () => {
        expect.assertions(1);

        const selectedKey = 'key1';

        const wrapper = await mountAndWait(
          <Combobox selectedKey={selectedKey} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );

        expect(
          wrapper.find('[aria-label="md-combobox-input"]').at(0).props()
        ).toHaveProperty('value', 'item1');
      });

      it('should have expected props on placeholder', async () => {
        expect.assertions(1);

        const placeholder = 'please select';

        const wrapper = await mountAndWait(
          <Combobox placeholder={placeholder} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );

        expect(
          wrapper.find('[aria-label="md-combobox-input"]').at(0).props()
        ).toHaveProperty('placeholder', placeholder);
      });

      describe('actions', () => {
        it('should show menu on click', async () => {
          const user = userEvent.setup();

          render(<Combobox comboboxGroups={withoutSection}>{renderChildren}</Combobox>);

          const menuItem = screen.queryByRole('menu');
          expect(menuItem).not.toBeInTheDocument();

          await user.click(screen.getByRole('button'));

          expect(screen.getByRole('menu')).toBeVisible();
        });

        it('should call onArrowButtonPress when click', async () => {
          const user = userEvent.setup();
          const onArrowButtonPress = jest.fn();

          render(
            <Combobox onArrowButtonPress={onArrowButtonPress} comboboxGroups={withoutSection}>
              {renderChildren}
            </Combobox>
          );

          await user.click(screen.getByRole('button'));

          expect(onArrowButtonPress).toHaveBeenCalled();
        });

        it('should call onInputChange when type on input', async () => {
          const onInputChange = jest.fn();

          render(
            <Combobox onInputChange={onInputChange} comboboxGroups={withoutSection}>
              {renderChildren}
            </Combobox>
          );

          await userEvent.type(screen.getByLabelText('md-combobox-input'), 'hello');

          expect(onInputChange).toHaveBeenCalled();
        });

        it('should call onSelectionChange and onAction when an item is selected', async () => {
          const user = userEvent.setup();
          const onSelectionChange = jest.fn();
          const onAction = jest.fn();

          render(
            <Combobox onSelectionChange={onSelectionChange} onAction={onAction} comboboxGroups={withoutSection}>
              {renderChildren}
            </Combobox>
          );

          const button = screen
          .queryAllByRole('button')
          .find((button) => button.classList.contains('md-combobox-button'));

          button.focus();
          await user.keyboard('{Enter}');
          expect(screen.getByRole('menu')).toBeVisible();
          
          const item = screen.getByText('item1').parentElement;
 
          await waitFor(() => {
            expect(item.parentElement).toHaveFocus();
          });
          expect(onSelectionChange).not.toHaveBeenCalled();
          expect(onAction).not.toHaveBeenCalled();
          await user.keyboard('{Enter}');
          expect(onSelectionChange).toHaveBeenCalled();
          expect(onAction).toHaveBeenCalled();
        });

        it('should show disabledKeys when click', async () => {
          const user = userEvent.setup();

          const disabledKeys = ['key1'];

          const { container } = render(
            <Combobox disabledKeys={disabledKeys} comboboxGroups={withoutSection}>
              {renderChildren}
            </Combobox>
          );

          await user.click(screen.getByRole('button'));

          expect(container.querySelector('li[data-key="key1"]')).toHaveAttribute(
            'data-disabled',
            'true'
          );
        });

        it('should show menu when focused and pressing enter', async () => {
          const user = userEvent.setup();

          render(<Combobox comboboxGroups={withoutSection}>{renderChildren}</Combobox>);

          const menuItem = screen.queryByRole('menu');
          expect(menuItem).not.toBeInTheDocument();

          const button = screen.getByRole('button');
          button.focus();
          expect(button).toHaveFocus();

          await user.keyboard('{Enter}');
          expect(screen.getByRole('menu')).toBeVisible();
        });

        it('should hide menu when clicking outside', async () => {
          const user = userEvent.setup();

          render(
            <>
              <Combobox comboboxGroups={withoutSection}>{renderChildren}</Combobox>
              <button>button-outside</button>
            </>
          );

          const ele = screen
            .queryAllByRole('button')
            .find((button) => button.classList.contains('md-combobox-button'));

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
          <Combobox noResultText={noResultText} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        await userEvent.type(screen.getByLabelText('md-combobox-input'), 'hello');

        expect(screen.getByLabelText('md-combobox-noResultText')).toHaveTextContent(
          noResultText
        );
      });

      it('if shouldFilterOnArrowButton is false, should not filter when press arrowButton', async () => {

        render(
          <Combobox shouldFilterOnArrowButton={false} comboboxGroups={withoutSection}>
            {renderChildren}
          </Combobox>
        );

        const user = userEvent.setup();
        const input = screen.getByLabelText('md-combobox-input');
        const button = screen.getByRole('button');

        input.focus();
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
            <Combobox comboboxGroups={withoutSection}>{renderChildren}</Combobox>
          </>
        );

        const input = screen.getByLabelText('md-combobox-input');

        input.focus();
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
            <Combobox selectedKey={'key2'} comboboxGroups={withoutSection}>{renderChildren}</Combobox>
          </>
        );

        const input = screen.getByLabelText('md-combobox-input');
        input.focus();
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
            <Combobox comboboxGroups={withoutSection}>{renderChildren}</Combobox>
          </>
        );

        const input = screen.getByLabelText('md-combobox-input');
        input.focus();
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
            <Combobox comboboxGroups={withoutSection}>{renderChildren}</Combobox>
          </>
        );

        const input = screen.getByLabelText('md-combobox-input');
        input.focus();
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
            <Combobox selectedKey='key1' comboboxGroups={withoutSection}>{renderChildren}</Combobox>
          </>
        );

        const input = screen.getByLabelText('md-combobox-input');
        expect(input).toHaveProperty('value','item1');

        input.focus();
        await user.keyboard('{Escape}');

        expect(input).toHaveProperty('value','');
      });

      it('when listitem is focused, press Escape, input will be focused', async () => {
        const user = userEvent.setup();

        render(
          <>
            <Combobox  comboboxGroups={withoutSection}>{renderChildren}</Combobox>
          </>
        );
        const button = screen.getByRole('button');
        const input = screen.getByLabelText('md-combobox-input');

        button.focus();
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
    });     
  });
});
