/** @component input */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import toLower from 'lodash/toLower';
import { Icon } from '@momentum-ui/react-collaboration';
import InputHelper from '../InputHelper';
import InputMessage from '../InputMessage';
import InputSection from '../InputSection';
import Label from '../Label';
import IconNext from '../../components/Icon';

const determineMessageType = (array) => {
  return array.reduce((agg, e) => {
    return agg === 'error' ? agg : e.type || '';
  }, '');
};

const filterMessagesByType = (array, value) => {
  return array.reduce((agg, e) => (e.type === value ? agg.concat(e.message) : agg), []);
};

/** Text input with integrated label to enforce consistency in layout, error display, label placement, and required field marker. */
/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class Input extends React.Component {
  state = {
    isEditing: false,
    value: this.props.value || this.props.defaultValue,
  };

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    value !== prevProps.value && this.setValue(value);
  }

  setValue = (value) => {
    this.setState({
      value,
    });
  };

  handleKeyDown = (e) => {
    const { onKeyDown } = this.props;

    onKeyDown && onKeyDown(e);
  };

  handleFocus = (e) => {
    const { onFocus, disabled } = this.props;

    if (disabled) {
      e.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(e);
    }
    this.setState({
      isEditing: true,
    });
  };

  handleMouseDown = (e) => {
    const { onMouseDown, disabled } = this.props;

    if (disabled) {
      e.stopPropagation();
      return;
    }

    if (onMouseDown) {
      onMouseDown(e);
    }
    this.setState({
      isEditing: true,
    });
  };

  handleChange = (e) => {
    const { onChange } = this.props;
    const value = e.target.value;
    e.persist();
    this.setState(() => {
      onChange && onChange(e);
      return { value };
    });
  };

  handleBlur = (e) => {
    const { onDoneEditing } = this.props;
    const value = e.target.value;

    if (e.which === 27 || e.which === 13 || e.type === 'blur') {
      this.setState({ isEditing: false }, () => onDoneEditing && onDoneEditing(e, value));
    }
    e.stopPropagation();
  };

  handleClear = (e) => {
    const value = '';
    e.target.value = value;
    e.persist();
    this.input.focus();
    this.handleChange(e);
  };

  setInputRef = (input) => {
    const { clear, inputRef } = this.props;
    if (clear) this.input = input;
    if (inputRef) return inputRef(input);
  };

  render() {
    const {
      ariaDescribedBy,
      ariaLabel,
      className,
      clear,
      clearAriaLabel,
      containerSize,
      disabled,
      messageArr,
      htmlId,
      id,
      inputClassName,
      helpText,
      inputSize,
      label,
      multiline,
      nestedLevel,
      placeholder,
      readOnly,
      secondaryLabel,
      shape,
      type,
      ...props
    } = this.props;

    delete props.isFilled;

    const { isEditing, value } = this.state;

    const otherProps = omit({ ...props }, [
      'defaultValue',
      'inputAfter',
      'inputBefore',
      'inputRef',
      'onChange',
      'onDoneEditing',
      'onFocus',
      'onKeyDown',
      'onMouseDown',
      'ref',
      'value',
    ]);

    const messageType = (messageArr.length > 0 && determineMessageType(messageArr)) || '';
    const messages = (messageType && filterMessagesByType(messageArr, messageType)) || null;

    const clearButton = clear && !disabled && value && (
      <InputSection position="after">
        <Icon
          onClick={this.handleClear}
          ariaLabel={clearAriaLabel || 'clear input'}
          buttonClassName="md-input__icon-clear"
          icon={<IconNext scale={18} name="cancel" weight="bold" />}
        />
      </InputSection>
    );

    const inputSection = (position) =>
      this.props[`input${position}`] && (
        <InputSection position={toLower(position)}>{this.props[`input${position}`]}</InputSection>
      );

    const inputLeft = inputSection('Before');
    const inputRight = clearButton || inputSection('After');

    const InputTag = multiline ? 'textarea' : 'input';

    const inputElement = (
      <div className={'md-input__wrapper' + `${inputSize ? ` columns ${inputSize}` : ''}`}>
        {inputLeft}
        <InputTag
          className={
            'md-input' +
            `${multiline ? ' md-input--multiline' : ''}` +
            `${shape ? ` md-input--${shape}` : ''}` +
            `${inputLeft ? ` md-input--before` : ''}` +
            `${inputRight ? ` md-input--after` : ''}` +
            `${isEditing ? ` md-active` : ''}` +
            `${inputClassName ? ` ${inputClassName}` : ''}` +
            `${readOnly ? ' md-read-only' : ''}` +
            `${disabled ? ' md-disabled' : ''}` +
            `${value ? ` md-dirty` : ''}`
          }
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          ref={this.setInputRef}
          tabIndex={0}
          type={type}
          value={value}
          {...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy })}
          {...(ariaLabel && { 'aria-label': ariaLabel })}
          {...(disabled && { disabled })}
          {...((htmlId || id) && { id: htmlId || id })}
          {...otherProps}
          {...(placeholder && { placeholder })}
          {...(readOnly && { readOnly })}
        />
        {inputRight}
      </div>
    );

    return (
      <div
        className={
          `md-input-container` +
          `${containerSize ? ` columns ${containerSize}` : ''}` +
          `${readOnly ? ' md-read-only' : ''}` +
          `${disabled ? ' md-disabled' : ''}` +
          `${messageType ? ` md-${messageType}` : ''}` +
          `${(nestedLevel && ` md-input--nested-${nestedLevel}`) || ''}` +
          `${className ? ` ${className}` : ''}`
        }
      >
        {label && <Label className="md-input__label" htmlFor={htmlId || id} label={label} />}
        {inputElement}
        {secondaryLabel && (
          <Label
            className="md-input__secondary-label"
            htmlFor={htmlId || id}
            label={secondaryLabel}
          />
        )}
        {helpText && <InputHelper message={helpText} />}
        {messages && (
          <div className="md-input__messages">
            {messages.map((m, i) => (
              <InputMessage message={m} key={`input-message-${i}`} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Input.propTypes = {
  /** @prop ID to reference for blindness accessibility feature | null */
  ariaDescribedBy: PropTypes.string,
  /** @prop Text to display for blindness accessibility features | null */
  ariaLabel: PropTypes.string,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Clears Input values | false */
  clear: PropTypes.bool,
  /** @prop Optional aria label on the clear button | null */
  clearAriaLabel: PropTypes.string,
  /** @prop Overall input container size | '' */
  containerSize: PropTypes.string,
  /** @prop Default Value same as value but used when onChange isn't invoked | '' */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /*** @prop Sets the disabled attribute of the Input | false */
  disabled: PropTypes.bool,
  /** @prop Array of Objects with message and type [{error: '', type: 'error, success, warning'}] to display error message and assign class | [] */
  messageArr: PropTypes.array,
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing | null */
  htmlId: PropTypes.string,
  /** Optional Icon node that overrides right section of input | null */
  inputAfter: PropTypes.node,
  /** Optional Icon node that overrides left section of input | null */
  inputBefore: PropTypes.node,
  /** Unique HTML ID used for tying label to HTML input | null */
  id: PropTypes.string,
  /** @prop Input css class name string | '' */
  inputClassName: PropTypes.string,
  /** @prop Help Text to show form validation rules | '' */
  helpText: PropTypes.string,
  /*** @prop Optional Input ref prop type | null */
  inputRef: PropTypes.func,
  /** @prop Overall input wrapper size | '' */
  inputSize: PropTypes.string,
  /*** @prop Applies the filled attribute of the Input | false */
  isFilled: PropTypes.bool,
  /** @prop Input label text | '' */
  label: PropTypes.string,
  /** @prop Input is multiline(textarea) | false */
  multiline: PropTypes.bool,
  /*** @prop Optional Input name prop type | null */
  name: PropTypes.string,
  /** @prop Set the level of nested Input components | 0 */
  nestedLevel: PropTypes.number,
  /** @prop Callback function invoked when user types into the Input field | null */
  onChange: PropTypes.func,
  /*** @prop Callback function invoked when user is done editing Input field | null */
  onDoneEditing: PropTypes.func,
  /*** @prop Callback function invoked when user focuses on the Input field | null */
  onFocus: PropTypes.func,
  /*** @prop Callback function invoked when user presses any key | null */
  onKeyDown: PropTypes.func,
  /*** @prop Callback function invoked when user clicks on the mouse/trackpad | null */
  onMouseDown: PropTypes.func,
  /** @prop Placeholder text to display when Input is empty | '' */
  placeholder: PropTypes.string,
  /*** @prop Determines if Input can be edited | false */
  readOnly: PropTypes.bool,
  /** @prop Secondary Input label | '' */
  secondaryLabel: PropTypes.string,
  /** @prop Input shape property | '' */
  shape: PropTypes.string,
  /** @prop Input type | 'text' */
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
  /** @prop Input value | '' */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  className: '',
  clear: false,
  clearAriaLabel: null,
  containerSize: '',
  defaultValue: '',
  disabled: false,
  messageArr: [],
  htmlId: null,
  inputAfter: null,
  inputBefore: null,
  id: null,
  inputClassName: '',
  helpText: '',
  inputRef: null,
  inputSize: '',
  isFilled: false,
  label: '',
  multiline: false,
  name: null,
  nestedLevel: 0,
  onChange: null,
  onDoneEditing: null,
  onFocus: null,
  onKeyDown: null,
  onMouseDown: null,
  placeholder: '',
  readOnly: false,
  secondaryLabel: '',
  shape: '',
  type: 'text',
  value: '',
};

Input.displayName = 'Input';

export default Input;
