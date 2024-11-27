import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from '../../utils/snakeCase';
import { Spinner } from '@momentum-ui/react-collaboration';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
const ChatContentItem = (props) => {
  const {
    actionNode,
    aspect,
    className,
    content,
    gifIcon,
    isProtected,
    loading,
    subtitle,
    onClick,
    style,
    title,
    ...otherProps
  } = props;

  delete otherProps.fileSize;

  const kebabify = (holder, aspect) => {
    const cases = ['fourThree', 'sixteenNine', 'threeTwo'];
    const kebab = snakeCase(aspect);

    if (holder === 'container') {
      if (cases.includes(aspect)) {
        return ` md-content__chat-${kebab}`;
      }
    } else if (holder === 'inner') {
      if (cases.includes(aspect)) {
        return ' md-content-file--full';
      } else {
        return ` md-content-file--chat-${kebab}`;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return (
    <div
      className={
        'md-content__chat-inner-container' +
        `${(aspect === 'wide' && ' md-content__chat-wide-container') || ''}` +
        `${(aspect && kebabify('container', aspect)) || ''}`
      }
      {...otherProps}
    >
      <div
        className={
          `${(aspect && kebabify('inner', aspect)) || ''}` +
          `${(!aspect && ' md-content-file--full') || ''}` +
          `${(onClick && ' md-content-file--clickable') || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="presentation"
        style={{
          backgroundImage: content && `url(${content})`,
          ...style,
        }}
      >
        {loading && (
          <div className={`${content ? ' md-content--opacity' : ' md-content--centered'}`}>
            <Spinner />
          </div>
        )}
        {gifIcon && <i className={`${gifIcon} md-content__gif`} />}
      </div>
      {!loading && (
        <div
          className={
            'md-content__hover' + `${(aspect === 'wide' && ' md-content__hover--wide') || ''}`
          }
        >
          <div className="md-content__hover-files">
            <span title={title} className="md-content__hover-files--file-name">
              {title}
            </span>
            <span className="md-content__hover-files--file-size">{subtitle}</span>
          </div>
          {actionNode && !isProtected && (
            <div className="md-content__hover-icons">{actionNode}</div>
          )}
        </div>
      )}
    </div>
  );
};

ChatContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: '',
  fileSize: '',
  gifIcon: '',
  isProtected: null,
  loading: false,
  subtitle: '',
  onClick: null,
  style: null,
  title: '',
  type: '',
};

ChatContentItem.propTypes = {
  actionNode: PropTypes.node,
  aspect: PropTypes.oneOf([
    'oneOne',
    'tall',
    'threeFour',
    'wide',
    'fourThree',
    'nineSixteen',
    'sixteenNine',
    'twoThree',
    'threeTwo',
  ]),
  className: PropTypes.string,
  content: PropTypes.string,
  fileSize: PropTypes.string,
  gifIcon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  subtitle: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
};

ChatContentItem.displayName = 'ChatContentItem';

export default ChatContentItem;
