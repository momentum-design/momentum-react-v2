/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { Item, Section } from '@react-stately/collections';
import Combobox from '.';

import { DocumentationPage } from '../../storybook/helper.stories.docs';

import Documentation from './Combobox.documentation.mdx';

import StyleDocs from '../../storybook/docs.stories.style.mdx';
import argTypes from './Combobox.stories.args';

import { Template } from '../../storybook/helper.stories.templates';
import { IComboboxGroup, IComboboxItem, Props } from './Combobox.types';
import OverlayAlert from '../OverlayAlert';


export default {
  title: 'Momentum UI/Combobox',
  component: Combobox,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};


const ComboboxWrapper = (props:Props) => {
  return (
      <Combobox {...props}>
        {(group: IComboboxGroup) => {
          const itemsEle = group?.items?.map((menuItem: IComboboxItem) => {
            return (<Item key={menuItem.key} textValue={menuItem.key}>
                <div key={menuItem.key+'-label'}>{menuItem.label}</div>
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
      </Combobox>
  );
};




const withoutSection: IComboboxGroup[] = [
  {
    items:[
      {key:'key1',label:'item1'},
      {key:'key2',label:'item2'},
      {key:'key3',label:'item3'},
    ]
  },
];

const withSection: IComboboxGroup[] = [
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

const Example = Template(ComboboxWrapper).bind({});

Example.args = {
  placeholder: 'placeholder',
  comboboxGroups: withoutSection,
  disabledKeys: ['key3'],
  label:'WithoutSection',
  description:'Description text',
};

Example.argTypes = { ...argTypes };

const Sections = Template(ComboboxWrapper).bind({});

Sections.args = {
  comboboxGroups: withSection,
  selectedKey: 'key1',
  label:'WithSection',
  description:'Description text',
  disabledKeys: ['key3','key6'],
};


Sections.argTypes = { ...argTypes };

const InListItemTemplate = (props:Props) => {
  return (
    <OverlayAlert>
      <div style={{ overflowY: 'scroll' }}>
        <ComboboxWrapper {...props} />
      </div>
    </OverlayAlert>
  );
};

const InListItem = Template(InListItemTemplate).bind({});

InListItem.args = {
  comboboxGroups: withSection,
  label:'InListItem',
  placeholder:'long text overflow effect use case'
};


InListItem.argTypes = { ...argTypes };

const MultipleComboboxTemplate = (props:Props) => {
  return (
    <>
      <ComboboxWrapper {...props} />
      <ComboboxWrapper {...props} />
      <ComboboxWrapper {...props} />
    </>
  );
};

const MultipleCombobox = Template(MultipleComboboxTemplate).bind({});

MultipleCombobox.args = {
  comboboxGroups: withSection,
  label:'MultipleCombobox',
};

MultipleCombobox.argTypes = { ...argTypes };

export { Example, Sections, InListItem, MultipleCombobox };
