import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Card, { CardProps, CARD_CONSTANTS as CONSTANTS } from './';
import { CARD_STATUS_CONSTANTS as STATUS_CONSTANTS } from './CardStatus';
import argTypes from './Card.stories.args';
import Documentation from './Card.stories.docs.mdx';

export default {
  title: 'Momentum UI/Card',
  component: Card,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const ChildWrapper = ({ children }: { children: string }) => (
  <div style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>{children}</div>
);

const Example = Template<CardProps>(Card).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: (
    <div style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>Example Text</div>
  ),
};

const Colors = MultiTemplate<CardProps>(Card).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.parameters = {
  variants: Object.values(CONSTANTS.COLORS).map((color) => ({
    children: <ChildWrapper>{color}</ChildWrapper>,
    color,
  })),
};

const Heights = MultiTemplate<CardProps>(Card).bind({});

Heights.argTypes = { ...argTypes };
delete Heights.argTypes.height;

Heights.parameters = {
  variants: Object.values(CONSTANTS.HEIGHTS).map((height) => ({
    children: <ChildWrapper>{height}</ChildWrapper>,
    height,
  })),
};

const Outlines = MultiTemplate<CardProps>(Card).bind({});

Outlines.argTypes = { ...argTypes };
delete Outlines.argTypes.outline;

Outlines.parameters = {
  variants: [true, false].map((outline) => ({
    children: <ChildWrapper>{`outline = ${outline}`}</ChildWrapper>,
    outline,
  })),
};

const Roundings = MultiTemplate<CardProps>(Card).bind({});

Roundings.argTypes = { ...argTypes };
delete Roundings.argTypes.rounding;

Roundings.parameters = {
  variants: Object.values(CONSTANTS.ROUNDINGS).map((rounding) => ({
    children: <ChildWrapper>{`rounding = ${rounding}`}</ChildWrapper>,
    rounding,
  })),
};

const StatusColors = MultiTemplate<CardProps>(Card).bind({});

StatusColors.argTypes = { ...argTypes };
delete StatusColors.argTypes.statusColor;

StatusColors.parameters = {
  variants: Object.values(STATUS_CONSTANTS.COLORS).map((statusColor) => ({
    children: <ChildWrapper>{`statusColor = ${statusColor}`}</ChildWrapper>,
    statusColor,
  })),
};

const StatusStripes = MultiTemplate<CardProps>(Card).bind({});

StatusStripes.argTypes = { ...argTypes };
delete StatusStripes.argTypes.statusStriped;

StatusStripes.args = {
  statusColor: STATUS_CONSTANTS.COLORS.SUCCESS,
};

StatusStripes.parameters = {
  variants: [true, false].map((statusStriped) => ({
    children: <ChildWrapper>{`statusStriped = ${statusStriped}`}</ChildWrapper>,
    statusStriped,
  })),
};

export { Example, Colors, Heights, Outlines, Roundings, StatusColors, StatusStripes };
