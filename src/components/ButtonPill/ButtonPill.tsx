/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { forwardRef, ReactElement, RefObject } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';
import type { Button, ButtonVariant } from '@momentum-design/components';

import { DEFAULTS, STYLE } from './ButtonPill.constants';
import { Props } from './ButtonPill.types';
import './ButtonPill.style.scss';

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
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

  const processChildren = (children: React.ReactNode) => {
    const childArray = React.Children.toArray(children);

    return React.Children.map(childArray, (child, index) => {
      const ChildElement = child as ReactElement;

      // @ts-ignore
      const isMrv2Icon = ChildElement?.type?.displayName === 'Mrv2Icon';
      // @ts-ignore
      const isMdcIcon = ChildElement?.type?.displayName === 'Icon';

      if (isMrv2Icon || isMdcIcon) {
        // Check if there are meaningful children before or after this icon
        const hasChildrenBefore = childArray
          .slice(0, index)
          .some((c) => React.isValidElement(c) || (typeof c === 'string' && c.trim()));
        const hasChildrenAfter = childArray
          .slice(index + 1)
          .some((c) => React.isValidElement(c) || (typeof c === 'string' && c.trim()));

        // Determine slot based on position
        let slot = '';
        if (!hasChildrenBefore && hasChildrenAfter) {
          slot = 'prefix';
        } else if (hasChildrenBefore && !hasChildrenAfter) {
          slot = 'postfix';
        }
        const existingStyle = ChildElement.props?.style || {};
        const newStyle = {
          ...existingStyle,
          flexShrink: 0,
        };

        // Clone the element with the slot prop if a slot was determined
        return slot ? React.cloneElement(ChildElement, { slot, style: newStyle }) : child;
      }

      return ChildElement;
    });
  };

  const processedChildren = processChildren(children);

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
      {processedChildren}
    </MdcButton>
  );
});

ButtonPill.displayName = 'ButtonPill';

export default ButtonPill;
