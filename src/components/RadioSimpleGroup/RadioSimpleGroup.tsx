import React, { FC } from 'react';
import classnames from 'classnames';
import { v4 as uuidV4 } from 'uuid';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE } from './RadioSimpleGroup.constants';
import { RadioSimpleGroupProps } from './RadioSimpleGroup.types';
import './RadioSimpleGroup.style.scss';

/**
 * The RadioSimpleGroup component.
 */
export const RadioSimpleGroupContext = React.createContext(null);

const RadioSimpleGroup: FC<RadioSimpleGroupProps> = (props: RadioSimpleGroupProps) => {
  const { className, description, id, label, children, style } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);
  const radioSimpleGroupId = id || uuidV4();
  const descriptionId = description
    ? `radio-simple-group-description-${radioSimpleGroupId}`
    : undefined;

  return (
    <div
      {...radioGroupProps}
      className={classnames(className, STYLE.wrapper)}
      id={radioSimpleGroupId}
      style={style}
      aria-describedby={descriptionId}
    >
      {label && <span {...labelProps}>{label}</span>}
      {description && <span id={descriptionId}>{description}</span>}
      <RadioSimpleGroupContext.Provider value={state}>{children}</RadioSimpleGroupContext.Provider>
    </div>
  );
};

export default RadioSimpleGroup;
