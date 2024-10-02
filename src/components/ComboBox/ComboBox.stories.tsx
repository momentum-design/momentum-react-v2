import React, { useCallback, useEffect, useState } from 'react';
import { Item, Section } from '@react-stately/collections';
import ComboBox from '.';

import { DocumentationPage } from '../../storybook/helper.stories.docs';

import Documentation from './ComboBox.documentation.mdx';

import StyleDocs from '../../storybook/docs.stories.style.mdx';
import argTypes from './ComboBox.stories.args';

import { Template } from '../../storybook/helper.stories.templates';
import { IComboBoxGroup, IComboBoxItem, Props } from './ComboBox.types';
import OverlayAlert from '../OverlayAlert';

export default {
  title: 'Momentum UI/ComboBox',
  component: ComboBox,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const ComboBoxWrapper = (props: Props) => {
  return (
    <ComboBox {...props}>
      {(itemOrGroup: IComboBoxGroup) => {
        if ('items' in itemOrGroup) {
          const group = itemOrGroup as IComboBoxGroup;
          const itemsEle = group.items.map((menuItem: IComboBoxItem) => (
            <Item key={menuItem.key} textValue={menuItem.label}>
              <div key={menuItem.key + '-label'}>{menuItem.label}</div>
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
          const item = itemOrGroup as IComboBoxItem;
          return (
            <Item key={item.key} textValue={item.label}>
              {item.label}
            </Item>
          );
        }
      }}
    </ComboBox>
  );
};

const withoutSection: IComboBoxItem[] = [
  { key: 'item1', label: 'item1' },
  { key: 'item2', label: 'item2' },
  { key: 'item3', label: 'item3' },
];

const withSection: IComboBoxGroup[] = [
  {
    section: 'section1',
    items: [
      { key: 'key1', label: 'item1 long long long long long long long' },
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

const Example = Template(ComboBoxWrapper).bind({});

Example.args = {
  placeholder: 'placeholder123',
  defaultItems: withoutSection,
  noResultLabel: 'No Result Found',
  label: 'WithoutSection',
  description: 'Description text',
};

Example.argTypes = { ...argTypes };

const Sections = Template(ComboBoxWrapper).bind({});

Sections.args = {
  defaultItems: withSection,
  defaultSelectedKey: 'key1',
  label: 'WithSection',
  description: 'Description text',
  disabledKeys: ['key3', 'key6'],
};

Sections.argTypes = { ...argTypes };

const InListItemTemplate = (props) => {
  return (
    <OverlayAlert>
      <div style={{ overflowY: 'scroll', height: '100px' }}>
        <ComboBoxWrapper {...props} />
      </div>
    </OverlayAlert>
  );
};

const InListItem = Template(InListItemTemplate).bind({});

InListItem.args = {
  defaultItems: withoutSection,
  label: 'InListItem',
  placeholder: 'long text overflow effect use case',
  listboxWidth: '20rem',
};

InListItem.argTypes = { ...argTypes };

const DynamicDataTemplate = (props: Props) => {
  const mockDynamicData = [
    { section: 'section1', items: [{ key: 'key-1', label: 'label-1' }] },
    { section: 'section2', items: [{ key: 'key-2', label: 'label-2' }] },
  ];
  const [dynamicData, setDynamicData] = useState(mockDynamicData);
  const [dynamicDataLength, setDynamicDataLength] = useState<number>(0);
  const [defaultItems, setDefaultItems] = useState<IComboBoxGroup[]>(dynamicData);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomText = Math.random().toString(36).substr(2, 10);
      mockDynamicData[Math.round(Math.random())].items.push({
        key: 'key-' + randomText,
        label: 'label-' + randomText,
      });
      setDynamicData(JSON.parse(JSON.stringify(mockDynamicData)));
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const length = dynamicData.reduce((total, current) => {
      return total + current.items.length;
    }, 0);
    setDynamicDataLength(length);
  }, [dynamicData]);

  const onOpenChange = useCallback((isOpen) => {
    setIsListOpen(isOpen);
  }, []);

  useEffect(() => {
    if (!isListOpen) {
      setDefaultItems(dynamicData);
    }
  }, [isListOpen, dynamicData]);

  return (
    <>
      <div style={{ margin: '20px 12px' }}>DynamicDataLength:{dynamicDataLength}</div>
      <div style={{ margin: '20px 12px' }}>
        For dynamic data, it is relatively controllable to not re-render when the list is opened,
        and to re-render when input changes.
      </div>
      <ComboBoxWrapper {...props} defaultItems={defaultItems} onOpenChange={onOpenChange} />
      <ComboBoxWrapper {...props} defaultItems={defaultItems} onOpenChange={onOpenChange} />
      <ComboBoxWrapper {...props} defaultItems={defaultItems} onOpenChange={onOpenChange} />
    </>
  );
};

const DynamicData = Template(DynamicDataTemplate).bind({});

DynamicData.args = {
  label: 'DynamicData',
  listboxWidth: '15rem',
};

DynamicData.argTypes = { ...argTypes };

export { Example, Sections, DynamicData, InListItem };
