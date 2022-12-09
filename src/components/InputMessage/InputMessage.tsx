import React, { ReactElement } from 'react';

import './InputMessage.style.scss';
import { STYLE } from './InputMessage.constants';
import { Props, MessageLevel, Message } from './InputMessage.types';

import Icon from '../Icon';
import Text from '../Text';
import classnames from 'classnames';

const messagePriority = {
  none: 0,
  success: 1,
  warning: 2,
  error: 3,
};

const determineMessageLevel = (array: Message[]): MessageLevel => {
  return array.reduce((agg, e: Message) => {
    return messagePriority[agg] > messagePriority[e.level] ? agg : e.level || 'none';
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
    <div className={classnames(STYLE.wrapper, className)} id={id}>
      <div className={STYLE.message} role="alert" message-level={level}>
        {(level == 'error' || level == 'warning') && (
          <div className={STYLE.icon}>
            <Icon
              name="warning"
              weight="bold"
              scale={16}
              fillColor={`var(--mds-color-theme-text-${level}-normal)`}
            />
          </div>
        )}
        <Text type="body-secondary" className={STYLE.text}>
          {message}
        </Text>
      </div>
    </div>
  );
};

/**
 * Message for use under Inputs that shows text with icon and color corresponding to level
 */

export default InputMessage;
