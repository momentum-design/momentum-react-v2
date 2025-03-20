import { TYPE } from '@momentum-design/components/dist/components/badge/badge.constants.js';

const TYPES = Object.values(TYPE);

const DEFAULTS = {
  TYPE: 'dot',
} as const;

export { DEFAULTS, TYPES };
