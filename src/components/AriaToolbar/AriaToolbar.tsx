import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './AriaToolbar.constants';
import { Props } from './AriaToolbar.types';
import ButtonGroup from '../ButtonGroup';
import { AriaToolbarContext } from './AriaToolbar.utils';
import { getKeyboardFocusableElements } from '../../utils/navigation';

/**
 * The AriaToolbar component. A style-less by default or button-group styled component implementing the Aria Toolbar pattern
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
    ariaToolbarItemsSize,
    ...rest
  } = props;

  const [currentFocus, setCurrentFocus] = useState(undefined);

  const buttonRefs = useRef({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buttonRefs.current[currentFocus]?.focus();
  }, [currentFocus]);

  const getContext = useCallback(
    () => ({
      currentFocus,
      setCurrentFocus,
      orientation,
      onTabPress,
      ariaToolbarItemsSize,
      buttonRefs,
    }),
    [currentFocus, setCurrentFocus, orientation, onTabPress, ariaToolbarItemsSize, buttonRefs]
  );

  const commonProps = {
    className: classnames(className, STYLE.wrapper),
    id: id,
    style: style,
    'aria-label': ariaLabel,
    'aria-controls': ariaControls,
    role: 'toolbar',
    'aria-orientation': orientation,
    ...rest,
  };

  const renderBody = () => {
    if (shouldRenderAsButtonGroup) {
      return (
        <ButtonGroup ref={ref} {...buttonGroupProps} {...commonProps} orientation={orientation}>
          {children}
        </ButtonGroup>
      );
    } else {
      return (
        <div ref={ref} {...commonProps}>
          {children}
        </div>
      );
    }
  };

  useEffect(() => {
    // When the toolbar is rendered inside a list, only the first item in the toolbar
    // should be focusable. This is to preserve the tab order as the
    // List uses a roving tab index.
    getKeyboardFocusableElements(ref.current, false).forEach((el, index) => {
      if (index === 0) {
        return;
      }
      el.setAttribute('data-exclude-focus', 'true');
    });
  }, [ref]);

  return (
    <AriaToolbarContext.Provider value={getContext()}>{renderBody()}</AriaToolbarContext.Provider>
  );
};

export default AriaToolbar;
