import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './AriaToolbar.constants';
import { Props } from './AriaToolbar.types';
import ButtonGroup from '../ButtonGroup';
import { AriaToolbarContext } from './AriaToolbar.utils';

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
    orientation = DEFAULTS.ORIENTATION as Props['orientation'],
    shouldRenderAsButtonGroup = DEFAULTS.SHOULD_RENDER_AS_BUTTON_GROUP,
    onTabPress,
    ariaControls,
    buttonGroupProps,
    ariaToolbarItemsSize,
  } = props;

  const [currentFocus, setCurrentFocus] = useState(undefined);

  const buttonRefs = useRef({});

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
  };

  const renderBody = () => {
    if (shouldRenderAsButtonGroup) {
      return (
        <ButtonGroup {...buttonGroupProps} {...commonProps}>
          {children}
        </ButtonGroup>
      );
    } else {
      return <div {...commonProps}>{children}</div>;
    }
  };

  return (
    <AriaToolbarContext.Provider value={getContext()}>{renderBody()}</AriaToolbarContext.Provider>
  );
};

export default AriaToolbar;
