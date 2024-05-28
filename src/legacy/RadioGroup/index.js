/** @component radio */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values || [],
    };
  }

  handleToggle = (value) => {
    let newValues;
    const { onChange } = this.props;
    const { values } = this.state;
    const isActive = values.includes(value);

    if (!isActive) {
      newValues = [value];
      onChange(value);
    } else {
      return;
    }

    this.setState({
      values: newValues,
    });
  };

  render() {
    const { children, name } = this.props;
    const { values } = this.state;

    const addHandlersToChildren = () => {
      return React.Children.map(children, (child) => {
        const { value } = child.props;
        return React.cloneElement(child, {
          name: name,
          checked: values.includes(value),
          onChange: () => this.handleToggle(value),
        });
      });
    };

    return <div className={`md-radio-group`}>{addHandlersToChildren()}</div>;
  }
}

RadioGroup.propTypes = {
  /** @prop Children nodes to render inside RadioGroup | null */
  children: PropTypes.node,
  /** @prop An HTML `<input>` name for each child button | '' */
  name: PropTypes.string,
  /** @prop Callback function called with value or array of values when invoked by user making a change with the RadioGroup | () => {} */
  onChange: PropTypes.func,
  /** @prop Array of values, of the active (pressed) buttons | [] */
  values: PropTypes.array,
};

RadioGroup.defaultProps = {
  children: null,
  name: '',
  onChange: () => {},
  values: [],
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
