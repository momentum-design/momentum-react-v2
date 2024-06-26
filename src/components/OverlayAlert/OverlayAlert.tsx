import React, { FC, useCallback, useRef } from 'react';
import classnames from 'classnames';

import ModalContainer from '../ModalContainer';
import Overlay from '../Overlay';
import Text from '../Text';

import { DEFAULTS, STYLE } from './OverlayAlert.constants';
import { Props } from './OverlayAlert.types';
import './OverlayAlert.style.scss';
import { v4 as uuidV4 } from 'uuid';
import { useShouldCloseOnEsc } from '../../hooks/useShouldCloseOnEsc';

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
    onClose,
    ariaLabel,
    ...other
  } = props;
  const id = useRef(uuidV4());
  const detailsId = useRef(uuidV4());
  const { shouldCloseOnEsc } = useShouldCloseOnEsc();

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && shouldCloseOnEsc) {
        onClose?.();
      }
    },
    [shouldCloseOnEsc]
  );

  return (
    <Overlay
      className={classnames(className, STYLE.wrapper)}
      color={overlayColor}
      onKeyDown={onKeyDown}
      {...other}
    >
      <ModalContainer
        className={classnames(STYLE.modalContainer)}
        round={75}
        color={modalColor}
        aria-label={ariaLabel}
        aria-labelledby={title ? id.current : undefined}
        aria-describedby={details && !children ? detailsId.current : undefined}
        focusLockProps={focusLockProps}
      >
        <div>
          <div>{controls}</div>
        </div>
        {!!title && (
          <div className={classnames(STYLE.title)}>
            <Text className={classnames(STYLE.title)} type="title" id={id.current}>
              {title}
            </Text>
          </div>
        )}
        <div>
          {children
            ? children
            : !!details && (
                <Text
                  className={classnames(STYLE.details)}
                  type="body-primary"
                  id={detailsId.current}
                >
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
