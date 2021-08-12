import React, { ReactElement } from 'react';

import './InputMessage.style.scss';
import { Props } from './InputMessage.types';

import Icon from '../Icon';
import classnames from 'classnames';

const InputMessage = (props: Props): ReactElement => {
  const { message, level = 'none', className } = props;

  return (
    <div className={classnames('md-input-message-wrapper', className)}>
      <div className="md-input-message" role="alert" message-level={level}>
        <div className="md-input-message--icon">
          {(level == 'error' || level == 'warning') && (
            <Icon
              name="warning"
              weight="bold"
              scale={20}
              fillColor={`var(--theme-text-${level}-normal)`}
            />
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
