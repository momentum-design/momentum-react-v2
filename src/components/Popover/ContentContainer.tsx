import React, { FC } from 'react';
import classnames from 'classnames';
import Arrow from './Arrow';
import { DEFAULTS, STYLE } from './Popover.constants';
import type { Props } from './Popover.types';
import type { Placement } from './Arrow.types';

interface ContentContainerProps
  extends Pick<Props, 'containerProps' | 'color' | 'className' | 'children' | 'id' | 'style'> {
  /**
   * attrs - Tippy attributes passed in
   */
  attrs: {
    'data-placement': Placement;
    'data-reference-hidden'?: string;
    'data-escaped'?: string;
  };
}

/**
 * The ContentContainer component will wrap the content of the popover (=children)
 * in a styled div, which will ensure padding and a proper styling is applied to the content
 * of the Popover. The ContentContainer also adds the arrow of the popover to the DOM.
 */
const ContentContainer: FC<ContentContainerProps> = (props: ContentContainerProps) => {
  const { attrs, containerProps, color, className, children, id, style } = props;

  return (
    <div
      id={id}
      data-padded={containerProps.isPadded || DEFAULTS.IS_PADDED}
      data-round={containerProps.round || DEFAULTS.ROUND}
      data-color={color || DEFAULTS.COLOR}
      style={style}
      className={classnames(STYLE.wrapper, className)}
      {...attrs}
    >
      {children}
      {/*arrow has to be wrapped in HTML element to allow Tippy to style it*/}
      <div id="arrow" className={classnames(STYLE.arrowWrapper)}>
        <Arrow placement={attrs['data-placement']} color={color} />
      </div>
    </div>
  );
};

export default ContentContainer;
