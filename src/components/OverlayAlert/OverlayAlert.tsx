import React, { FC } from 'react';
import classnames from 'classnames';

import ModalContainer from '../ModalContainer';
import Overlay from '../Overlay';
import Text from '../Text';

import { DEFAULTS, STYLE } from './OverlayAlert.constants';
import { Props } from './OverlayAlert.types';
import './OverlayAlert.style.scss';

/**
 * The OverlayAlert component.
 *
 * @beta
 */
const OverlayAlert: FC<Props> = (props: Props) => {
  const {
    actions,
    children,
    className,
    controls,
    details,
    modalColor,
    overlayColor = DEFAULTS.OVERLAY_COLOR,
    title,
    focusLockProps = DEFAULTS.FOCUS_LOCK_PROPS,
    ...other
  } = props;

  return (
    <Overlay
      focusLockProps={focusLockProps}
      className={classnames(className, STYLE.wrapper)}
      color={overlayColor}
      {...other}
    >
      <ModalContainer round={75} color={modalColor}>
        <div>
          <div>{controls}</div>
        </div>
        {!!title && (
          <div className={classnames(STYLE.title)}>
            <Text className={classnames(STYLE.title)} type="header-primary">
              {title}
            </Text>
          </div>
        )}
        <div>
          {children
            ? children
            : !!details && (
                <Text className={classnames(STYLE.details)} type="body-secondary">
                  {details}
                </Text>
              )}
        </div>
        <div>{actions}</div>
      </ModalContainer>
    </Overlay>
  );
};

export default OverlayAlert;
