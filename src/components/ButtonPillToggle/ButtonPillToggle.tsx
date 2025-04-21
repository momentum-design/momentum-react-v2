import React, { RefObject, forwardRef, useRef, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';
import type { Button, IconButtonSize } from '@momentum-design/components';

import { DEFAULTS } from './ButtonPillToggle.constants';
import { DEFAULTS as BUTTON_PILL_DEFAULTS } from '../ButtonPill/ButtonPill.constants';
import { Props } from './ButtonPillToggle.types';

const ButtonPillToggle = forwardRef((props: Props, providedRef: RefObject<Button>) => {
  const {
    isSelected = DEFAULTS.SELECTED,
    className,
    outline = DEFAULTS.OUTLINE,
    size = BUTTON_PILL_DEFAULTS.SIZE,
    ...otherProps
  } = props;

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  // MdcButton is uncontrolled, so we need to handle the state manually
  const handleToggle = useCallback(() => {
    const newValue = !selected;
    setSelected(newValue);
    otherProps.onChange?.(newValue);
  }, [selected, otherProps]);

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
