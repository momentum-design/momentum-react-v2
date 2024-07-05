import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ModalArrow, { ModalArrowProps, MODAL_ARROW_CONSTANTS as CONSTANTS } from './';
import argTypes from './ModalArrow.stories.args';
import Documentation from './ModalArrow.stories.docs.mdx';

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

const Example = Template<ModalArrowProps>(ModalArrow);

Example.argTypes = { ...argTypes };

Example.args = {
  color: CONSTANTS.COLORS.TERTIARY,
  placement: CONSTANTS.PLACEMENTS.BOTTOM,
};

const Colors = MultiTemplate<ModalArrowProps>(ModalArrow);

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

const Placements = MultiTemplate<ModalArrowProps>(ModalArrow);

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

const Common = MultiTemplate<ModalArrowProps>(ModalArrow);

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
