/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';
import type { Button, ButtonVariant } from '@momentum-design/components';

import { DEFAULTS, STYLE } from './ButtonPill.constants';
import { Props } from './ButtonPill.types';
import './ButtonPill.style.scss';

const ButtonPill = forwardRef((props: Props, providedRef: RefObject<Button>) => {
  const {
    color = DEFAULTS.COLOR,
    size = DEFAULTS.SIZE,
    grown = DEFAULTS.GROWN,
    disabledOutline = DEFAULTS.DISABLED_OUTLINE,
    ghost = DEFAULTS.GHOST,
    outline = DEFAULTS.OUTLINE,
    shallowDisabled = DEFAULTS.SHALLOW_DISABLED,
    onPress,
    stopPropagation = DEFAULTS.STOP_PROPAGATION,
    className,
    children,
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
      variant={variant}
      color={newColor}
      ref={providedRef}
      size={size}
      onClick={handleClick}
      onPointerUp={preventBubble}
      onPointerDown={preventBubble}
      softDisabled={shallowDisabled}
      data-grown={grown}
      data-disabled-outline={disabledOutline}
      className={classnames(STYLE.wrapper, className)}
      {...rest}
    >
      {children}
    </MdcButton>
  );
});

ButtonPill.displayName = 'ButtonPill';

export default ButtonPill;
