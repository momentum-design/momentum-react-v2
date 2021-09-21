import React, { ReactElement } from 'react';

import './InputMessage.style.scss';
import { Props, MessageLevel, Message } from './InputMessage.types';

import Icon from '../Icon';
import classnames from 'classnames';

const messagePriority = {
  none: 0,
  success: 1,
  warning: 2,
  error: 3,
};

const determineMessageLevel = (array) => {
  return array.reduce((agg, e) => {
    return messagePriority[agg] > messagePriority[e.type] ? agg : e.level || 'none';
  }, 'none');
};

const filterMessagesByLevel = (array, value) => {
  return array.reduce((agg, e) => (e.level === value ? agg.concat(e.message) : agg), []);
};

type GetFilteredMessagesReturn = [MessageLevel, string[]];

export const getFilteredMessages = (allMessages: Message[]): GetFilteredMessagesReturn => {
  const messageLevel: MessageLevel =
    (allMessages.length > 0 && determineMessageLevel(allMessages)) || 'none';
  const messages = (messageLevel && filterMessagesByLevel(allMessages, messageLevel)) || null;
  return [messageLevel, messages];
};

const InputMessage = (props: Props): ReactElement => {
  const { message, level = 'none', className, id } = props;

  return (
    <div className={classnames('md-input-message-wrapper', className)} id={id}>
      <div className="md-input-message" role="alert" message-level={level}>
        {(level == 'error' || level == 'warning') && (
          <div className="md-input-message--icon">
            <Icon
              name="warning"
              weight="bold"
              scale={20}
              fillColor={`var(--theme-text-${level}-normal)`}
            />
          </div>
        )}
        <div className="md-input-message--text">{message}</div>
      </div>
    </div>
  );
};

/**
 * Message for use under Inputs that shows text with icon and color corresponding to level
 */

export default InputMessage;
