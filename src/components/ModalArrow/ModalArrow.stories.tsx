import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import argTypes from './ModalArrow.stories.args';
import Documentation from './ModalArrow.stories.docs.mdx';

import ModalArrow, { ModalArrowProps, MODAL_ARROW_CONSTANTS as CONSTANTS } from './';

export default {
  title: 'Momentum UI/ModalArrow',
  component: ModalArrow,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ModalArrowProps>(ModalArrow).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  color: CONSTANTS.COLORS.TERTIARY,
  placement: CONSTANTS.PLACEMENTS.BOTTOM,
};

const Colors = MultiTemplate<ModalArrowProps>(ModalArrow).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.args = {
  placement: CONSTANTS.PLACEMENTS.BOTTOM,
};

Colors.parameters = {
  variants: [
    ...Object.values(CONSTANTS.COLORS).map((color) => ({ color, style: { margin: '1rem' } })),
  ],
};

const Placements = MultiTemplate<ModalArrowProps>(ModalArrow).bind({});

Placements.argTypes = { ...argTypes };
delete Placements.argTypes.placement;

Placements.args = {
  color: CONSTANTS.COLORS.TERTIARY,
};

Placements.parameters = {
  variants: [
    ...Object.values(CONSTANTS.PLACEMENTS).map((placement) => ({
      placement,
      style: { margin: '1rem' },
    })),
  ],
};

const Common = MultiTemplate<ModalArrowProps>(ModalArrow).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.color;
delete Common.argTypes.placement;

Common.parameters = {
  variants: [
    ...Object.values(CONSTANTS.PLACEMENTS).map((placement) =>
      Object.values(CONSTANTS.COLORS).map((color) => ({
        color,
        placement,
        style: { margin: '1rem' },
      }))
    ),
  ].flat(),
};

export { Example, Colors, Placements, Common };
