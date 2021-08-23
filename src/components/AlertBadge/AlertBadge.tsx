import React, { FC, forwardRef, useRef, RefObject } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';

import { PrimitiveConverter } from '../../utils';

import { STYLE } from './AlertBadge.constants';
import { Props } from './AlertBadge.types';
import './AlertBadge.style.scss';

const AlertBadge: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLButtonElement>) => {
    const { children, className, color, image, id, label, style } = props;
    const ref = providedRef || useRef();

    const mutatedChildren = children ? (
      <PrimitiveConverter>{children}</PrimitiveConverter>
    ) : (
      [
        image ? <PrimitiveConverter key={0}>{image}</PrimitiveConverter> : null,
        label ? <PrimitiveConverter key={1}>{label}</PrimitiveConverter> : null,
      ]
    );

    const mutatedProps = {
      ...props,
      children: mutatedChildren,
    };

    delete mutatedProps.className;
    delete mutatedProps.id;
    delete mutatedProps.style;

    const { buttonProps } = useButton(mutatedProps, ref);

    return (
      <FocusRing focusRingClass={STYLE.focusRing}>
        <button
          className={classnames(className, STYLE.wrapper)}
          {...buttonProps}
          ref={ref}
          data-color={color}
          id={id}
          style={style}
        >
          {mutatedChildren}
        </button>
      </FocusRing>
    );
  }
);

AlertBadge.displayName = 'AlertBadge';

export default AlertBadge;
