import React, { ReactElement } from 'react';

import './InputMessage.style.scss';
import { Props, MessageLevel } from './InputMessage.types';

import Icon from '../Icon';
import classnames from 'classnames';

const messagePriority = {
  'none': 0,
  'success': 1,
  'warning': 2,
  'error': 3,
};

const determineMessageType = array => {
  return array.reduce((agg, e) => {
    return messagePriority[agg] > messagePriority[e.type] ? agg : e.type || 'none';
  }, 'none');
};

const filterMessagesByType = (array, value) => {
  return array.reduce(
    (agg, e) => (e.type === value ? agg.concat(e.message) : agg),
    []
  );
};

export const getFilteredMessages = (allMessages) => {
  const messageType: MessageLevel =
    (allMessages.length > 0 && determineMessageType(allMessages)) || 'none';
  const messages = (messageType && filterMessagesByType(allMessages, messageType)) || null;
  return [messageType, messages];
}

const InputMessage = (props: Props): ReactElement => {
  const { message, level = 'none', className, id } = props;

  return (
    <div
      className={classnames('md-input-message-wrapper', className)}
      id={id}
    >
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
