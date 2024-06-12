import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import TooltipPopoverCombo, { TooltipPopoverComboProps } from './';
import Documentation from './TooltipPopoverCombo.stories.docs.mdx';

import React, { useState } from 'react';

import { Story } from '@storybook/react';
import Text from '../Text';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';
import Menu from '../Menu';
import { Item } from '@react-stately/collections';
import { PopoverInstance } from '../Popover/Popover.types';

export default {
  title: 'Momentum UI/TooltipPopoverCombo',
  component: TooltipPopoverCombo,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example: Story<TooltipPopoverComboProps> = () => {
  const triggerComponent = (
    <ButtonCircle
      size={40}
      color="cancel"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10rem auto', 
        display: 'flex'
      }}
      id="storybook-id-example"
    >
      <Icon name='cancel' weight='bold' strokeColor="transparent" />
    </ButtonCircle>);

    const [popoverInstance, setPopoverInstance] = useState<PopoverInstance>();

  const onItemPress = (key: string) => {
    switch (key) {
      default:
        popoverInstance?.hide();
    }
  };

  const popoverContent = (
    <Menu onAction={onItemPress} style={{width: '15rem'}}>
      <Item key="option-1" >Option 1</Item>
      <Item key="option-2" >Option 2</Item>
      </Menu>
  );

  return (
    <TooltipPopoverCombo 
      popoverContent={popoverContent} 
      triggerComponent={triggerComponent} 
      tooltipContent={<Text>Press to show options</Text>} 
      otherTooltipProps={{placement: 'top'}}
      otherPopoverProps={{placement: 'top', setInstance: setPopoverInstance}}
  />
  );
};

export { Example };
