/** @component lightbox */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { Spinner, Icon } from '@momentum-ui/react-collaboration';
import ButtonSimple from '../../components/ButtonSimple';
import TooltipNext from '../../components/Tooltip';
import IconNext from '../../components/Icon';
import MomentumThemeProvider from '../../components/ThemeProvider';
import LoadingSpinner from '../../components/LoadingSpinner';

import { v4 as uuidv4 } from 'uuid';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.nameId = uuidv4();
  }

  state = {
    viewportDimensions: {
      width: 600,
      height: 600,
    },
    zoom: 1,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true);
    window.addEventListener('resize', this.handleResize, true);
    const { viewport } = this;
    if (viewport && viewport.clientWidth && viewport.clientHeight) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        viewportDimensions: {
          width: viewport.clientWidth,
          height: viewport.clientHeight,
        },
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index && this.state.zoom > 1 && this.imgWrapper) {
      const viewportNode = this.viewport;
      viewportNode.scrollTop = 0;
      viewportNode.scrollLeft = (this.imgWrapper.offsetWidth - viewportNode.offsetWidth) / 2;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true);
    window.removeEventListener('resize', this.handleResize, true);
  }

  handleResize = () => {
    const { viewport } = this;
    this.setState({
      viewportDimensions: {
        width: viewport.offsetWidth,
        height: viewport.offsetHeight,
      },
    });
  };

  handleKeyDown = (e) => {
    const { index, pages } = this.props;
    let newIndex;

    switch (e.keyCode) {
      // Escape
      case 27:
        this.handleClose();
        return;
      // left arrow & up arrow
      case 37:
      case 38:
        newIndex = Math.max(index - 1, 0);
        break;
      // right arrow & down arrow
      case 39:
      case 40:
        newIndex = Math.min(index + 1, pages.length - 1);
        break;
      // page up & home
      case 33:
      case 36:
        newIndex = 0;
        break;
      // page down & end
      case 34:
      case 35:
        newIndex = pages.length - 1;
        break;
      // 1 - 9
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        newIndex = Math.min(e.keyCode - 49, pages.length - 1);
        break;
      default:
        return;
    }
    this.triggerPageChange(newIndex, e, true);
  };

  handleThumbnailClick = (index) => {
    const { onChange } = this.props;
    onChange && onChange(index);
  };

  triggerPageChange = (index, e, needFocus) => {
    const { onChange, pages } = this.props;
    const target = this.lightBox && this.lightBox.querySelector(`[data-index="${index}"]`);
    if (index >= 0 && index <= pages.length - 1) {
      onChange && onChange(index);
    }
    e.stopPropagation();
    target && target.scrollIntoViewIfNeeded && target.scrollIntoViewIfNeeded();
    target && needFocus && target.parentElement.focus();
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  setZoom = (increment) => {
    const newZoom = this.state.zoom + increment;
    this.setState({
      zoom: newZoom < 0.25 ? 0.25 : newZoom,
    });
  };

  handleDownload = () => {
    const { onDownload } = this.props;
    onDownload && onDownload();
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  render() {
    const {
      pages,
      index,
      width,
      height,
      tooltips,
      downloading,
      info,
      name,
      applicationId,
      imgClassName,
      isImageRotated,
    } = this.props;
    const { zoom, viewportDimensions } = this.state;
    const currentPage = pages[index];
    const showColumn = pages.length > 1;

    const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
      let maxW, maxH;
      if (isImageRotated) {
        maxW = maxHeight;
        maxH = maxWidth;
      } else {
        maxW = maxWidth;
        maxH = maxHeight;
      }
      const ratio = Math.min(maxW / srcWidth, maxH / srcHeight, 1);
      return {
        width: Math.round(srcWidth * ratio),
        height: Math.round(srcHeight * ratio),
        ratio,
      };
    };

    const getThumbnails = () => {
      const thumbnails = pages.map((page, idx) => {
        let key = `${idx}:${page.thumb}`;
        let body;

        if (page.decrypting) {
          const scale = width / 150;
          const scaleY = height / scale;
          const style = {
            height: Math.round(scaleY),
          };
          key += ':decrypting';

          body = (
            <div
              className={
                `md-lightbox__thumbnail` +
                `${(!!page.decrypting && ` md-lightbox__thumbnail--decrypting`) || ''}`
              }
              data-index={idx}
              style={style}
            >
              <Icon className="md-lightbox__thumbnail--icon" name="secure_28" />
            </div>
          );
        } else {
          body = (
            <img
              alt={name}
              className={
                `md-lightbox__thumbnail` +
                `${(!!page.decrypting && ` md-lightbox__thumbnail--decrypting`) || ''}`
              }
              data-index={idx}
              draggable="false"
              onDragStart={() => false}
              src={page.thumb}
            />
          );
        }

        return (
          <div
            className={
              'md-lightbox__thumbnail-wrapper' +
              `${(idx === index && ` md-lightbox__thumbnail-wrapper--selected`) || ''}`
            }
            key={key}
            onClick={() => this.handleThumbnailClick(idx)}
            onKeyPress={() => this.handleThumbnailClick(idx)}
            role="tab"
            tabIndex="0"
            aria-selected={idx === index ? true : false}
          >
            {body}
            <div>{idx + 1}</div>
          </div>
        );
      });
      return <div className="md-lightbox__list">{thumbnails}</div>;
    };

    let newWidth = width;
    let newHeight = height;

    const getViewport = () => {
      let viewport;
      let imageContainerStyles;

      if (currentPage.content) {
        if (currentPage.fullView) {
          imageContainerStyles = {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          };
        }
        viewport = (
          <div
            className="md-lightbox__viewport-content"
            draggable="false"
            onClick={this.stopPropagation}
            onKeyPress={this.stopPropagation}
            onDoubleClick={() => this.setZoom(0.25)}
            onDragStart={() => false}
            role="button"
            tabIndex="0"
          >
            {currentPage.content}
          </div>
        );
      } else if (currentPage.image) {
        if (zoom <= 1) {
          const dimensions = calculateAspectRatioFit(
            width * zoom,
            height * zoom,
            viewportDimensions.width,
            viewportDimensions.height
          );
          newHeight = dimensions.height;
          newWidth = dimensions.width;
          imageContainerStyles = {
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          };
          /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
          viewport = (
            <img
              alt={name}
              className={
                'md-lightbox__viewport-image' + `${(imgClassName && ` ${imgClassName}`) || ''}`
              }
              draggable="false"
              onClick={this.stopPropagation}
              onKeyPress={this.stopPropagation}
              onDoubleClick={() => this.setZoom(0.25)}
              onDragStart={() => false}
              src={currentPage.image}
            />
          );
        } else {
          const dimensions = calculateAspectRatioFit(
            width,
            height,
            viewportDimensions.width,
            viewportDimensions.height
          );
          imageContainerStyles = {};
          newHeight = dimensions.height * zoom;
          newWidth = dimensions.width * zoom;
          viewport = (
            <img
              alt={name}
              className={
                'md-lightbox__viewport-image' + `${(imgClassName && ` ${imgClassName}`) || ''}`
              }
              draggable="false"
              onClick={this.stopPropagation}
              onKeyPress={this.stopPropagation}
              onDoubleClick={() => this.setZoom(0.25)}
              onDragStart={() => false}
              src={currentPage.image}
              style={{
                maxHeight: newHeight,
                maxWidth: newWidth,
                minHeight: newHeight,
                minWidth: newWidth,
              }}
            />
          );
        }
      }

      return (
        <div
          className="md-lightbox__viewport-wrapper"
          ref={(ref) => (this.imgWrapper = ref)}
          style={imageContainerStyles}
        >
          {viewport}
        </div>
      );
    };

    const leftArrowControl = (
      <TooltipNext
        type="label"
        placement="right"
        triggerComponent={
          <ButtonSimple
            className="md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--left"
            onPress={(e) => this.triggerPageChange(index - 1, e)}
          >
            <IconNext
              name="arrow-left"
              color="var(--mds-color-theme-common-text-primary-normal)"
              scale={16}
            />
          </ButtonSimple>
        }
      >
        {tooltips.previous}
      </TooltipNext>
    );

    const rightArrowControl = (
      <TooltipNext
        type="label"
        placement="left"
        triggerComponent={
          <ButtonSimple
            className="md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--right"
            onPress={(e) => this.triggerPageChange(index + 1, e)}
          >
            <IconNext
              name="arrow-right"
              color="var(--mds-color-theme-common-text-primary-normal)"
              scale={16}
            />
          </ButtonSimple>
        }
      >
        {tooltips.next}
      </TooltipNext>
    );

    const viewportControls = () => {
      const downloadButton = (
        <TooltipNext
          type="label"
          placement="top"
          triggerComponent={
            <ButtonSimple
              className="md-lightbox__control md-lightbox__control-download"
              onPress={this.handleDownload}
            >
              {downloading ? (
                <LoadingSpinner />
              ) : (
                <IconNext
                  name="download"
                  color="var(--mds-color-theme-common-text-primary-normal)"
                  scale={20}
                  weight="light"
                />
              )}
            </ButtonSimple>
          }
        >
          {downloading ? tooltips.downloading : tooltips.download}
        </TooltipNext>
      );

      const controlStyle = currentPage.content
        ? {
            visibility: 'hidden',
          }
        : {};

      const pageControl =
        pages.length > 1 ? (
          <div className="md-lightbox__controls md-lightbox__controls--center">
            <TooltipNext
              type="label"
              placement="top"
              triggerComponent={
                <ButtonSimple
                  className="md-lightbox__control md-lightbox__control-left"
                  onPress={(e) => this.triggerPageChange(index - 1, e)}
                >
                  <IconNext
                    name="arrow-left"
                    color="var(--mds-color-theme-common-text-primary-normal)"
                    scale={20}
                    weight="light"
                  />
                </ButtonSimple>
              }
            >
              {tooltips.previous}
            </TooltipNext>
            <span className="md-lightbox__control-value">{`${index + 1} / ${pages.length}`}</span>
            <TooltipNext
              type="label"
              placement="top"
              triggerComponent={
                <ButtonSimple
                  className="md-lightbox__control md-lightbox__control-right"
                  onPress={(e) => this.triggerPageChange(index + 1, e)}
                >
                  <IconNext
                    name="arrow-right"
                    color="var(--mds-color-theme-common-text-primary-normal)"
                    scale={20}
                    weight="light"
                  />
                </ButtonSimple>
              }
            >
              {tooltips.next}
            </TooltipNext>
          </div>
        ) : (
          <div className="md-lightbox__controls">
            <span className="md-lightbox__control-value">{index + 1}</span>
          </div>
        );

      return (
        <div
          className="md-lightbox__viewer-controls"
          onClick={this.stopPropagation}
          onKeyPress={this.stopPropagation}
          role="group"
        >
          <div className="md-lightbox__controls" style={controlStyle}>
            <TooltipNext
              type="label"
              placement="top"
              triggerComponent={
                <ButtonSimple
                  className="md-lightbox__control"
                  data-test="zoom-out-button"
                  onPress={() => this.setZoom(-0.25)}
                >
                  <IconNext
                    name="zoom-out"
                    color="var(--mds-color-theme-common-text-primary-normal)"
                    scale={20}
                    weight="light"
                  />
                </ButtonSimple>
              }
            >
              {tooltips.zoomOut}
            </TooltipNext>
            <span className="md-lightbox__control-value md-lightbox__control-zoom-level">
              {`${Math.round(((newHeight * 1.0) / height) * 100)}%`}
            </span>
            <TooltipNext
              type="label"
              placement="top"
              triggerComponent={
                <ButtonSimple
                  className="md-lightbox__control"
                  data-test="zoom-in-button"
                  onPress={() => this.setZoom(0.25)}
                >
                  <IconNext
                    name="zoom-in"
                    color="var(--mds-color-theme-common-text-primary-normal)"
                    scale={20}
                    weight="light"
                  />
                </ButtonSimple>
              }
            >
              {tooltips.zoomIn}
            </TooltipNext>
          </div>
          {pageControl}
          {this.props.onDownload && downloadButton}
        </div>
      );
    };

    return (
      <Modal
        includeDefaultStyles={false}
        getApplicationNode={() => document.querySelector(`#${applicationId}`)}
        onExit={this.handleClose}
        focusDialog={true}
        titleId="md-lightbox"
        dialogClass="md-lightbox"
        underlayClass="md-lightbox__container"
        aria-labelledby={this.nameId}
      >
        {/* adding this so that focus styling applies to components inside the modal. */}
        <MomentumThemeProvider theme={this.props.theme}>
          <div className="md-lightbox__header">
            <div className="md-lightbox__header-item--left">
              <div className="md-lightbox__header-meta">
                <div className="md-lightbox__header-sharer">{info.sharedBy}</div>
                <div className="md-lightbox__header-timestamp">{info.sharedOn}</div>
              </div>
            </div>
            <div className="md-lightbox__header-item--center">
              <h2 className="md-lightbox__header-name" id={this.nameId}>
                {name}
              </h2>
            </div>
            <div className="md-lightbox__header-item--right">
              <TooltipNext
                type="label"
                placement="bottom-start"
                triggerComponent={
                  <ButtonSimple
                    className="md-lightbox__control md-lightbox__control-close"
                    onPress={this.handleClose}
                  >
                    <IconNext
                      name="cancel"
                      color="var(--mds-color-theme-common-text-primary-normal)"
                      scale={20}
                      weight="light"
                    />
                  </ButtonSimple>
                }
              >
                {tooltips.exit}
              </TooltipNext>
            </div>
          </div>
          <div className="md-lightbox__body" ref={(ref) => (this.lightBox = ref)} role="tablist">
            {showColumn && getThumbnails()}
            <div className="md-lightbox__content">
              <div
                className={
                  `md-lightbox__viewport` +
                  `${(!!currentPage.decrypting && ` md-lightbox__viewport--decrypting`) || ''}`
                }
                ref={(ref) => (this.viewport = ref)}
              >
                {pages[index].decrypting && <Spinner className="md-lightbox__decrypting-spinner" />}
                {getViewport()}
              </div>
              {showColumn && leftArrowControl}
              {showColumn && rightArrowControl}
              {viewportControls()}
            </div>
          </div>
        </MomentumThemeProvider>
      </Modal>
    );
  }
}

