import React, { FC } from 'react';

import { DEFAULTS } from './SecondLineElement.constants';
import { Props } from './SecondLineElement.types';
import DividerDot from '../../DividerDot';

/**
 * The SecondLineElement subcomponent is used only in SpaceListItem to
 * render the secondLine array with DividerDots inbetween.
 * @internal use only. Should not be consumed from any external parties.
 */
const SecondLineElement: FC<Props> = (props: Props) => {
  const { children, showDividerDot = DEFAULTS.SHOW_DIVIDER_DOT } = props;

  return (
    <>
      {showDividerDot && <DividerDot data-test="multiple-string-second-line-divider-dot" />}
      <span data-test="second-line-element-child">{children}</span>
    </>
  );
};

export default SecondLineElement;
