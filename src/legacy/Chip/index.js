/** @component chip */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@momentum-ui/react-collaboration';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
const Chip = ({
  className,
  leftContent,
  fileDownloadLink,
  fileType,
  rightContent,
  subTitle,
  title,
  type,
}) => {
  Chip.displayName = 'Chip';

  // This appears to be a false positive
  // See: https://github.com/yannickcr/eslint-plugin-react/issues/1181
  // eslint-disable-next-line react/no-multi-comp
  function buildChipLeft() {
    if (type === 'file') {
      return <Icon name={`file-${fileType}_32`} />;
    }

    if (type === 'recording') {
      return <Icon name="play-circle_32" color="white" />;
    }

    if (type === 'unauthorized') {
      return <Icon name="warning_32" />;
    }

    return leftContent;
  }

  // eslint-disable-next-line react/no-multi-comp
  function buildChipRight() {
    if (rightContent) {
      return rightContent;
    }

    if (type === 'file' && fileDownloadLink) {
      return (
        <a className="file-download" download href={fileDownloadLink}>
          <i className="icon icon-download_32" />
        </a>
      );
    }

    return null;
  }

  const chipLeft = buildChipLeft();
  const chipRight = buildChipRight();

  return (
    <div className={'md-chip' + `${(className && ` ${className}`) || ''}`}>
      <div className={'md-chip-left' + `${(type && ` ${type}`) || ''}`}>{chipLeft}</div>
      <div className="md-chip-center">
        {title && <div className="md-chip__title lead">{title}</div>}
        {subTitle && <div className="md-chip__sub-title subheader">{subTitle}</div>}
      </div>
      {chipRight && <div className="md-chip-right">{chipRight}</div>}
    </div>
  );
};

Chip.propTypes = {
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets file for anchor element to download | '' */
  fileDownloadLink: PropTypes.string,
  /** @prop Sets type of file | null */
  fileType: PropTypes.oneOf([
    'audio',
    'graph',
    'image',
    'locked',
    'missing',
    'pdf',
    'spreadsheet',
    'text',
    'video',
    'zip',
  ]),
  /** @prop Node that becomes the content on the left of Chip | null */
  leftContent: PropTypes.node,
  /** @prop NOde that becomes the content on the right of Chip | null */
  rightContent: PropTypes.node,
  /** @prop Text of the Chip's subtitle | '' */
  subTitle: PropTypes.string,
  /** @prop Text of the Chip's title | null */
  title: PropTypes.string,
  /** @prop Sets the type of icon for the Chip | null */
  type: PropTypes.oneOf(['file', 'recording', 'unauthorized']),
};

Chip.defaultProps = {
  className: '',
  fileDownloadLink: '',
  fileType: null,
  leftContent: null,
  rightContent: null,
  subTitle: '',
  title: null,
  type: null,
};

export default Chip;
