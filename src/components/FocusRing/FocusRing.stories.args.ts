export default {
  children: {
    description: 'Child element to apply CSS classes to.',

    table: {
      type: {
        summary: 'ReactElement',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  autoFocus: {
    description: 'Whether the element will be auto focused.',
    control: { type: 'boolean' },
    table: {
      category: 'React Aria - Focus Ring',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  focusClass: {
    description: 'CSS class to apply when the element is focused.',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Focus Ring',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  focusRingClass: {
    description: 'CSS class to apply when the element has keyboard focus.',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Focus Ring',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isTextInput: {
    description: 'Whether the element is a text input.',
    control: { type: 'boolean' },
    table: {
      category: 'React Aria - Focus Ring',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  within: {
    description:
      'Whether to show the focus ring when something inside the container element has focus (true), or only if the container itself has focus (false).',
    control: { type: 'boolean' },
    table: {
      category: 'React Aria - Focus Ring',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
