import { commonStyles } from '../../storybook/helper.stories.argtypes';

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
    control: { type: 'select', options: ['left', 'center'] },
    table: {
      type: {
        summary: "'left' or 'center'",
      },
      defaultValue: {
        summary: 'center',
      },
    },
  },
};

export { textToastArgTypes };

export default {
  ...commonStyles,
  ...textToastArgTypes,
};
