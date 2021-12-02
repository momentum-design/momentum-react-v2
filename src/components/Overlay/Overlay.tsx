import React, { forwardRef, RefObject, useRef } from 'react';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { mergeProps } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';

import ModalContainer from '../ModalContainer';

import { DEFAULTS, POSITIONINGS } from './Overlay.constants';
import { Props } from './Overlay.types';

/**
 * The Overlay component. This component extends `<ModalContainer />` and amends overlay functionality via React Aria.
 */
const Overlay = forwardRef((props: Props, providedRef: RefObject<HTMLDivElement>) => {
  const {
    children,
    isOpen = DEFAULTS.IS_OPEN,
    onClose,
    autoFocus = DEFAULTS.AUTO_FOCUS,
    contain = DEFAULTS.CONTAIN,
    positioning,
    restoreFocus = DEFAULTS.RESTORE_FOCUS,
    style,
    targetPosition,
    ...mutatedProps
  } = props;

  delete mutatedProps.isDismissable;

  const internalRef = useRef();

  const ref = providedRef || internalRef;

  const { overlayProps } = useOverlay(props, ref);
  const { dialogProps } = useDialog(props, ref);

  const getPositionStyle = (): Record<string, string> => {
    if (positioning && targetPosition) {
      const position: Record<string, string> = {
        position: 'fixed',
      };

      switch (positioning) {
        case POSITIONINGS.BOTTOM:
          position.left = `${targetPosition.center?.x}px`;
          position.top = `${targetPosition.center?.y + targetPosition.verticalRadius}px`;
          position.transform = 'translate(-50%, 0)';
          break;

        case POSITIONINGS.LEFT:
          position.right = `calc(100vw - ${
            targetPosition.center?.x - targetPosition.horizontalRadius
          }px)`;
          position.top = `${targetPosition.center?.y}px`;
          position.transform = 'translate(0, -50%)';
          break;

        case POSITIONINGS.RIGHT:
          position.left = `${targetPosition.center?.x + targetPosition.horizontalRadius}px`;
          position.top = `${targetPosition.center?.y}px`;
          position.transform = 'translate(0, -50%)';
          break;

        case POSITIONINGS.TOP:
          position.left = `${targetPosition.center?.x}px`;
          position.bottom = `calc(100vh - ${
            targetPosition.center?.y - targetPosition.verticalRadius
          }px`;
          position.transform = 'translate(-50%, 0)';
          break;
      }

      return position;
    }

    return {};
  };

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    isOpen && (
      <FocusScope autoFocus={autoFocus} contain={contain} restoreFocus={restoreFocus}>
        <ModalContainer
          {...mergeProps(overlayProps, dialogProps, mutatedProps)}
          style={{ ...style, ...getPositionStyle() }}
          ref={ref}
        >
          {children}
          {onClose && <DismissButton onDismiss={onClose} />}
        </ModalContainer>
      </FocusScope>
    )
  );
  /* eslint-enable jsx-a11y/no-autofocus */
});

Overlay.displayName = 'Overlay';

export default Overlay;
