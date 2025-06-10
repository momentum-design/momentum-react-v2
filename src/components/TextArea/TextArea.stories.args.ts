import { commonStyles } from '../../storybook/helper.stories.argtypes';
import {
  AUTO_CAPITALIZE,
  AUTO_COMPLETE,
  POPOVER_PLACEMENT,
  VALIDATION,
  WRAP,
} from './TextArea.constants';

export default {
  ...commonStyles,
  name: {
    description:
      'Indicates the name of the component group. They are used to group elements in a form together.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  label: {
    description:
      'The label of the input field. It is linked to the input field using the for attribute.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  rows: {
    description: 'The rows attribute specifies the visible number of lines in a text area.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 5,
      },
    },
  },
  cols: {
    description: 'The cols attribute specifies the visible number of characters in a text area.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 40,
      },
    },
  },
  wrap: {
    description:
      'The wrap attribute specifies how the text in a text area is to be wrapped when submitted in a form.',
    options: [...Object.values(WRAP)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'soft',
      },
    },
  },
  required: {
    description:
      'The required attribute to indicate that the input field is required. It is used to append a required indicator (*) to the label.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  placeholder: {
    description: 'The placeholder text that is displayed when the textarea field is empty.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  value: {
    description:
      'Indicates the value of the component group (ex: input, checkbox, radio, select etc...)',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  helpText: {
    description: 'The help text that is displayed below the input field.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  helpTextType: {
    description:
      "The type of help text. It can be 'default', 'error', 'warning', 'success', 'priority'.",
    options: [...Object.values(VALIDATION)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: VALIDATION.DEFAULT,
      },
    },
  },
  readonly: {
    description:
      'readonly attribute of the textarea field. If true, the textarea field is read-only.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  disabled: {
    description:
      'Indicates whether the component is disabled. When the component is disabled for user interaction; it is not focusable or clickable.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  autoCapitalize: {
    description: 'The autocapitalize attribute of the textarea field.',
    options: [...Object.values(AUTO_CAPITALIZE)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'AutoCapitalizeType',
      },
      defaultValue: {
        summary: 'off',
      },
    },
  },
  autoComplete: {
    description: 'The autocomplete attribute of the textarea field.',
    options: [...Object.values(AUTO_COMPLETE)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'AutoCompleteType',
      },
      defaultValue: {
        summary: 'off',
      },
    },
  },
  autoFocus: {
    description: 'If true, the textarea field is focused when the component is rendered.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  ariaLabel: {
    description:
      'Defines a string value that labels the current element. The Aria-Label attribute to be set for accessibility.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  dirName: {
    description:
      'Specifies the name of the directionality of text for submission purposes (e.g., "rtl" for right-to-left).',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  maxLength: {
    description: 'The maximum number of characters that the textarea field can accept.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  minLength: {
    description: 'The minimum number of characters that the textarea field can accept.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  maxCharacterLimit: {
    description: 'maximum character limit for the textarea field for character counter.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  validationMessage: {
    description:
      'Custom validation message that will override the default message and displayed when the input is invalid.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  toggletipText: {
    description:
      'The toggletip text that is displayed when the label is hovered. It is used to provide additional information about the label.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  toggletipPlacement: {
    description: 'The placement of the toggletip that is displayed when the info icon is hovered.',
    options: [...Object.values(POPOVER_PLACEMENT)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'top',
      },
    },
  },
  infoIconArialLabel: {
    description:
      'Aria label for the info icon that is displayed next to the label when toggletipText is set. This is used for accessibility purposes to provide a description of the icon.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },

  onLimitExceeded: {
    action: 'onLimitExceeded',
    description: 'This event is dispatched once when the character limit exceeds or restored.',
    table: {
      category: 'Events',
      type: {
        summary: '(e: Event) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onInput: {
    action: 'onInput',
    description:
      'This event is dispatched when the value of the textarea field changes (every press).',
    table: {
      category: 'Events',
      type: {
        summary: '(e: InputEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onChange: {
    action: 'onChange',
    description:
      ' This event is dispatched when the value of the textarea field changes (on blur).',
    table: {
      category: 'Events',
      type: {
        summary: '(e: Event) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onFocus: {
    action: 'onFocus',
    description: ' This event is dispatched when the textarea receives focus.',
    table: {
      category: 'Events',
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
    description: ' This event is dispatched when the textarea loses focus.',
    table: {
      category: 'Events',
      type: {
        summary: '(e: FocusEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
