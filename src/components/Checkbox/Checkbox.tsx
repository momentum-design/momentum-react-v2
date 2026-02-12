import React, { RefObject, useRef, forwardRef } from 'react';
import classnames from 'classnames';

import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useFocusRing } from '@react-aria/focus';
import { useId } from '@react-aria/utils';

import { Props } from './Checkbox.types';
import { STYLE, DEFAULTS } from './Checkbox.constants';
import './Checkbox.style.scss';
import { useCheckbox } from '@react-aria/checkbox';
import { useToggleState } from '@react-stately/toggle';

import Icon from '../Icon';
import Text from '../Text';

/**
 * The Checkbox component.
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const Checkbox = (props: Props, providedRef: RefObject<HTMLInputElement>) => {
  const { className, isDisabled, label, description, isIndeterminate, id, style } = props;

  const checkboxId = useId(id);

  const checkboxProps = {
    ...props,
    ...(description
      ? {
          'aria-describedby': `checkbox-description-${checkboxId} ${
            props['aria-describedby'] || ''
          }`.trimEnd(),
        }
      : {}),
  };

  const state = useToggleState(props);
  const internalRef = useRef<HTMLInputElement>();
  const ref = providedRef || internalRef;
  const { inputProps } = useCheckbox(checkboxProps, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const indeterminate = isIndeterminate || DEFAULTS.IS_INDETERMINATE;
  const disabled = isDisabled || DEFAULTS.IS_DISABLED;

  const icon = (
    <Icon
      className={STYLE.icon}
      name={indeterminate ? 'minus' : 'check'}
      weight="bold"
      scale={12}
    />
  );

  const filled = state.isSelected || indeterminate;
  const checkbox = (
    <div
      className={classnames(
        {
          [STYLE.selected]: filled,
          [STYLE.notSelected]: !filled,
          [STYLE.focus]: isFocusVisible,
        },
        'checkbox'
      )}
    >
      {filled && icon}
    </div>
  );

  // remove id from input to only apply it to the label
  delete inputProps.id;

  return (
    <div className={classnames(STYLE.wrapper, className)} data-disabled={disabled} style={style}>
      <label className={classnames(STYLE.label)} id={id}>
        <VisuallyHidden>
          <input
            {...inputProps}
            {...focusProps}
            aria-label={inputProps?.['aria-label'] || label}
            ref={ref}
          />
        </VisuallyHidden>
        {checkbox}
        {label}
      </label>
      {description && (
        <Text
          className={classnames(STYLE.description)}
          id={`checkbox-description-${checkboxId}`}
          type="body-secondary"
          tagName="small"
        >
          {description}
        </Text>
      )}
    </div>
  );
};
/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const _Checkbox = forwardRef(Checkbox);
_Checkbox.displayName = 'Checkbox';

export default _Checkbox;
