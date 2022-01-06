import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Documentation from './Popover.stories.docs.mdx';

import Popover, { PopoverProps } from './';
import List from '../List';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';
import { COLORS } from './Arrow.constants';
import argTypes from './Popover.stories.args';

export default {
  title: 'Momentum UI/Popover',
  component: Popover,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<PopoverProps>(Popover).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: <p>Content Text Content Text</p>,
  trigger: 'click',
  triggerComponent: <button style={{ height: '250px', width: '250px' }}>Click me!</button>,
  placement: 'bottom',
  interactive: false,
  containerProps: {
    isPadded: true,
    round: 25,
    offset: 5,
  },
  color: COLORS.TERTIARY,
};

const InteractiveContent = Template<PopoverProps>(Popover).bind({});

InteractiveContent.argTypes = { ...argTypes };

InteractiveContent.args = {
  children: (
    <List listSize={5}>
      {Array.from(Array(5).keys()).map((index) => (
        <ListItemBase itemIndex={index} key={index} isPadded>
          <ListItemBaseSection>Press Item {index}</ListItemBaseSection>
        </ListItemBase>
      ))}
    </List>
  ),
  trigger: 'click',
  triggerComponent: <button style={{ height: '50px', width: '100px' }}>Click me!</button>,
  placement: 'bottom',
  interactive: true,
  containerProps: {
    isPadded: true,
    round: 25,
    offset: 5,
  },
  color: COLORS.TERTIARY,
};

const Common = MultiTemplate<PopoverProps>(Popover).bind({});

Common.argTypes = { ...argTypes };

Common.args = {};
Common.parameters = {
  variants: [
    {
      children: <p>Non-interactive Content on TERTIARY color, round 25, offset 5px</p>,
      trigger: 'click',
      triggerComponent: (
        <button style={{ height: '50px', width: '100px', marginRight: '10px' }}>Click me!</button>
      ),
      placement: 'right',
      interactive: false,
      containerProps: {
        isPadded: true,
        round: 25,
        offset: 5,
      },
      color: COLORS.TERTIARY,
    },
    {
      children: <p>Non-interactive Content on PRIMARY color, round 100, offset 15px</p>,
      trigger: 'mouseenter',
      triggerComponent: (
        <button style={{ height: '50px', width: '100px', marginRight: '10px' }}>Hover me!</button>
      ),
      placement: 'bottom-start',
      interactive: false,
      containerProps: {
        isPadded: true,
        round: 100,
        offset: 15,
      },
      color: COLORS.PRIMARY,
    },
    {
      children: <p>Interactive Content on SECONDARY color, round 0, offset 25px</p>,
      trigger: 'click mouseenter',
      triggerComponent: (
        <button style={{ height: '50px', width: '175px', marginRight: '10px' }}>
          Click or hover me!
        </button>
      ),
      placement: 'left-start',
      interactive: true,
      containerProps: {
        isPadded: true,
        round: 0,
        offset: 25,
      },
      color: COLORS.SECONDARY,
    },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, InteractiveContent, Common };
