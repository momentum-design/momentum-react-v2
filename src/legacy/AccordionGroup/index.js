/** @component accordion */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class AccordionGroup extends React.Component {
  static displayName = 'AccordionGroup';

  static childContextTypes = {
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  getChildContext = () => {
    return {
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
    };
  };

  componentDidMount() {
    if (!this.verifyChildren()) {
      throw new Error(
        'AccordionGroup should contain 2 children ' +
          'AccordionHeader and AccordionContent respectively.'
      );
    }
  }

  verifyChildren = () => {
    const { children } = this.props;
    const childrenArr = React.Children.toArray(children);
    return (
      children &&
      childrenArr.length === 2 &&
      childrenArr[0].type.displayName === 'AccordionHeader' &&
      childrenArr[1].type.displayName === 'AccordionContent'
    );
  };

  render() {
    const { children, className, isExpanded, disabled, focus, showSeparator } = this.props;

    const setGroupContent = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        disabled,
        focus,
        showSeparator,
      });
    });

    return (
      <div
        aria-expanded={isExpanded}
        className={
          `md-accordion__group` +
          `${(disabled && ' md-accordion__group--disabled') || ''}` +
          `${(isExpanded && ` md-accordion__group--active`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
      >
        {setGroupContent}
      </div>
    );
  }
}

AccordionGroup.propTypes = {
  /** @prop Children nodes to render inside Accordion | null  */
  children: PropTypes.node,
  /** @prop Set accordionGroup to be expanded | false  */
  isExpanded: PropTypes.bool,
  /** @prop Handler to be called when the user taps the AccordionGroup | null */
  onClick: PropTypes.func,
  /** @prop Handler to be called when the user presses a key | null */
  onKeyDown: PropTypes.func,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Set the attribute disabled to the accordionGroup | false */
  disabled: PropTypes.bool,
  /** @prop Specifies if AccordionGroup show automatically get focus when page loads | false  */
  focus: PropTypes.bool,
  /** @prop Optional underline under Accordion menu item | false */
  showSeparator: PropTypes.bool,
};

AccordionGroup.defaultProps = {
  children: null,
  isExpanded: false,
  onClick: null,
  onKeyDown: null,
  className: '',
  disabled: false,
  focus: false,
  showSeparator: false,
};

export default AccordionGroup;
