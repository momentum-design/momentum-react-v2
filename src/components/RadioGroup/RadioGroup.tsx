import React, { FC, useCallback } from 'react';
import classnames from 'classnames';
import { useId } from '@react-aria/utils';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import {
  useSpatialNavigationContext,
  useSpatialRadioGroupNavigation,
} from '../SpatialNavigationProvider/SpatialNavigationProvider.utils';
import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { RadioGroupProps, RadioProps } from './RadioGroup.types';
import './RadioGroup.style.scss';
import Radio from './Radio';
import Text, { TEXT_CONSTANTS } from '../Text';

/**
 * The RadioGroup component.
 */
export const RadioContext = React.createContext(null);

const RadioGroup: FC<RadioGroupProps> = (props: RadioGroupProps) => {
  const {
    className,
    description = DEFAULTS.GROUP_DESCRIPTION,
    id,
    isDisabled = DEFAULTS.GROUP_DISABLED,
    label = DEFAULTS.GROUP_LABEL,
    options,
    style,
  } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);
  const radioGroupId = useId(id);
  const descriptionId = description ? `radio-group-description-${radioGroupId}` : undefined;

  const spatialKeyDown = useSpatialRadioGroupNavigation(radioGroupProps.onKeyDown);
  return (
    // keyboard event handling required for spatial navigation
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      {...radioGroupProps}
      onKeyDown={spatialKeyDown}
      className={classnames(className, STYLE.group)}
      id={radioGroupId}
      style={style}
      aria-describedby={description ? descriptionId : undefined}
    >
      <span {...labelProps}>{label}</span>
      {description && (
        <Text
          id={descriptionId}
          className={STYLE.groupDescription}
          type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}
          tagName="small"
        >
          {description}
        </Text>
      )}
      <RadioContext.Provider value={state}>
        {options &&
          options.map((option: string | RadioProps) => {
            if (typeof option === 'string') {
              return <Radio key={option} value={option} isDisabled={isDisabled} label={option} />;
            } else {
              return <Radio key={option.value} isDisabled={isDisabled} {...option} />;
            }
          })}
      </RadioContext.Provider>
    </div>
  );
};

export default RadioGroup;
