import { commonStyles } from 'storybook/helper.stories.argtypes';

import { ALIGNMENTS } from './TextToast.constants';

const textToastArgTypes = {
  text: {
    description: 'Text to be displayed in TextToast component',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  textAlignment: {
    description: 'Alignment of the Text in the TextToast component.',
    control: { type: 'select', options: [undefined, ...Object.values(ALIGNMENTS)] },
    table: {
      type: {
        summary: Object.values(ALIGNMENTS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: 'center',
      },
    },
  },
  iconProps: {
    description: `IconProps to be passed in - allows defining the icon which should
    be shown on the left-hand side of the text. At least the \`name\` property
    should be passed in through the object, otherwise the Icon will not be shown.`,
    control: { type: 'object' },
    table: {
      type: {
        summary: 'object',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { textToastArgTypes };

export default {
  ...commonStyles,
  ...textToastArgTypes,
};