Lightbox.propTypes = {
  /** @prop ID for Lightbox query lookup */
  applicationId: PropTypes.string.isRequired,
  /** Determines if info is decrypting | false */
  decrypting: PropTypes.bool,
  /** @prop Optional downloading css styling | false */
  downloading: PropTypes.bool,
  /** @prop Set Height value of Lightbox */
  height: PropTypes.number.isRequired,
  /** @prop Classname appended to img viewport | '' */
  imgClassName: PropTypes.string,
  /** @prop Initial index of start page | 0 */
  index: PropTypes.number,
  /** @prop Lightbox information Object | {} */
  info: PropTypes.shape({
    sharedBy: PropTypes.string,
    sharedOn: PropTypes.string,
    size: PropTypes.string,
  }),
  /** @prop Optional indication if image is rotated | false */
  isImageRotated: PropTypes.bool,
  /** @prop Required name prop for Lightbox */
  name: PropTypes.string.isRequired,
  /** @prop Callback function invoked by user when interact with Lightbox | null */
  onChange: PropTypes.func,
  /** @prop Callback function invoked by user closing the Lightbox | null */
  onClose: PropTypes.func,
  /** @prop Callback function invoked by the download action of Lightbox | null */
  onDownload: PropTypes.func,
  /** @prop Array of Lightbox pages */
  pages: PropTypes.array.isRequired,
  /** @prop tooltip style | {isContained:true, direction: 'bottom-right'} */
  popoverProps: PropTypes.object,
  /** @prop theme -- used to pass down to the ThemeProvider */
  theme: PropTypes.string,
  /** @prop Collection of predefined tootips for various Lightbox actions | { download: 'Download', etc } */
  tooltips: PropTypes.shape({
    download: PropTypes.string,
    downloading: PropTypes.string,
    exit: PropTypes.string,
    previous: PropTypes.string,
    next: PropTypes.string,
    zoomIn: PropTypes.string,
    zoomOut: PropTypes.string,
  }),
  /** @prop Set Width value for Lightbox */
  width: PropTypes.number.isRequired,
};

Lightbox.defaultProps = {
  decrypting: false,
  downloading: false,
  imgClassName: '',
  index: 0,
  info: {},
  isImageRotated: false,
  name: '',
  onChange: null,
  onClose: null,
  onDownload: null,
  popoverProps: {
    isContained: true,
    direction: 'bottom-right',
  },
  theme: 'darkWebex',
  tooltips: {
    download: 'Download',
    downloading: 'Downloading...',
    exit: 'Exit',
    previous: 'Previous',
    next: 'Next',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
  },
};

Lightbox.displayName = 'Lightbox';

export default Lightbox;
