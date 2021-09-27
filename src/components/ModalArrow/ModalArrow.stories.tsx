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

const Example = Template<ModalArrowProps>(ModalArrow).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  color: CONSTANTS.COLORS.TERTIARY,
  side: CONSTANTS.SIDES.BOTTOM,
};

const Colors = MultiTemplate<ModalArrowProps>(ModalArrow).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.args = {
  side: CONSTANTS.SIDES.BOTTOM,
};

Colors.parameters = {
  variants: [
    ...Object.values(CONSTANTS.COLORS).map((color) => ({ color, style: { margin: '1rem' } })),
  ],
};

const Sides = MultiTemplate<ModalArrowProps>(ModalArrow).bind({});

Sides.argTypes = { ...argTypes };
delete Sides.argTypes.side;

Sides.args = {
  color: CONSTANTS.COLORS.TERTIARY,
};

Sides.parameters = {
  variants: [
    ...Object.values(CONSTANTS.SIDES).map((side) => ({ side, style: { margin: '1rem' } })),
  ],
};

const Common = MultiTemplate<ModalArrowProps>(ModalArrow).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.color;
delete Common.argTypes.side;

Common.parameters = {
  variants: [
    ...Object.values(CONSTANTS.SIDES).map((side) =>
      Object.values(CONSTANTS.COLORS).map((color) => ({
        color,
        side,
        style: { margin: '1rem' },
      }))
    ),
  ].flat(),
};

export { Example, Colors, Sides, Common };
