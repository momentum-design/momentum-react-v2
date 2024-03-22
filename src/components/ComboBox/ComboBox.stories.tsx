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


const ComboBoxWrapper = (props:Props) => {
  return (
      <ComboBox {...props}>
        {(group: IComboBoxGroup) => {
          const itemsEle = group?.items?.map((menuItem: IComboBoxItem) => {
            return (<Item key={menuItem.key} textValue={menuItem.label}>  
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
      </ComboBox>
  );
};




const withoutSection: IComboBoxGroup[] = [
  {
    items:[
      {key:'key1',label:'item1'},
      {key:'key2',label:'item2'},
      {key:'key3',label:'item3'},
    ]
  },
];

const withSection: IComboBoxGroup[] = [
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

const Example = Template(ComboBoxWrapper).bind({});

Example.args = {
  placeholder: 'placeholder',
  comboBoxGroups: withoutSection,
  disabledKeys: ['key3'],
  label:'WithoutSection',
  description:'Description text',
};

Example.argTypes = { ...argTypes };

const Sections = Template(ComboBoxWrapper).bind({});

Sections.args = {
  comboBoxGroups: withSection,
  selectedKey: 'key1',
  label:'WithSection',
  description:'Description text',
  disabledKeys: ['key3','key6'],
};


Sections.argTypes = { ...argTypes };

const InListItemTemplate = (props:Props) => {
  return (
    <OverlayAlert>
      <div style={{ overflowY: 'scroll', height:'100px'}}>
          <ComboBoxWrapper {...props} />
      </div>
    </OverlayAlert>
  );
};

const InListItem = Template(InListItemTemplate).bind({});

InListItem.args = {
  comboBoxGroups: withSection,
  label:'InListItem',
  placeholder:'long text overflow effect use case'
};


InListItem.argTypes = { ...argTypes };

const MultipleComboBoxTemplate = (props:Props) => {
  return (
    <>
      <ComboBoxWrapper {...props} />
      <ComboBoxWrapper {...props} />
      <ComboBoxWrapper {...props} />
    </>
  );
};

const MultipleComboBox = Template(MultipleComboBoxTemplate).bind({});

MultipleComboBox.args = {
  comboBoxGroups:withSection,
  label:'MultipleComboBox',
};

MultipleComboBox.argTypes = { ...argTypes };

const DynamicDataTemplate = (props:Props) => {
  const mockDynamicData = [{section:'section1',items:[{key:'key-1',label:'label-1'}]},{section:'section2',items:[{key:'key-2',label:'label-2'}]}];
  const [dynamicData,setDynamicData] = useState(mockDynamicData);
  const [dynamicDataLength,setDynamicDataLength] = useState<number>(0);
  const [comboBoxGroups,setComboBoxGroups] = useState<IComboBoxGroup[]>(dynamicData);
  const [isListOpen,setIsListOpen] = useState<boolean>(false);

  useEffect(()=>{
    const timer = setInterval(()=>{
      const randomText = Math.random().toString(36).substr(2, 10);
      mockDynamicData[Math.round(Math.random())].items.push({key:'key-'+randomText,label:'label-'+randomText});
      setDynamicData(JSON.parse(JSON.stringify(mockDynamicData)));
    },2000);
    return ()=>{
      clearInterval(timer);
    };
  },[]);

  useEffect(()=>{
    const length = dynamicData.reduce((total, current) => {
      return total + current.items.length;
    }, 0);
    setDynamicDataLength(length);
  },[dynamicData]);

  const openStateChange = useCallback((isOpen)=>{
    setIsListOpen(isOpen);
  },[]);

  const onInputChange = useCallback(()=>{
    setComboBoxGroups(dynamicData);
  },[dynamicData]);

  useEffect(()=>{
    if(!isListOpen){
      setComboBoxGroups(dynamicData);
    }
  },[isListOpen,dynamicData]);

  return (
    <>
      <div style={{margin:'20px 12px'}}>DynamicDataLength:{dynamicDataLength}</div>
      <div style={{margin:'20px 12px'}}>For dynamic data, it is relatively controllable to not re-render when the list is opened, and to re-render when input changes.</div>
      <ComboBoxWrapper {...props} comboBoxGroups={comboBoxGroups} openStateChange={openStateChange} onInputChange={onInputChange}/>
      <ComboBoxWrapper {...props} comboBoxGroups={comboBoxGroups} openStateChange={openStateChange} onInputChange={onInputChange}/>
      <ComboBoxWrapper {...props} comboBoxGroups={comboBoxGroups} openStateChange={openStateChange} onInputChange={onInputChange}/>
    </>
  );
};

const DynamicData = Template(DynamicDataTemplate).bind({});

DynamicData.args = {
  label:'DynamicData',
};

DynamicData.argTypes = { ...argTypes };


export { Example, Sections, InListItem, MultipleComboBox, DynamicData };
