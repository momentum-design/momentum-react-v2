import { ArgTypes } from '@storybook/react';

function extendArgTypes(
  name: string,
  argTypes: ArgTypes,
  removeKeys: Array<string> = []
): ArgTypes {
  const deepClone: ArgTypes = JSON.parse(JSON.stringify(argTypes));
  return Object.fromEntries(
    Object.entries(deepClone).reduce((accumulation, [key, value]) => {
      if (removeKeys.includes(key)) {
        return accumulation;
      }

      value.table.category = `From <${name} />`;

      accumulation.push([key, value]);

      return accumulation;
    }, [])
  );
}

const commonAriaDialog = {
  role: {
    control: { type: 'select' },
    description: 'The accessibility role for the dialog.',
    options: [undefined, 'dialog', 'alertdialog'],
    table: {
      category: 'React Aria - Dialog',
      type: {
        summary: '"dialog" | "alertdialog"',
      },
      defaultValue: {
        summary: '"dialog"',
      },
    },
  },
  'aria-Label': {
    control: { type: 'text' },
    description: 'Defines a string value that labels the current element.',
    table: {
      category: 'React Aria - Dialog',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  'aria-labelledby': {
    control: { type: 'text' },
    description: 'Identifies the element (or elements) that labels the current element.',
    table: {
      category: 'React Aria - Dialog',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  'aria-describedby': {
    control: { type: 'text' },
    description: 'Identifies the element (or elements) that describes the object.',
    table: {
      category: 'React Aria - Dialog',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  'aria-details': {
    control: { type: 'text' },
    description:
      'Identifies the element (or elements) that provide a detailed, extended description for the object.',
    table: {
      category: 'React Aria - Dialog',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const commonAriaFocusScope = {
  autoFocus: {
    control: { type: 'boolean' },
    description: 'Whether to auto focus the first focusable element in the focus scope on mount.',
    table: {
      category: 'React Aria - Focus Scope',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  contain: {
    control: { type: 'boolean' },
    description:
      'Whether to contain focus inside the scope, so users cannot move focus outside, for example in a modal dialog.',
    table: {
      category: 'React Aria - Focus Scope',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  restoreFocus: {
    control: { type: 'boolean' },
    description:
      'Whether to restore focus back to the element that was focused when the focus scope mounted, after the focus scope unmounts.',
    table: {
      category: 'React Aria - Focus Scope',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
};

const commonAriaHover = {
  isDisabled: {
    control: { type: 'boolean' },
    description: 'Whether this components events should be disabled.',
    table: {
      category: 'React Aria - Hover',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onHoverStart: {
    control: { type: 'none' },
    description: 'Handler that is called when the hover interaction starts',
    table: {
      category: 'React Aria - Hover',
      type: {
        summary: '(e: HoverEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onHoverEnd: {
    control: { type: 'none' },
    description: 'Handler that is called when the hover interaction ends',
    table: {
      category: 'React Aria - Hover',
      type: {
        summary: '(e: HoverEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onHoverChange: {
    control: { type: 'none' },
    description: 'Handler that is called when the hover state changes',
    table: {
      category: 'React Aria - Hover',
      type: {
        summary: '(isHovering: boolean) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const commonAriaOverlay = {
  isOpen: {
    control: { type: 'boolean' },
    description: 'Whether the overlay is currently open.',
    table: {
      category: 'React Aria - Overlay',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onClose: {
    action: 'onClose',
    description: 'Handler that is called when the overlay should close.',
    table: {
      category: 'React Aria - Overlay',
      type: {
        summary: '() => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isDismissable: {
    control: { type: 'boolean' },
    description: 'Whether to close the overlay when the user interacts outside it.',
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
  shouldCloseOnBlur: {
    control: { type: 'boolean' },
    description: 'Whether the overlay should close when focus is lost or moves outside it.',
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
  isKeyboardDismissDisabled: {
    control: { type: 'boolean' },
    description: 'Whether pressing the escape key to close the overlay should be disabled.',
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
  shouldCloseOnInteractOutside: {
    description:
      'When user interacts with the argument element outside of the overlay ref, return true if onClose should be called. This gives you a chance to filter out interaction with elements that should not dismiss the overlay. By default, onClose will always be called on interaction outside the overlay ref.',
    table: {
      category: 'React Aria - Overlay',
      type: {
        summary: '(element: HTMLElement) => boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const commonAriaModal = {
  isDisabled: {
    control: { type: 'boolean' },
    description: 'Sets the element to disabled.',
    table: {
      category: 'React Aria - Modal',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const commonAriaButton = {
  isDisabled: {
    control: { type: 'boolean' },
    description: 'Whether the button is disabled',
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
  children: {
    control: { type: 'text' },
    description: 'The content to display in the button',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onPress: {
    action: 'onPress',
    description: 'Handler that is called when the press is released over the target.',
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
  onPressStart: {
    action: 'onPressStart',
    description: 'Handler that is called when a press interaction starts.',
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
  onPressEnd: {
    action: 'onPressEnd',
    description:
      'Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target.',
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
  onPressChange: {
    action: 'onPressChange',
    description: 'Handler that is called when the press state changes.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '(isPressed: boolean) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onPressUp: {
    action: 'onPressUp',
    description:
      'Handler that is called when a press is released over the target, regardless of whether it started on the target or not.',
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
    control: { type: 'boolean' },
    description: 'Whether the element should receive focus on render.',
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
  onFocus: {
    action: 'onFocus',
    description: 'Handler that is called when the element receives focus.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '(e: FocusEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onBlur: {
    action: 'onBlur',
    description: 'Handler that is called when the element loses focus.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '(e: FocusEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onFocusChange: {
    action: 'onFocusChange',
    description: "Handler that is called when the element's focus status changes.",
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '(isFocused: boolean) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
    description: 'Handler that is called when a key is pressed.',
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
  onKeyUp: {
    action: 'onKeyUp',
    description: 'Handler that is called when a key is released.',
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
  href: {
    control: { type: 'text' },
    description: 'A URL to link to if elementType="a".',
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
  rel: {
    control: { type: 'text' },
    description:
      'The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).',
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
  elementType: {
    control: { type: 'none' },
    description:
      "The HTML element or React element used to render the button, e.g. 'div', 'a', or RouterLink.",
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'T | JSXElementConstructor<any>',
      },
      defaultValue: {
        summary: 'button',
      },
    },
  },
  'aria-expanded': {
    control: { type: 'boolean' },
    description:
      'Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.',
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
  'aria-haspopup': {
    control: { type: 'text' },
    description:
      'Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'boolean | "menu" | "listbox" | "tree" | "grid" | "dialog"',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  'aria-controls': {
    control: { type: 'text' },
    description:
      'Identifies the element (or elements) whose contents or presence are controlled by the current element.',
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
  'aria-pressed': {
    control: { type: 'boolean' },
    description: 'Indicates the current "pressed" state of toggle buttons.',
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
  type: {
    control: { type: 'string' },
    description: 'The behavior of the button when used in an HTML form.',
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '"button" | "submit" | "reset""',
      },
      defaultValue: {
        summary: '"button"',
      },
    },
  },
  excludeFromTabOrder: {
    control: { type: 'boolean' },
    description:
      'Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available.',
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
  id: {
    control: { type: 'text' },
    description:
      "The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).",
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
    description: 'Defines a string value that labels the current element.',
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
  'aria-labelledby': {
    control: { type: 'text' },
    description: 'Identifies the element (or elements) that labels the current element.',
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
  'aria-describedby': {
    control: { type: 'text' },
    description: 'Identifies the element (or elements) that describes the object.',
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
  'aria-details': {
    control: { type: 'text' },
    description:
      'Identifies the element (or elements) that provide a detailed, extended description for the object.',
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

const commonHTMLAttributes = {
  title: {
    description:
      "If present, this value will be this component's the rendered element's `title` attribute",
    control: { type: 'text' },
    table: {
      category: 'HTML Global Attributes',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export {
  commonAriaButton,
  commonAriaDialog,
  commonAriaFocusScope,
  commonAriaHover,
  commonAriaModal,
  commonAriaOverlay,
  commonHTMLAttributes,
  commonStyles,
  extendArgTypes,
};
