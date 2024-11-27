/** @component topbar */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ListSeparator } from '@momentum-ui/react-collaboration';
import { prefix } from '../utils/index';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class TopbarMobile extends React.Component {
  state = {
    isMobileOpen: false,
  };

  handleClose = () => {
    this.setState({
      isMobileOpen: false,
    });
  };

  handleOpen = () => {
    this.setState({
      isMobileOpen: true,
    });
  };

  handleKeyDown = (e) => {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      this.handleClose();
      e.preventDefault();
    }
  };

  render() {
    const {
      brandNode,
      children,
      className,
      closeMenuAriaLabel,
      shouldCloseOnClick,
      openMenuAriaLabel,
      ...otherProps
    } = this.props;
    const { isMobileOpen } = this.state;

    const mobileButton = (
      <Icon
        name="list-menu_20"
        buttonClassName={`${prefix}-top-bar__mobile-menu-button`}
        onClick={this.handleOpen}
        ariaLabel={openMenuAriaLabel}
        aria-pressed={isMobileOpen}
      />
    );

    const passClickHandlerToChildren = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClick: this.handleClose,
      });
    });

    return (
      <div>
        {!isMobileOpen && mobileButton}
        <div
          className={
            `${prefix}-top-bar__mobile ${prefix}-tb-mobile` +
            `${isMobileOpen ? ' open' : ''}` +
            `${(className && ` ${className}`) || ''}`
          }
          onClick={() => (shouldCloseOnClick ? this.handleClose : null)}
          onKeyDown={this.handleKeyDown}
          role="menu"
          tabIndex={0}
          {...otherProps}
        >
          <Icon
            name="cancel_20"
            buttonClassName={`${prefix}-tb-mobile__close`}
            aria-pressed={isMobileOpen}
            onClick={this.handleClose}
            ariaLabel={closeMenuAriaLabel}
          />
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <span onClick={this.handleClose} onKeyDown={this.handleKeyDown}>
            {brandNode}
          </span>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
          <ListSeparator />
          <nav className={`${prefix}-tb-mobile__nav`}>
            {(!shouldCloseOnClick && passClickHandlerToChildren) || children}
          </nav>
        </div>
        <div
          className={`${prefix}-tb-mobile__mask` + `${isMobileOpen ? ' open' : ''}`}
          onClick={this.handleClose}
          role="none"
        />
      </div>
    );
  }
}

TopbarMobile.propTypes = {
  /** @prop Brand Node | null */
  brandNode: PropTypes.node,
  /** @prop Children node to render inside of TopbarMobile | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Aria Label for close Button | 'Close Menu' */
  closeMenuAriaLabel: PropTypes.string,
  /** @prop Set mobile menu to close on any click | true */
  shouldCloseOnClick: PropTypes.bool,
  /** @prop Aria Label for open Button | 'Open Menu */
  openMenuAriaLabel: PropTypes.string,
};

TopbarMobile.defaultProps = {
  brandNode: null,
  children: null,
  className: '',
  closeMenuAriaLabel: 'Close Menu',
  shouldCloseOnClick: true,
  openMenuAriaLabel: 'Open Menu',
};

TopbarMobile.displayName = 'TopbarMobile';

export default TopbarMobile;
