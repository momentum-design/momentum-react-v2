/** @component avatar */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Loading, Icon } from '@momentum-ui/react-collaboration';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class Avatar extends React.Component {
  static displayName = 'Avatar';

  state = {
    isImageLoaded: false,
    isImageErrored: false,
  };

  componentDidMount() {
    const img = this.image;
    if (img && img.complete) {
      this.handleImgLoaded();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.handleImgChange();
    }
  }

  handleImgChange = () => {
    this.setState({
      isImageLoaded: false,
      isImageErrored: false,
    });
  };

  handleImgError = () => {
    this.setState({
      isImageErrored: true,
    });
  };

  handleImgLoaded = () => {
    this.setState({
      isImageLoaded: true,
    });
  };

  render() {
    const {
      alt,
      backgroundColor,
      buttonClassName,
      className,
      color,
      failureBadge,
      hasNotification,
      hideDefaultTooltip,
      icon,
      initials,
      isDecrypting,
      isOverview,
      onClick,
      size,
      src,
      theme,
      title,
      type,
      ...otherProps
    } = this.props;
    const { isImageLoaded, isImageErrored } = this.state;

    const getInitials = () => {
      if (initials) return initials;
      if (!title.replace(/\s/g, '').length) return '';
      let letters = [];
      const words = title.trim().split(/ +/);

      letters.push(String.fromCodePoint(words[0].codePointAt(0)));

      if (type !== 'group' && words.length > 1) {
        letters.push(String.fromCodePoint(words[words.length - 1].codePointAt(0)));
      }
      return letters.join('');
    };

    const getIcon = () => {
      if (icon.type.displayName === 'Icon') {
        return (
          <span
            className={'md-avatar__icon' + `${isOverview ? ' md-avatar__icon--overview' : ''}`}
            style={{ backgroundColor, color }}
          >
            {icon}
          </span>
        );
      }
      throw new Error('Icon prop should be a component of type Icon');
    };

    const getLetter = () => {
      return (
        <span
          key="letter"
          className={
            'md-avatar__letter' +
            `${(isDecrypting && ` md-decrypting`) || ''}` +
            `${(isImageLoaded && ` md-avatar__img--hidden`) || ''}`
          }
          style={{ backgroundColor, color }}
        >
          {getInitials()}
        </span>
      );
    };

    const getChildren = () => {
      if (type === 'self') {
        return (
          <span key="self" className="md-avatar__self" style={{ backgroundColor, color }}>
            <Icon name={size === 40 || size === 'medium' ? 'chat-active_18' : 'chat-active_16'} />
          </span>
        );
      } else if (src && !isImageErrored) {
        // image src is present and image has not yet errored
        const imgChildren = [];
        // image is not loaded and title is provided
        if (title && !isImageLoaded) {
          imgChildren.push(getLetter());
        }
        imgChildren.push(
          <img
            alt={alt}
            className={`md-avatar__img` + `${(!isImageLoaded && ` md-avatar__img--hidden`) || ''}`}
            draggable={false}
            key={`image-${imgChildren.length}`}
            onError={this.handleImgError}
            onLoad={this.handleImgLoaded}
            src={src}
            ref={(ref) => (this.image = ref)}
          />
        );
        return imgChildren;
      } else if (icon) {
        return getIcon();
      } else if (title) {
        return getLetter();
      }
    };

    const getAvatar = () => (
      <div
        className={
          'md-avatar' +
          `${(onClick && ` md-avatar--clickable`) || ''}` +
          `${(onClick && type === 'bot' && ` md-avatar--clickable-bot`) || ''}` +
          `${(type && ` md-avatar--${type}`) || ''}` +
          `${(size && ` md-avatar--${size}`) || ''}` +
          `${(theme && ` md-avatar--${theme}`) || ''}` +
          `${(isDecrypting && ` md-decrypting`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        title={!hideDefaultTooltip ? title : ''}
        {...(!onClick && { ...otherProps })}
      >
        {getChildren()}
        {type === 'typing' && <Loading />}
        {failureBadge && <span className="md-avatar__failure-badge" />}
        {hasNotification && <span className="md-avatar__notification-badge" />}
      </div>
    );

    return onClick ? (
      <Button className={buttonClassName} circle onClick={onClick} removeStyle {...otherProps}>
        {getAvatar()}
      </Button>
    ) : (
      getAvatar()
    );
  }
}

Avatar.propTypes = {
  /** @prop Image alt tag | '' */
  alt: PropTypes.string,
  /** @prop Set Avatar background color | '' */
  backgroundColor: PropTypes.string,
  /** @prop Optional css class string for button | '' */
  buttonClassName: PropTypes.string,
  /** @prop Optional css class string for Avatar component | null */
  className: PropTypes.string,
  /** @prop Set Avatar text color | '' */
  color: PropTypes.string,
  /** @prop Set existance of a failureBadge on the Avatar | false */
  failureBadge: PropTypes.bool,
  /** @prop Set existance of a notification on the Avatar | false */
  hasNotification: PropTypes.bool,
  /** @prop Set the visibility of Avatar's default tooltip | false */
  hideDefaultTooltip: PropTypes.bool,
  /** @prop Optional icon component for the Avatar | null */
  icon: PropTypes.element,
  /** @prop Optional string for avatar's initials | null*/
  initials: PropTypes.string,
  /** @prop Set if Avatar's content is decrypting | false */
  isDecrypting: PropTypes.bool,
  /** @prop Set existance of Avatar's Overview | false */
  isOverview: PropTypes.bool,
  /** @prop Handler to be called when the user taps the Avatar | null */
  onClick: PropTypes.func,
  /** @prop Set the size of the Avatar from one of the preconfigured options | 'medium' */
  size: PropTypes.oneOf([
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
    18,
    24,
    28,
    36,
    40,
    44,
    52,
    56,
    72,
    80,
    84,
  ]),
  /** @prop Optional image source for the Avatar | null */
  src: PropTypes.string,
  /** @prop Optional Avatar color theme | null */
  theme: PropTypes.string,
  /** @prop set Avatar title / user's name | null */
  title: PropTypes.string,
  /** @prop optional Avatar type | '' */
  type: PropTypes.oneOf([
    '',
    'active',
    'bot',
    'call',
    'dnd',
    'group',
    'inactive',
    'meeting',
    'ooo',
    'presenting',
    'self',
    'typing',
  ]),
};

Avatar.defaultProps = {
  alt: '',
  backgroundColor: '',
  buttonClassName: '',
  className: null,
  color: '',
  failureBadge: false,
  hasNotification: false,
  hideDefaultTooltip: false,
  icon: null,
  initials: null,
  isDecrypting: false,
  isOverview: false,
  onClick: null,
  size: 'medium',
  src: null,
  theme: null,
  title: null,
  type: '',
};

export default Avatar;
