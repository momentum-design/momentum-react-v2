import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ButtonSimple from '../ButtonSimple';
import ButtonPill from '../ButtonPill';
import List from '../List';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';
import Overlay from '../Overlay';

import OverlayTrigger, { OverlayTriggerProps } from './';
import argTypes from './OverlayTrigger.stories.args';
import Documentation from './OverlayTrigger.stories.docs.mdx';

export default {
  title: 'Momentum UI/OverlayTrigger',
  component: OverlayTrigger,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<OverlayTriggerProps>(OverlayTrigger).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  hoverOverlay: (
    <Overlay positioning="bottom" arrow="top" isPadded round={50}>
      <div>Hover Overlay</div>
    </Overlay>
  ),
  hoverPositioning: 'relative',
  pressOverlay: (
    <Overlay positioning="right" arrow="left" isPadded round={50}>
      <div>Press Overlay</div>
    </Overlay>
  ),
  pressPositioning: 'relative',
  trigger: <ButtonSimple>Button</ButtonSimple>,
};

const ComplexChildren = Template<OverlayTriggerProps>(OverlayTrigger).bind({});

ComplexChildren.argTypes = { ...argTypes };

ComplexChildren.args = {
  hoverOverlay: (
    <Overlay positioning="right" arrow="left" isPadded round={50}>
      <div>Hover Overlay - Informational</div>
    </Overlay>
  ),
  hoverPositioning: 'relative',
  pressOverlay: (
    <Overlay positioning="bottom" arrow="top" isPadded round={50}>
      <List listSize={5}>
        {Array.from(Array(5).keys()).map((index) => (
          <ListItemBase itemIndex={index} key={index} isPadded>
            <ListItemBaseSection>Press Item {index}</ListItemBaseSection>
          </ListItemBase>
        ))}
      </List>
    </Overlay>
  ),
  pressPositioning: 'relative',
  trigger: <ButtonSimple>Button</ButtonSimple>,
};

const Common = MultiTemplate<OverlayTriggerProps>(OverlayTrigger).bind({});

Common.argTypes = { ...argTypes };

Common.args = {
  hoverPositioning: 'relative',
  pressPositioning: 'relative',
};

Common.parameters = {
  variants: [
    {
      hoverPositioning: 'none',
      hoverOverlay: (
        <Overlay isPadded round={50}>
          <div>Hover Overlay</div>
        </Overlay>
      ),
      pressOverlay: (
        <Overlay isPadded round={50}>
          <div>Press Overlay</div>
        </Overlay>
      ),
      pressPositioning: 'none',
      trigger: <ButtonSimple>No positioning</ButtonSimple>,
    },
    {
      hoverPositioning: 'relative',
      hoverOverlay: (
        <Overlay arrow="right" positioning="left" isPadded round={50}>
          <div>Hover Overlay</div>
        </Overlay>
      ),
      pressOverlay: (
        <Overlay arrow="left" positioning="right" isPadded round={50}>
          <div>Press Overlay</div>
        </Overlay>
      ),
      pressPositioning: 'relative',
      trigger: <ButtonSimple>Left and Right Positioning</ButtonSimple>,
    },
    {
      hoverPositioning: 'relative',
      hoverOverlay: (
        <Overlay arrow="top" positioning="bottom" isPadded round={50}>
          <div>Hover Overlay</div>
        </Overlay>
      ),
      pressOverlay: (
        <Overlay arrow="bottom" positioning="top" isPadded round={50}>
          <div>Press Overlay</div>
        </Overlay>
      ),
      pressPositioning: 'relative',
      trigger: <ButtonSimple>Bottom and Top Positioning</ButtonSimple>,
    },
    {
      hoverPositioning: 'relative',
      hoverOverlay: (
        <Overlay arrow="top" positioning="bottom" isPadded round={50}>
          <div>Hover Overlay</div>
        </Overlay>
      ),
      preserveHoverOnPress: true,
      pressOverlay: (
        <Overlay arrow="left" positioning="right" isPadded round={50}>
          <div>Press Overlay</div>
        </Overlay>
      ),
      pressPositioning: 'relative',
      trigger: <ButtonSimple>Preserve Hover Overlay on Press</ButtonSimple>,
    },
    {
      hoverPositioning: 'relative',
      hoverOverlay: (
        <Overlay arrow="top" positioning="bottom" isPadded round={50}>
          <div>Hover Overlay</div>
        </Overlay>
      ),
      pressOverlay: (
        <Overlay arrow="left" positioning="right" isPadded round={50}>
          <div>Press Overlay</div>
        </Overlay>
      ),
      pressPositioning: 'relative',
      trigger: <ButtonPill color="join">Button Pill Example</ButtonPill>,
    },
  ],
};

export { Example, ComplexChildren, Common };
