import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { DEFAULTS, STYLE } from './ButtonGroup.constants';
import { Props } from './ButtonGroup.types';

import './ButtonGroup.style.scss';

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const ButtonGroup: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    const {
      children,
      className,
      id,
      round,
      spaced,
      compressed,
      separator,
      style,
      role,
      orientation,
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        className={classNames(STYLE.wrapper, className)}
        data-round={round || DEFAULTS.ROUND}
        data-spaced={spaced || DEFAULTS.SPACED}
        data-compressed={compressed || DEFAULTS.COMPRESSED}
        data-separator={separator || DEFAULTS.SEPARATOR}
        data-orientation={orientation || DEFAULTS.ORIENTATION}
        id={id}
        style={style}
        role={role}
        {...rest}
      >
        {children}
      </div>
    );
  });

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
