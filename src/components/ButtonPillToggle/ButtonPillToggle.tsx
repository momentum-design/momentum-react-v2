import React, { RefObject, forwardRef, useRef, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';
import type { Button, IconButtonSize } from '@momentum-design/components';

import { DEFAULTS } from './ButtonPillToggle.constants';
import { DEFAULTS as BUTTON_PILL_DEFAULTS } from '../ButtonPill/ButtonPill.constants';
import { Props } from './ButtonPillToggle.types';

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const ButtonPillToggle = forwardRef((props: Props, providedRef: RefObject<Button>) => {
  const {
    isSelected = DEFAULTS.SELECTED, // controlled
    initialIsSelected = DEFAULTS.SELECTED, // uncontrolled
    className,
    outline = DEFAULTS.OUTLINE,
    size = BUTTON_PILL_DEFAULTS.SIZE,
    ...otherProps
  } = props;

  const isControlled = isSelected !== undefined;

  const internalRef = useRef();
  const ref = providedRef || internalRef;
  const [selected, setSelected] = useState(isControlled ? isSelected : initialIsSelected);

  useEffect(() => {
    if (isControlled) {
      setSelected(isSelected);
    }
  }, [isControlled, isSelected]);

  // MdcButton is uncontrolled, so we need to handle the state manually
  const handleToggle = useCallback(() => {
    const newValue = isControlled ? isSelected : !selected;
    if (!isControlled) {
      setSelected(newValue);
    }
    otherProps.onChange?.(newValue); // when the toggle is controlled, onChange is, ironically, the one causing the change of isSelected
  }, [isControlled, isSelected, selected, otherProps]);

  return (
    <MdcButton
      active={selected}
      ref={ref}
      className={classnames(className)}
      size={size as IconButtonSize}
      variant={outline ? 'secondary' : 'tertiary'}
      onClick={handleToggle}
      {...otherProps}
    />
  );
});

ButtonPillToggle.displayName = 'ButtonPillToggle';

export default ButtonPillToggle;
