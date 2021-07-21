import React, {ReactElement} from 'react';

import './InputMessage.style.scss';
import { Props } from './InputMessage.types';

import {ReactComponent as WarningTriangle} from '@momentum-ui/icons-rebrand/svg/warning-bold.svg';

const InputMessage = (props: Props): ReactElement => {
  const { message, level='none' } = props;

  return (
    <div className="md-input-message-wrapper">
      <div className="md-input-message" role="alert" message-level={level}>
        <div className="md-input-message--icon">
          {(level == 'error' || level == 'warning') && (
            <WarningTriangle viewBox="0 0 32 32" width="100%" height="100%" />
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

