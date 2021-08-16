const commonAriaButton = {
  onPress: {
    action: 'onPress',
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Handler that is called when the press is released over the target.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '(e: PressEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  autoFocus: {
    action: 'autoFocus',
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Whether the element should receive focus on render.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Handler that is called when a key is pressed.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '(e: KeyboardEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const commonStyles = {
  className: {
    defaultValue: undefined,
    description: "If present, this value will be added to the rendered element's `class` attribute",
    control: { type: 'text' },
    table: {
      category: 'Stylization',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  id: {
    defaultValue: undefined,
    description:
      "If present, this value will be this component's the rendered element's `id` attribute",
    control: { type: 'text' },
    table: {
      category: 'Stylization',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  style: {
    defaultValue: undefined,
    description:
      "If present, this value will be this component's the rendered element's `id` attribute",
    control: { type: 'object' },
    table: {
      category: 'Stylization',
      type: {
        summary: 'CSSProperties',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { commonAriaButton, commonStyles };
