import React, { forwardRef, useRef, FC, RefObject } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './ReactionBadge.constants';
import { Props } from './ReactionBadge.types';
import './ReactionBadge.style.scss';
import ButtonPill from '../ButtonPill';
import { PrimitiveConverter } from '../../utils';

const ReactionBadge: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLButtonElement>) => {
    const { children, className, id, reacted, style, ...otherProps } = props;
    const ref = providedRef || useRef();
    return (
      <ButtonPill
        className={classnames(className, STYLE.wrapper)}
        data-reacted={reacted || DEFAULTS.REACTED}
        forwardedRef={ref}
        id={id}
        size={20}
        style={style}
        {...otherProps}
      >
        <PrimitiveConverter>{children}</PrimitiveConverter>
      </ButtonPill>
    );
  }
);

ReactionBadge.displayName = 'ReactionBadge';

export default ReactionBadge;
