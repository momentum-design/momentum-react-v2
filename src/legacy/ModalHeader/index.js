/** @component modal */

import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@momentum-ui/react-collaboration';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
class ModalHeader extends React.PureComponent {
  render() {
    const {
      children,
      className,
      closeBtnProps,
      headerLabel,
      message,
      showCloseButton,
      role,
      ariaLevel,
      ariaLabel,
      ...props
    } = this.props;
    const { handleClose } = this.context;

    return (
      <div className={'md-modal__header' + `${(className && ` ${className}`) || ''}`} {...props}>
        {showCloseButton && (
          <div className="md-modal__close-container">
            <CloseIcon className="md-modal__close" onClick={handleClose} aria-label={`Close ${headerLabel || ariaLabel || 'modal'}`} {...closeBtnProps} />
          </div>
        )}
        {children
          ? children
          : [
              <span
                key="title-0"
                className="md-modal__title"
                role={role}
                aria-level={ariaLevel}
                aria-label={ariaLabel}
              >
                {headerLabel}
              </span>,
              message && (
                <span key="title-1" className="md-modal__message">
                  {message}
                </span>
              ),
            ]}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  /** @prop Children nodes to render inside of ModalHeader | null */
  children: PropTypes.node,
  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,
  /** @prop Props to be passed to close button | null */
  closeBtnProps: PropTypes.object,
  /** @prop ModalHeader label text | '' */
  headerLabel: PropTypes.string,
  /** @prop Modal message | '' */
  message: PropTypes.string,
  /** @prop show/hide close button | true */
  showCloseButton: PropTypes.bool,
  /** @prop role modal header | null */
  role: PropTypes.string,
  /** @prop ariaLevel modal header | null */
  ariaLevel: PropTypes.number,
  /** @prop ariaLabel modal header | null */
  ariaLabel: PropTypes.string,
};

ModalHeader.defaultProps = {
  children: null,
  className: '',
  closeBtnProps: null,
  headerLabel: '',
  message: '',
  showCloseButton: true,
  role: null,
  ariaLabel: null,
  ariaLevel: null,
};

ModalHeader.contextTypes = {
  handleClose: PropTypes.func,
};

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
