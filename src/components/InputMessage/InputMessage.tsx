import React, { ReactElement } from 'react';

import './InputMessage.style.scss';
import { Props } from './InputMessage.types';

import Icon from '../Icon';

const InputMessage = (props: Props): ReactElement => {
  const { message, level = 'none' } = props;

  return (
    <div className="md-input-message-wrapper">
      <div className="md-input-message" role="alert" message-level={level}>
        <div className="md-input-message--icon">
          {(level == 'error' || level == 'warning') && (
            <Icon name="warning" weight="bold" scale={20} />
          )}
        </div>
        <div className="md-input-message--text">{message}</div>
      </div>
    </div>
  );
};

/**
 * Message for use under Inputs that shows text with icon and color corresponding to level
 */

export default InputMessage;
