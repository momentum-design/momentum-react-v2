/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Children, forwardRef, ReactElement, RefObject, useMemo } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';
import type { Button, ButtonVariant } from '@momentum-design/components';
import type IconKeys from '@momentum-design/icons/dist/types/types';

import { Props } from './ButtonCircle.types';
import './ButtonCircle.style.scss';
import { DEFAULTS, STYLE } from './ButtonCircle.constants';

const ButtonCircle = forwardRef((props: Props, providedRef: RefObject<Button>) => {
  const {
    color,
    className,
    size = DEFAULTS.SIZE,
    children,
    onPress,
    ghost,
    outline,
    shallowDisabled,
    ...rest
  } = props;

  let newColor;
  switch (color) {
    case 'join':
      newColor = 'positive';
      break;
    case 'cancel':
      newColor = 'negative';
      break;
    case 'message':
      newColor = 'accent';
      break;
    default:
      newColor = 'default';
      break;
  }

  let variant: ButtonVariant = 'primary';

  if (ghost) {
    variant = 'tertiary';
  }
  if (outline) {
    variant = 'secondary';
  }

  const prefixIcon = useMemo(() => {
    if (children && Children.count(children) === 1) {
      const Icon = children as ReactElement;
      // @ts-ignore
      if (Icon.type?.name === 'Icon') {
        return [Icon.props.name, Icon.props.weight || 'regular'].join('-');
      }
    }
  }, [children]);

  return (
    <MdcButton
      prefixIcon={prefixIcon as IconKeys}
      variant={variant}
      color={newColor}
      ref={providedRef}
      size={size}
      onClick={onPress}
      softDisabled={shallowDisabled}
      className={classnames({ [STYLE.widthOverride]: !!prefixIcon }, STYLE.wrapper, className)}
      {...rest}
    >
      {!prefixIcon && children}
    </MdcButton>
  );
});

ButtonCircle.displayName = 'ButtonCircle';

export default ButtonCircle;
