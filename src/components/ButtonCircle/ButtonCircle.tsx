/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Children, forwardRef, ReactElement, RefObject } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';
import type { Button, ButtonVariant } from '@momentum-design/components';
import type IconKeys from '@momentum-design/icons/dist/types/types';

import { Props } from './ButtonCircle.types';
import './ButtonCircle.style.scss';
import { DEFAULTS, STYLE } from './ButtonCircle.constants';

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
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
    stopPropagation = DEFAULTS.STOP_PROPAGATION,
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

  let prefixIcon;
  if (children && Children.count(children) === 1) {
    const Icon = children as ReactElement;
    // @ts-ignore
    if (Icon.type?.displayName === 'Mrv2Icon') {
      prefixIcon = [Icon.props.name, Icon.props.weight || 'regular'].join('-');
    }
  }

  // this is a workaround for now for cases where usePress from react-aria is used on a parent
  // of the button. We want to avoid the event bubbling up to the parent in those cases
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
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <MdcButton
      prefixIcon={prefixIcon as IconKeys}
      variant={variant}
      color={newColor}
      ref={providedRef}
      size={size}
      onClick={handleClick}
      onPointerUp={preventBubble}
      onPointerDown={preventBubble}
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
