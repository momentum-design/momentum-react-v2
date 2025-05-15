import React, { FC } from 'react';

import { Props } from './Chip.types';

import { Chip as MdcChip } from '@momentum-design/components/dist/react';

/**
 * The Chip component.
 */
const Chip: FC<Props> = (props: Props) => {
  const { onClick, stopPropagation = false, ...rest } = props;

  // this is a workaround for now for cases where usePress from react-aria is used on a parent (i.e. ListItemBase)
  // of the chip. We want to avoid the event bubbling up to the parent in those cases
  // this can be removed once ListItemBase is refactored to use the new momentum-design listitem component
  const preventBubble = (event: any) => {
    // Prevent the event from bubbling up to the parent element
    if (stopPropagation) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleClick = (event: MouseEvent) => {
    preventBubble(event);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <MdcChip
      onClick={handleClick}
      onPointerUp={preventBubble}
      onPointerDown={preventBubble}
      {...rest}
    />
  );
};

export default Chip;
