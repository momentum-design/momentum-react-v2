import React, { forwardRef, RefObject, useRef } from 'react';
import { useModal, useOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { mergeProps } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';

import ModalContainer from '../ModalContainer';

import { DEFAULTS } from './Overlay.constants';
import { Props } from './Overlay.types';

/**
 * The Overlay component. This component extends `<ModalContainer />` and amends overlay functionality via React Aria.
 */
const Overlay = forwardRef((props: Props, providedRef: RefObject<HTMLDivElement>) => {
  const internalRef = useRef();

  const ref = providedRef || internalRef;

  const { overlayProps } = useOverlay(props, ref);
  const { modalProps } = useModal(props);
  const { dialogProps } = useDialog(props, ref);

  const mutatedProps = { ...props };

  const {
    autoFocus = DEFAULTS.autoFocus,
    contain = DEFAULTS.contain,
    restoreFocus = DEFAULTS.restoreFocus,
  } = mutatedProps;

  delete mutatedProps.autoFocus;
  delete mutatedProps.contain;
  delete mutatedProps.restoreFocus;

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <FocusScope autoFocus={autoFocus} contain={contain} restoreFocus={restoreFocus}>
      <ModalContainer
        {...mergeProps(overlayProps, dialogProps, mutatedProps, modalProps)}
        ref={ref}
      />
    </FocusScope>
  );
  /* eslint-enable jsx-a11y/no-autofocus */
});

Overlay.displayName = 'Overlay';

export default Overlay;
