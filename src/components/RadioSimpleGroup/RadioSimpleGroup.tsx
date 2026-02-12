import React, { FC } from 'react';
import classnames from 'classnames';
import { v4 as uuidV4 } from 'uuid';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE } from './RadioSimpleGroup.constants';
import { RadioSimpleGroupProps } from './RadioSimpleGroup.types';
import './RadioSimpleGroup.style.scss';
import { useSpatialRadioGroupNavigation } from '../SpatialNavigationProvider/SpatialNavigationProvider.utils';

/**
 * The RadioSimpleGroup component.
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
export const RadioSimpleGroupContext = React.createContext(null);

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const RadioSimpleGroup: FC<RadioSimpleGroupProps> = (props: RadioSimpleGroupProps) => {
  const { className, description, id, label, children, style } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);
  const radioSimpleGroupId = id || uuidV4();
  const descriptionId = description
    ? `radio-simple-group-description-${radioSimpleGroupId}`
    : undefined;
  const spatialKeyDown = useSpatialRadioGroupNavigation(radioGroupProps.onKeyDown);

  return (
    // keyboard event handling required for spatial navigation
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      {...radioGroupProps}
      onKeyDown={spatialKeyDown}
      className={classnames(className, STYLE.wrapper)}
      data-disabled={state.isDisabled}
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
