import React, { FC } from 'react';
import { MAX_INITIALS_PERSON, MAX_INITIALS_SPACE, TYPES } from './Avatar.constants';

interface InitialsProps {
  initials: string;
  type: string;
  className?: string;
}

/**
 * The Initials component, rendering the passed in initials in a span
 * and throws console warnings in case the initials length is too big for the
 * specified type.
 */
const Initials: FC<InitialsProps> = (props: InitialsProps) => {
  const { initials, type, className } = props;
  // Error handling for initials length
  if (initials) {
    type === TYPES.person &&
      initials.length > MAX_INITIALS_PERSON &&
      console.warn(
        `Avatar with type person should not have more than ${MAX_INITIALS_PERSON} initials.`
      );

    type === TYPES.space &&
      initials.length > MAX_INITIALS_SPACE &&
      console.warn(
        `Avatar with type space should not have more than ${MAX_INITIALS_SPACE} initials.`
      );
  }

  return <span className={className}>{initials}</span>;
};

export default Initials;
