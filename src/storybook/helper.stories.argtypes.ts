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
  'aria-details': {
    control: { type: 'text' },
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Sets the `aria-details` value.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  'aria-label': {
    control: { type: 'text' },
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Sets the `aria-label` value.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const commonStyles = {
  className: {
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

const commonAriaOverlay = {
  isOpen: {
    description: 'Whether the overlay is open by default (controlled)',
    control: { type: 'boolean' },
    table: {
      category: 'React Aria - Overlay',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  defaultOpen: {
    description: 'Whether the overlay is open by default (uncontrolled)',
    control: { type: 'boolean' },
    table: {
      category: 'React Aria - Overlay',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  onOpenChange: {
    action: 'onOpenChange',
    description: "Handler that is called when the overlay's open state changes.",
    table: {
      category: 'React Aria - Overlay',
      type: {
        summary: '(isOpen: boolean) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { commonAriaButton, commonAriaOverlay, commonStyles };
