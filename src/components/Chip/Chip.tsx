import React, { FC } from 'react';

import { Props } from './Chip.types';

import { Chip as MdcChip } from '@momentum-design/components/dist/react';

/**
 * The Chip component.
 */
const Chip: FC<Props> = (props: Props) => {
  return <MdcChip {...props} />;
};

export default Chip;
