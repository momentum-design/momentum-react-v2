import InputSelect from '.';
import React from 'react';
import { Item, Section } from '@react-stately/collections';
import { STYLE } from './InputSelect.constants';
import { mountAndWait } from '../../../test/utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { IInputSelectGroup } from './InputSelect.types';
import Icon from '../Icon';
import { Input } from '@momentum-ui/react-collaboration';
jest.mock('@react-aria/utils');
jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('InputSelect', () => {
  let container;

  const withoutSection: IInputSelectGroup[] = [
    {
      section: '',
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

  const withSection: IInputSelectGroup[] = [
    {
      section: 'section1',
      items: [
        { key: 'key1', label: 'item1', popoverText: 'item1' },
        { key: 'key2', label: 'item2', popoverText: 'item2' },
        { key: 'key3', label: 'item3', popoverText: 'item3' },
        { key: 'key4', label: 'item4', popoverText: 'item4' },
      ],
    },
    {
      section: 'section2',
      items: [
        { key: 'key5', label: 'item5', popoverText: 'item5' },
        { key: 'key6', label: 'item6', popoverText: 'item6' },
        { key: 'key7', label: 'item7', popoverText: 'item7' },
        { key: 'key8', label: 'item8', popoverText: 'item8' },
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
        <InputSelect label="inputSelect_label" items={withoutSection}>
          {renderChildren}
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot withSection', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <InputSelect items={withSection}>
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
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      container = await mountAndWait(
        <InputSelect className={className} items={withoutSection}>
          {renderChildren}
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = await mountAndWait(
        <InputSelect style={style} items={withoutSection}>
          {renderChildren}
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with placeholder', async () => {
      expect.assertions(1);

      const placeholder = 'InputSelect';

      container = await mountAndWait(
        <InputSelect placeholder={placeholder} items={withoutSection}>
          {renderChildren}
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with noResultText', async () => {
      expect.assertions(1);

      const noResultText = 'No result';

      container = await mountAndWait(
        <InputSelect noResultText={noResultText} items={withoutSection}>
          {renderChildren}
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with height', async () => {
      expect.assertions(1);

      const height = '2rem';

      container = await mountAndWait(
        <InputSelect height={height} items={withoutSection}>
          {renderChildren}
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with width', async () => {
      expect.assertions(1);

      const width = '16rem';

      container = await mountAndWait(
        <InputSelect width={width} items={withoutSection}>
          {renderChildren}
        </InputSelect>
      );

      expect(container).toMatchSnapshot();
    });

    describe('attributes', () => {
      it('should have its wrapper class', async () => {
        container = await mountAndWait(
          <InputSelect items={withoutSection}>{renderChildren}</InputSelect>
        );
        const element = container.find(InputSelect).getDOMNode();

        expect(element.classList.contains(STYLE.wrapper));
      });

      it('should have provided class when className is provided', async () => {
        expect.assertions(1);
        const className = 'example-class';

        container = await mountAndWait(
          <InputSelect className={className} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );

        const element = container.find(InputSelect).getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided style when style is provided', async () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const wrapper = await mountAndWait(
          <InputSelect style={style} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );
        const element = wrapper.find(InputSelect).getDOMNode();

        expect(element.getAttribute('style')).toBe(
          `${styleString} --height: 2rem; --width: 15rem;`
        );
      });

      it('should have provided style when style is height', async () => {
        expect.assertions(1);

        const height = '3rem';
        const styleString = '--height: 3rem;';

        const wrapper = await mountAndWait(
          <InputSelect height={height} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );
        const element = wrapper.find(InputSelect).getDOMNode();

        expect(element.getAttribute('style')).toBe(`${styleString} --width: 15rem;`);
      });

      it('should have provided style when style is width', async () => {
        expect.assertions(1);

        const width = '16rem';
        const styleString = '--width: 16rem;';

        const wrapper = await mountAndWait(
          <InputSelect width={width} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );
        const element = wrapper.find(InputSelect).getDOMNode();

        expect(element.getAttribute('style')).toBe(`--height: 2rem; ${styleString}`);
      });

      it('should have provided error style when error is provided', async () => {
        expect.assertions(1);

        const error = true;

        const wrapper = await mountAndWait(
          <InputSelect error={error} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );
        const element = wrapper.find(InputSelect).getDOMNode();

        expect(element.getAttribute('data-error')).toBe(`${error}`);
      });

      it('should have provided label when label is provided', async () => {
        expect.assertions(1);

        const label = 'Input Select';

        const wrapper = await mountAndWait(
          <InputSelect label={label} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );

        const labelContainer = wrapper.find('div').filter({ className: 'md-inputSelect-label' });

        expect(labelContainer.props()).toEqual({
          className: 'md-inputSelect-label',
          children: label,
        });
      });

      it('should have expected props on icon', async () => {
        expect.assertions(1);

        const iconScale = 32;

        const wrapper = await mountAndWait(
          <InputSelect iconScale={iconScale} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );

        expect(
          wrapper.find(Icon).filter({ className: 'md-inputSelect-arrowIcon' }).props()
        ).toEqual({
          className: 'md-inputSelect-arrowIcon',
          name: 'arrow-down',
          scale: iconScale,
          weight: 'filled',
        });
      });

      it('should have provided description when description is provided', async () => {
        expect.assertions(1);

        const description = 'Input Select description';

        const wrapper = await mountAndWait(
          <InputSelect description={description} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );

        const descriptionContainer = wrapper
          .find('div')
          .filter({ className: 'md-inputSelect-description' });

        expect(descriptionContainer.props()).toEqual({
          className: 'md-inputSelect-description',
          children: description,
        });
      });

      it('should have expected props on selectedKey', async () => {
        expect.assertions(1);

        const selectedKey = 'key1';

        const wrapper = await mountAndWait(
          <InputSelect selectedKey={selectedKey} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );

        expect(
          wrapper.find(Input).filter({ className: 'md-inputSelect-input' }).props()
        ).toHaveProperty('value', 'item1');
      });

      it('should have expected props on placeholder', async () => {
        expect.assertions(1);

        const placeholder = 'please select';

        const wrapper = await mountAndWait(
          <InputSelect placeholder={placeholder} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );

        expect(
          wrapper.find(Input).filter({ className: 'md-inputSelect-input' }).props()
        ).toHaveProperty('placeholder', placeholder);
      });

      describe('actions', () => {
        it('should show menu on click', async () => {
          const user = userEvent.setup();

          render(<InputSelect items={withoutSection}>{renderChildren}</InputSelect>);

          const menuItem = screen.queryByRole('menu');
          expect(menuItem).not.toBeInTheDocument();

          await user.click(screen.getByRole('button'));

          expect(screen.getByRole('menu')).toBeVisible();
        });

        it('should call onBtnPress when click', async () => {
          const user = userEvent.setup();
          const onPress = jest.fn();

          render(
            <InputSelect onPress={onPress} items={withoutSection}>
              {renderChildren}
            </InputSelect>
          );

          await user.click(screen.getByRole('button'));

          expect(onPress).toHaveBeenCalled();
        });

        it('should call onInputChange when type on input', async () => {
          const onInputChange = jest.fn();

          render(
            <InputSelect onInputChange={onInputChange} items={withoutSection}>
              {renderChildren}
            </InputSelect>
          );

          await userEvent.type(screen.getByLabelText('md-inputSelect-input'), 'hello');

          expect(onInputChange).toHaveBeenCalled();
        });

        it('should call onAction when select an item', async () => {
          const user = userEvent.setup();

          const onAction = jest.fn();

          render(
            <InputSelect onAction={onAction} items={withoutSection}>
              {renderChildren}
            </InputSelect>
          );

          await user.click(screen.getByRole('button'));

          await user.click(screen.getByText('item1'));

          expect(onAction).toHaveBeenCalled();
        });

        it('should show disabledKeys when click', async () => {
          const user = userEvent.setup();

          const disabledKeys = ['key1'];

          const { container } = render(
            <InputSelect disabledKeys={disabledKeys} items={withoutSection}>
              {renderChildren}
            </InputSelect>
          );

          await user.click(screen.getByRole('button'));

          expect(container.querySelector('li[data-key="key1"]')).toHaveAttribute(
            'data-disabled',
            'true'
          );
        });

        it('should show menu when focused and pressing enter', async () => {
          const user = userEvent.setup();

          render(<InputSelect items={withoutSection}>{renderChildren}</InputSelect>);

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
              <InputSelect items={withoutSection}>{renderChildren}</InputSelect>
              <button>button-outside</button>
            </>
          );

          const ele = screen
            .queryAllByRole('button')
            .find((button) => button.classList.contains('md-inputSelect-button'));

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
          <InputSelect noResultText={noResultText} items={withoutSection}>
            {renderChildren}
          </InputSelect>
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        await userEvent.type(screen.getByLabelText('md-inputSelect-input'), 'hello');

        expect(screen.getByLabelText('md-inputSelect-noResultText')).toHaveTextContent(
          noResultText
        );
      });
    });
  });
});
