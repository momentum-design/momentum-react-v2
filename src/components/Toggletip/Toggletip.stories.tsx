import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Documentation from './Toggletip.stories.docs.mdx';
import Toggletip, { ToggletipProps } from './';
import Text from '../Text';
import ButtonPill from '../ButtonPill';
import ButtonSimple from '../ButtonSimple';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import argTypes from './Toggletip.stories.args';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import Icon from '../Icon';
import Flex from '../Flex';
import Popover from '../Popover';
import ButtonCircle from '../ButtonCircle';

export default {
  title: 'Momentum UI/Toggletip',
  component: Toggletip,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ToggletipProps>(Toggletip).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  placement: PLACEMENTS.AUTO,
  variant: 'small',
  color: COLORS.PRIMARY,
  delay: [0, 0],
  children: <p>Toggletip</p>,
  triggerComponent: (
    <ButtonCircle
      ghost
      size={64}
      aria-label="About toggletip"
      style={{ margin: '10rem auto', display: 'flex' }}
    >
      <Icon name="info-badge" weight="filled" scale={32} />
    </ButtonCircle>
  ),
};

const Common = MultiTemplate<ToggletipProps>(Toggletip).bind({});

Common.argTypes = { ...argTypes };

Common.args = {};
Common.parameters = {
  variants: [
    {
      children: <p>Label toggletip TERTIARY color, variant medium</p>,
      triggerComponent: (
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonSimple>
      ),
      placement: PLACEMENTS.RIGHT,
      variant: 'medium',
      color: COLORS.TERTIARY,
    },
    {
      children: <p>Toggletip, PRIMARY color, variant small</p>,
      triggerComponent: (
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonSimple>
      ),
      placement: PLACEMENTS.BOTTOM_START,
      variant: 'small',
      color: COLORS.PRIMARY,
    },
    {
      children: <p>Toggletip, SECONDARY color, variant medium, showDelay 500ms</p>,
      triggerComponent: (
        <ButtonSimple>
          Click me! <br /> Open with delay
        </ButtonSimple>
      ),
      placement: PLACEMENTS.LEFT_START,
      delay: [500],
      variant: 'medium',
      color: COLORS.SECONDARY,
    },
  ],
};

const Offset = Template<ToggletipProps>(Toggletip).bind({});

Offset.argTypes = { ...argTypes };

Offset.args = {
  placement: PLACEMENTS.RIGHT,
  variant: 'small',
  color: COLORS.TERTIARY,
  delay: [0, 0],
  offsetDistance: -150,
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex', width: '30rem' }}>
      Click me!
    </ButtonPill>
  ),
  children: (
    <Flex style={{ width: '10rem', height: '10rem' }} justifyContent="center" alignItems="center">
      <Text type="display">🏖</Text>
    </Flex>
  ),
};

const MultiplePopovers = Template<ToggletipProps>((args: ToggletipProps) => {
  const triggerComponent = (
    <Toggletip
      placement={PLACEMENTS.BOTTOM}
      triggerComponent={
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonSimple>
      }
    >
      Description toggletip on click
    </Toggletip>
  );
  return <Popover {...args} triggerComponent={triggerComponent} />;
}).bind({});

MultiplePopovers.argTypes = { ...argTypes };

MultiplePopovers.args = {
  placement: PLACEMENTS.TOP,
  children: 'Popover content on click',
};

export { Example, Common, Offset, MultiplePopovers };
