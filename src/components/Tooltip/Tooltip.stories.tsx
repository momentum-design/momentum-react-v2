import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Documentation from './Tooltip.stories.docs.mdx';
import Text from '../Text';
import Tooltip, { TooltipProps } from './';
import ButtonPill from '../ButtonPill';
import ButtonSimple from '../ButtonSimple';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import argTypes from './Tooltip.stories.args';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import Flex from '../Flex';
import Popover from '../Popover';

export default {
  title: 'Momentum UI/Tooltip',
  component: Tooltip,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<TooltipProps>(Tooltip);

Example.argTypes = { ...argTypes };

Example.args = {
  placement: PLACEMENTS.AUTO,
  variant: 'small',
  color: COLORS.PRIMARY,
  delay: [0, 0],
  children: <p>Tooltip</p>,
  type: 'description',
  triggerComponent: (
    <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Hover me!</ButtonSimple>
  ),
};

const Common = MultiTemplate<TooltipProps>(Tooltip);

Common.argTypes = { ...argTypes };

Common.args = {};
Common.parameters = {
  variants: [
    {
      children: <p>Label tooltip TERTIARY color, variant medium</p>,
      type: 'label',
      triggerComponent: (
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>
          Hover me for label!
        </ButtonSimple>
      ),
      placement: PLACEMENTS.RIGHT,
      variant: 'medium',
      color: COLORS.TERTIARY,
    },
    {
      children: <p>Label tooltip, without label overwriteTERTIARY color, variant medium</p>,
      type: 'none',
      triggerComponent: (
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>
          Hover me for label!
        </ButtonSimple>
      ),
      placement: PLACEMENTS.RIGHT,
      variant: 'medium',
      color: COLORS.TERTIARY,
    },
    {
      children: <p>Description tooltip, PRIMARY color, variant small</p>,
      type: 'description',
      triggerComponent: (
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>
          Hover me for description!
        </ButtonSimple>
      ),
      placement: PLACEMENTS.BOTTOM_START,
      variant: 'small',
      color: COLORS.PRIMARY,
    },
    {
      children: <p>Description tooltip, SECONDARY color, variant medium, showDelay 500ms</p>,
      type: 'description',
      triggerComponent: (
        <ButtonSimple>
          Hover me for description! <br /> With delay
        </ButtonSimple>
      ),
      placement: PLACEMENTS.LEFT_START,
      delay: [500],
      variant: 'medium',
      color: COLORS.SECONDARY,
    },
  ],
};

const Offset = Template<TooltipProps>(Tooltip);

Offset.argTypes = { ...argTypes };

Offset.args = {
  placement: PLACEMENTS.RIGHT,
  type: 'label',
  variant: 'small',
  color: COLORS.TERTIARY,
  delay: [0, 0],
  offsetDistance: -150,
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex', width: '30rem' }}>
      Hover me!
    </ButtonPill>
  ),
  children: (
    <Flex style={{ width: '10rem', height: '10rem' }} justifyContent="center" alignItems="center">
      <Text type="display">🏖</Text>
    </Flex>
  ),
};

const MultiplePopovers = Template<TooltipProps>((args: TooltipProps) => {
  const triggerComponent = (
    <Tooltip
      placement={PLACEMENTS.BOTTOM}
      type={'description'}
      triggerComponent={
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>
          Hover or click me!
        </ButtonSimple>
      }
    >
      Description tooltip on hover
    </Tooltip>
  );
  return <Popover {...args} triggerComponent={triggerComponent} />;
});

MultiplePopovers.argTypes = { ...argTypes };

MultiplePopovers.args = {
  placement: PLACEMENTS.TOP,
  children: 'Popover content on click',
};

export { Example, Common, Offset, MultiplePopovers };
