import React, { FC } from 'react';
import classnames from 'classnames';

import ModalContainer from '../ModalContainer';
import Overlay from '../Overlay';
import Text from '../Text';

import { STYLE } from './OverlayAlert.constants';
import { Props } from './OverlayAlert.types';
import './OverlayAlert.style.scss';

/**
 * The OverlayAlert component.
 *
 * @beta
 */
const OverlayAlert: FC<Props> = (props: Props) => {
  const { actions, children, className, controls, details, title, ...other } = props;

  return (
    <Overlay className={classnames(className, STYLE.wrapper)} {...other}>
      <ModalContainer>
        <div>
          {!!title && (
            <Text className={classnames(STYLE.title)} type="header-primary">
              {title}
            </Text>
          )}
          <div>{controls}</div>
        </div>
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
