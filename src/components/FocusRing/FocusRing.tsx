import React, { FC } from 'react';
import classnames from 'classnames';
import { FocusRing as AriaFocusRing } from '@react-aria/focus';

import { STYLE } from './FocusRing.constants';
import { Props } from './FocusRing.types';
import './FocusRing.style.scss';

/**
 * The wrapped `<FocusRing />` from `@react-aria/focus`.
 *
 * @remarks
 * This does not support typical style inheritance via `className`, `id`, and `style`. See [react-aria/focus]{@link https://react-spectrum.adobe.com/react-aria/FocusRing.html}
 */
const FocusRing: FC<Props> = (props: Props) => {
  const mutatedProps = { ...props };
  const focusClass = mutatedProps;
  const focusRingClass = mutatedProps;

  delete mutatedProps.focusClass;
  delete mutatedProps.focusRingClass;

  const { isInset = false } = props;

  return (
    <AriaFocusRing
      focusClass={
        props.disabled
          ? classnames(STYLE.disabled)
          : classnames(STYLE.wrapper, focusClass, { [STYLE.inset]: isInset })
      }
      focusRingClass={
        props.disabled
          ? classnames(STYLE.disabled)
          : classnames(STYLE.wrapper, focusRingClass, { [STYLE.inset]: isInset })
      }
      {...mutatedProps}
    />
  );
};

export default FocusRing;
