import classnames from 'classnames';
import React, { FC, useCallback, useEffect, useState } from 'react';

import Popover, { PopoverInstance } from 'components/Popover';

import { STYLE } from './Coachmark.constants';
import { Props } from './Coachmark.types';
import WithHeader from './WithHeader';
import WithoutHeader from './WithoutHeader';
import './Coachmark.style.scss';

/**
 * The Coachmark component.
 */
const Coachmark: FC<Props> = (props: Props) => {
  const { actions, className, children, icon, image, onDismiss, isVisible, title, ...otherProps } =
    props;

  const [instance, setInstance] = useState<PopoverInstance>(undefined);

  const handleDismiss = useCallback(() => {
    if (instance?.state?.isVisible) {
      instance.hide();
      onDismiss?.();
    }
  }, [instance]);

  useEffect(() => {
    if (instance?.show && isVisible) {
      instance.show();
    }

    if (instance?.state?.isVisible && !isVisible) {
      instance.hide();
    }
  }, [instance, isVisible]);

  return (
    <Popover
      trigger="manual"
      className={classnames(className, STYLE.wrapper)}
      interactive={true}
      setInstance={setInstance}
      {...otherProps}
    >
      {title || image || icon ? (
        <WithHeader {...{ actions, children, icon, image, onDismiss: handleDismiss, title }} />
      ) : (
        <WithoutHeader {...{ actions, children, onDismiss: handleDismiss }} />
      )}
    </Popover>
  );
};

export default Coachmark;
