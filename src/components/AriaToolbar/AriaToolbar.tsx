import React, { FC, useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './AriaToolbar.constants';
import { Props } from './AriaToolbar.types';
import { useKeyboard } from '@react-aria/interactions';
import { map } from 'lodash';
import ButtonGroup from '../ButtonGroup';

/**
 * The AriaToolbar component. A style-less component implementing the Aria Toolbar pattern
 * see https://www.w3.org/WAI/ARIA/apg/patterns/toolbar
 */
const AriaToolbar: FC<Props> = (props: Props) => {
  const {
    ariaLabel,
    className,
    id,
    style,
    children,
    orientation = DEFAULTS.ORIENTATION,
    shouldRenderAsButtonGroup = DEFAULTS.SHOULD_RENDER_AS_BUTTON_GROUP,
    onTabPress,
    ariaControls,
    buttonGroupProps,
  } = props;

  const [currentFocus, setCurrentFocus] = useState(undefined);

  const validChildren = React.Children.toArray(children);
  const numChildren = validChildren.length;

  const buttonRefs = useRef({});

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      // for the escape key (and other key presses), continue propagation to let Popovers / Modals know that
      // they should close
      e.continuePropagation();

      switch (e.key) {
        case orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
          e.preventDefault();
          setCurrentFocus((numChildren + (currentFocus || 0) - 1) % numChildren);
          break;

        case orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
          e.preventDefault();
          setCurrentFocus((numChildren + (currentFocus || 0) + 1) % numChildren);
          break;

        case 'Tab': {
          if (onTabPress) {
            onTabPress(e);
          }
          break;
        }

        default:
          break;
      }
    },
  });

  useEffect(() => {
    buttonRefs.current[currentFocus]?.focus();
  }, [currentFocus]);

  const getPropsForChildren = useCallback(
    (child, index) => {
      return {
        tabIndex: index === (currentFocus || 0) ? 0 : -1,
        ref: (e) => {
          buttonRefs.current[index] = e;
          if (child.ref) {
            child.ref(e);
          }
        },
        onFocus: (e) => {
          setCurrentFocus(index);
          if (child.props.onFocus) {
            child.props.onFocus(e);
          }
        },
        onPress: () => {
          setCurrentFocus(index);
          if (child.props.onPress) {
            child.props.onPress();
          }
        },
        useNativeKeyDown: true,
        ...keyboardProps,
      };
    },
    [currentFocus]
  );

  const renderBody = () => {
    return map(validChildren as React.ReactElement[], (child, index) => {
      // checks if the child has a triggerComponent (i.e. it's a Tooltip)
      // in which case we need to clone the trigger...
      if (child.props.triggerComponent) {
        const triggerComponent = React.Children.only(child.props.triggerComponent);

        return React.cloneElement(child, {
          triggerComponent: React.cloneElement(
            triggerComponent,
            getPropsForChildren(triggerComponent, index)
          ),
        });
      } else {
        return React.cloneElement(child, getPropsForChildren(child, index));
      }
    });
  };

  const commonProps = {
    className: classnames(className, STYLE.wrapper),
    id: id,
    style: style,
    'aria-label': ariaLabel,
    'aria-controls': ariaControls,
    role: 'toolbar',
  };

  if (shouldRenderAsButtonGroup) {
    return (
      <ButtonGroup {...buttonGroupProps} {...commonProps}>
        {renderBody()}
      </ButtonGroup>
    );
  } else {
    return <div {...commonProps}>{renderBody()}</div>;
  }
};

export default AriaToolbar;
