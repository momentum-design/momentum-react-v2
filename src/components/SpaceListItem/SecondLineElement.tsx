import React, { FC } from 'react';

import { DEFAULTS } from './SpaceListItem.constants';
import { SecondLineElementProps as Props } from './SpaceListItem.types';
import DividerDot from '../DividerDot';

/**
 * The SecondLineElement subcomponent is used only in SpaceListItem to
 * render the secondLine array with DividerDots inbetween.
 */
const SecondLineElement: FC<Props> = (props: Props) => {
  const { children, showDividerDot = DEFAULTS.DIVIDER_DOT } = props;

  return (
    <>
      {showDividerDot && <DividerDot data-test="multiple-string-second-line-divider-dot" />}
      {children}
    </>
  );
};

export default SecondLineElement;
