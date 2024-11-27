/** @component tabs */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class Tabs extends React.Component {
  state = {
    activeIndex: 0,
    focus: this.props.focus,
    tabType: this.props.tabType,
  };

  getChildContext = () => {
    return {
      activeIndex: this.state.activeIndex,
      onActivate: (index) => this.setSelected(index),
      onFocus: (index) =>
        this.setState({
          focus: index,
        }),
      focus: this.state.focus,
      tabType: this.props.tabType,
    };
  };

  componentDidMount() {
    const tabsCount = this.getChildrenElements('TabList');
    const panelsCount = this.getChildrenElements('TabContent');

    if (tabsCount !== panelsCount) {
      throw new Error(`There should be an equal number of Tabs and TabPanels.
      Received ${tabsCount} Tabs and ${panelsCount} TabPanels.`);
    }
  }

  getMobileListItems = () => {
    return React.Children.map(this.props.children, (child) => {
      if (child.type.displayName === 'TopbarNav') {
        return child.props.children;
      }
    });
  };

  getChildrenElements = (name) => {
    let elementCount = 0;

    React.Children.forEach(this.props.children, (child) => {
      if (child.type.displayName === name) {
        return child.props.children.length
          ? (elementCount += child.props.children.length)
          : elementCount++;
      }
    });

    return elementCount;
  };

  setSelected = (index) => {
    // Don't do anything if index is the same or outside of the bounds
    if (
      index === this.state.activeIndex ||
      index < 0 ||
      index >= this.getChildrenElements('TabList')
    )
      return;

    // Keep reference to last index for event handler
    const last = this.state.activeIndex;

    // Update state with selected index
    this.setState({
      activeIndex: index,
    });
    // Call change event handler
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(index, last);
    }
  };

  render() {
    const { children, className, tabType, justified } = this.props;

    const cloneChildren = React.Children.map(children, (child) => {
      if (child.type.displayName === 'TabContent') {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex,
        });
      } else if (child.type.displayName === 'TabList') {
        return React.cloneElement(child, {
          role: 'tab',
          isType: this.props.tabType,
        });
      } else {
        return child;
      }
    });

    return (
      <div
        className={
          'md-tab' +
            `${(tabType && ` md-tab--${tabType}`) || ''}` +
            `${(justified && ` md-tab--justified`) || ''}` +
            (className && ` ${className}`) || ''
        }
        type={tabType}
      >
        {' '}
        {cloneChildren}{' '}
      </div>
    );
  }
}

Tabs.propTypes = {
  /** @prop Determines if Tab is active | false */
  active: PropTypes.bool,
  /** @prop Children nodes of Tab and TabContent are required */
  children: PropTypes.node.isRequired,
  /** @prop Optional CSS class name | '' */
  className: PropTypes.string,
  /** @prop Set the index of the focused Tab | 0 */
  focus: PropTypes.number,
  /** @prop Determines if the Tabs are in a justified layout | false */
  justified: PropTypes.bool,
  /** @prop Callback function invoked when user selects a tab | null */
  onSelect: PropTypes.func,
  /** @prop Type of Tabs | 'pills' */
  tabType: PropTypes.oneOf(['pills']),
};

Tabs.defaultProps = {
  active: false,
  className: '',
  focus: 0,
  justified: false,
  onSelect: null,
  tabType: 'pills',
};

Tabs.childContextTypes = {
  focus: PropTypes.number,
  activeIndex: PropTypes.number,
  onActivate: PropTypes.func,
  onFocus: PropTypes.func,
  tabType: PropTypes.string,
};

Tabs.displayName = 'Tabs';

export default Tabs;
