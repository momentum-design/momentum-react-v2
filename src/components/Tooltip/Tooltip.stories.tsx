import React from 'react';
import { Template } from '../../storybook/helper.stories.templates';
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

const Example = Template<TooltipProps>(Tooltip).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  placement: PLACEMENTS.AUTO,
  variant: 'small',
  color: COLORS.PRIMARY,
  delay: [0, 0],
  children: <p>Tooltip</p>,
  isDescription: true,
  triggerComponent: (
    <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Hover me!</ButtonSimple>
  ),
};

const Offset = Template<TooltipProps>(Tooltip).bind({});

Offset.argTypes = { ...argTypes };

Offset.args = {
  placement: PLACEMENTS.RIGHT,
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

export { Example, Offset };
