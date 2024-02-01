/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { Item, Section } from '@react-stately/collections';
import InputSelect from '.';

import { DocumentationPage } from '../../storybook/helper.stories.docs';

import Documentation from './InputSelect.documentation.mdx';

import StyleDocs from '../../storybook/docs.stories.style.mdx';
import argTypes from './InputSelect.stories.args';

import { Template } from '../../storybook/helper.stories.templates';
import { IInputSelectGroup, IInputSelectItem, Props } from './InputSelect.types';
import { action } from '@storybook/addon-actions';


export default {
  title: 'Momentum UI/InputSelect',
  component: InputSelect,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const InputSelectWrapper = (props:Props) => {
  return (
      <InputSelect {...props}>
        {(group: IInputSelectGroup) => {
          const itemsEle = group?.items?.map((menuItem: IInputSelectItem) => {
            return (<Item key={menuItem.key} textValue={menuItem.label}>
                <div>{menuItem.label}</div>
              </Item>);
          });

          return group.section ? (
            <Section title={group.section} key={group.section}>
              {itemsEle}
            </Section>
          ) : (
            <Section key="noSection">{itemsEle}</Section>
          );
        }}
      </InputSelect>
  );
};

const withoutSection: IInputSelectGroup[] = [
  {
    section:'',
    items:[
      {key:'key1',label:'item1'},
      {key:'key2',label:'item2'},
      {key:'key3',label:'item3'},
    ]
  },
];

const withSection: IInputSelectGroup[] = [
  {
    section:'section1',
    items:[
      {key:'key1',label:'item1'},
      {key:'key2',label:'item2'},
      {key:'key3',label:'item3'},
      {key:'key4',label:'item4'}
    ]
  },
  {
    section:'section2',
    items:[
      {key:'key5',label:'item5'},
      {key:'key6',label:'item6'},
      {key:'key7',label:'item7'},
      {key:'key8',label:'item8'}
    ]
  },
];

const Example = Template(InputSelectWrapper).bind({});

Example.args = {
  placeholder: 'placeholder',
  items: withoutSection,
  disabledKeys: ['key3'],
  label:'WithoutSection',
  description:'Description text',
  onAction:action('onAction'),
};

Example.argTypes = { ...argTypes };

const Sections = Template(InputSelectWrapper).bind({});

Sections.args = {
  items: withSection,
  selectedKey: 'key1',
  disabledKeys: ['key3','key6'],
  label:'WithSection',
  description:'Description text',
  iconScale:12,
};


Sections.argTypes = { ...argTypes };


export { Example, Sections};
