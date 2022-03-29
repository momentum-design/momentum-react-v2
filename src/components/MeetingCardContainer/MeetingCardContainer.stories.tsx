import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import MeetingCardContainer, {
  MeetingCardContainerProps,
  MEETING_CARD_CONTAINER_CONSTANTS as CONSTANTS,
} from './';
import { MEETING_CARD_CONTAINER_STATUS_CONSTANTS as STATUS_CONSTANTS } from './MeetingCardContainerStatus';
import argTypes from './MeetingCardContainer.stories.args';
import Documentation from './MeetingCardContainer.stories.docs.mdx';

export default {
  title: 'Momentum UI/MeetingCardContainer',
  component: MeetingCardContainer,
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

const Example = Template<MeetingCardContainerProps>(MeetingCardContainer).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: (
    <div style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>Example Text</div>
  ),
};

const Colors = MultiTemplate<MeetingCardContainerProps>(MeetingCardContainer).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.parameters = {
  variants: Object.values(CONSTANTS.COLORS).map((color) => ({
    children: <ChildWrapper>{color}</ChildWrapper>,
    color,
  })),
};

const Heights = MultiTemplate<MeetingCardContainerProps>(MeetingCardContainer).bind({});

Heights.argTypes = { ...argTypes };
delete Heights.argTypes.height;

Heights.parameters = {
  variants: Object.values(CONSTANTS.HEIGHTS).map((height) => ({
    children: <ChildWrapper>{height}</ChildWrapper>,
    height,
  })),
};

const Outlines = MultiTemplate<MeetingCardContainerProps>(MeetingCardContainer).bind({});

Outlines.argTypes = { ...argTypes };
delete Outlines.argTypes.outline;

Outlines.parameters = {
  variants: [true, false].map((outline) => ({
    children: <ChildWrapper>{`outline = ${outline}`}</ChildWrapper>,
    outline,
  })),
};

const Roundings = MultiTemplate<MeetingCardContainerProps>(MeetingCardContainer).bind({});

Roundings.argTypes = { ...argTypes };
delete Roundings.argTypes.rounding;

Roundings.parameters = {
  variants: Object.values(CONSTANTS.ROUNDINGS).map((rounding) => ({
    children: <ChildWrapper>{`rounding = ${rounding}`}</ChildWrapper>,
    rounding,
  })),
};

const StatusColors = MultiTemplate<MeetingCardContainerProps>(MeetingCardContainer).bind({});

StatusColors.argTypes = { ...argTypes };
delete StatusColors.argTypes.statusColor;

StatusColors.parameters = {
  variants: Object.values(STATUS_CONSTANTS.COLORS).map((statusColor) => ({
    children: <ChildWrapper>{`rounding = ${statusColor}`}</ChildWrapper>,
    statusColor,
  })),
};

const StatusStripes = MultiTemplate<MeetingCardContainerProps>(MeetingCardContainer).bind({});

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

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Colors, Heights, Outlines, Roundings, StatusColors, StatusStripes };
