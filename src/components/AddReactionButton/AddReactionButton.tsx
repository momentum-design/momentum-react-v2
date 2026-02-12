import React, { forwardRef, RefObject, useRef } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';
import { IconButtonSize } from '@momentum-design/components';
import type { Button } from '@momentum-design/components';

import { DEFAULTS, STYLE } from './AddReactionButton.constants';
import { Props } from './AddReactionButton.types';
import './AddReactionButton.style.scss';

// todo: fix typing once React keyboard events are properly typed in momentum-design
/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const AddReactionButton = forwardRef((props: Props, providedRef: RefObject<Button>) => {
  const { className, id, style, ...otherProps } = props;
  delete otherProps.size;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  return (
    <MdcButton
      ref={ref}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      size={DEFAULTS.SIZE as IconButtonSize}
      style={style}
      variant="secondary"
      prefixIcon="reactions-regular"
      {...otherProps}
    />
  );
});

AddReactionButton.displayName = 'AddReactionButton';

export default AddReactionButton;
