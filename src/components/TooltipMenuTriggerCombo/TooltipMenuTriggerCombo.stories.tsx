import React, { useState } from 'react';
import { DocumentationPage } from '../../storybook/helper.stories.docs';

import TooltipMenuTriggerCombo from './';
import Documentation from './TooltipMenuTriggerCombo.stories.docs.mdx';
import Menu from '../Menu';
import { Item } from '@react-stately/collections';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import { StoryObj } from '@storybook/react';
import ButtonCircle from '../ButtonCircle';

export default {
  title: 'Momentum UI/TooltipMenuTriggerCombo',
  component: TooltipMenuTriggerCombo,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation),
    },
  },
};

const ExampleStory = ({ isPill }: { isPill: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const icon = <Icon name={isOpen ? 'arrow-up' : 'arrow-down'} weight="bold" autoScale={100} />;

  return (
    <TooltipMenuTriggerCombo
      menuContent={
        <Menu selectionMode="single" key="2">
          <Item key="one">This is a longer text and should trim nicely...</Item>
          <Item key="two">Two</Item>
          <Item key="three">Three</Item>
          <Item key="four">Four</Item>
          <Item key="five">Five</Item>
          <Item key="six">Six</Item>
        </Menu>
      }
      menuTriggerProps={{
        closeOnSelect: true,
        onOpenChange: setIsOpen,
      }}
      tooltipContent={<>Tooltip</>}
      tooltipProps={{
        type: 'label',
      }}
      triggerComponent={
        isPill ? (
          <ButtonPill>
            <div>Menu</div> {icon}
          </ButtonPill>
        ) : (
          <ButtonCircle>{icon}</ButtonCircle>
        )
      }
    />
  );
};

const Example: StoryObj = {
  // eslint-disable-next-line react/display-name
  render: () => (
    <>
      <ExampleStory isPill={true} />
      <ExampleStory isPill={false} />
    </>
  ),
};

const WithDescriptionTooltip: StoryObj = {
  // eslint-disable-next-line react/display-name
  render: () => (
    <TooltipMenuTriggerCombo
      menuContent={
        <Menu selectionMode="single" key="2">
          <Item key="one">This is a longer text and should trim nicely...</Item>
          <Item key="two">Two</Item>
          <Item key="three">Three</Item>
          <Item key="four">Four</Item>
          <Item key="five">Five</Item>
          <Item key="six">Six</Item>
        </Menu>
      }
      tooltipContent={'This is a description'}
      tooltipProps={{
        type: 'description',
      }}
      triggerComponent={<ButtonPill>Open Menu</ButtonPill>}
    />
  ),
};

export { Example, WithDescriptionTooltip };
