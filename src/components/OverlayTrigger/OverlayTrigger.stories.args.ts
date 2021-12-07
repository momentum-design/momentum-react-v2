import { OVERLAY_TRIGGER_CONSTANTS as CONSTANTS } from '../OverlayTrigger';

const overlayTriggerArgTypes = {
  hoverDelay: {
    description: 'The delay before opening/closing the `hoverOverlay` component.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.HOVER_DELAY,
      },
    },
  },
  hoverOverlay: {
    description: 'The `<Overlay />` component to trigger on hover events',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactElement<OverlayProps>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  hoverOverlayType: {
    description: 'The type associated with the hover-triggered `<Overlay />`.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.TYPES)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.TYPES)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: `"${CONSTANTS.TYPES.DIALOG}"`,
      },
    },
  },
  hoverPositioning: {
    description:
      'The positioning handler of the hover `<Overlay />` when triggered. This should be accompanied with the `<Overlay />` prop: `positioning` when `relative` is used.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.POSITIONINGS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.POSITIONINGS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: '"none"',
      },
    },
  },
  preserveHoverOnPress: {
    control: { type: 'boolean' },
    description: 'Whether to auto-dismiss the `hoverOverlay` on press events',
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  pressOverlay: {
    description: 'The `<Overlay />` component to trigger on press events',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactElement<OverlayProps>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  pressOverlayType: {
    description: 'The type associated with the press-triggered `<Overlay />`.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.TYPES)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.TYPES)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: `"${CONSTANTS.TYPES.DIALOG}"`,
      },
    },
  },
  pressPositioning: {
    description:
      'The positioning handler of the press `<Overlay />` when triggered. This should be accompanied with the `<Overlay />` prop: `positioning` when `relative` is used.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.POSITIONINGS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.POSITIONINGS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: '"none"',
      },
    },
  },
  trigger: {
    description: 'The trigger component for events in this component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactElement<ButtonSimpleProps>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { overlayTriggerArgTypes };

export default {
  ...overlayTriggerArgTypes,
};
