import React, { FC, RefObject, useRef } from 'react';
import { useModal, useOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { mergeProps } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';

import ModalContainer from '../ModalContainer';

import { Props } from './Overlay.types';

/**
 * The Overlay component. This component extends `<ModalContainer />` and amends overlay functionality via React Aria.
 */
const Overlay: FC<Props> = (props: Props, providedRef: RefObject<HTMLDivElement>) => {
  const internalRef = useRef();

  const ref = providedRef || internalRef;

  const { overlayProps } = useOverlay(props, ref);
  const { modalProps } = useModal(props);
  const { dialogProps } = useDialog(props, ref);

  return (
    <FocusScope restoreFocus>
      <ModalContainer {...mergeProps(overlayProps, dialogProps, props, modalProps)} />
    </FocusScope>
  );
};

export default Overlay;
