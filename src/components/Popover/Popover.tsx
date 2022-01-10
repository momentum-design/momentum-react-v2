import React, { FC } from 'react';
import Tippy from '@tippyjs/react';
import ContentContainer from './ContentContainer';
import './Popover.style.scss';
import type { Props } from './Popover.types';

/**
 * The Popover component allows adding a Popover to whatever provided
 * `triggerComponent`. It will show the Popover after a specific event, which is
 * defined by the provided `trigger` prop.
 *
 * Popover uses @tippyjs/react under the hood - possible attributes for future modification
 * can be found here: https://atomiks.github.io/tippyjs/v6/all-props/
 */
const Popover: FC<Props> = (props: Props) => {
  const {
    children,
    trigger = 'click',
    triggerComponent,
    containerProps,
    placement = 'bottom',
    interactive,
    showArrow = true,
    color,
    className,
    id,
    style,
  } = props;

  return (
    <Tippy
      render={(attrs) => (
        <ContentContainer
          attrs={attrs}
          id={id}
          style={style}
          containerProps={containerProps}
          color={color}
          showArrow={showArrow}
          className={className}
        >
          {children}
        </ContentContainer>
      )}
      placement={placement}
      trigger={trigger}
      interactive={interactive}
      appendTo="parent"
      popperOptions={{
        modifiers: [
          showArrow && {
            name: 'arrow',
            options: {
              element: '#arrow', // css selector to point to arrow div
              padding: 5,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
            },
          },
        ],
      }}
      animation={false}
      // default offset of 5px + 11px (size of arrow standing out of popover)
      offset={[0, showArrow ? 16 : 5]}
    >
      {triggerComponent}
    </Tippy>
  );
};

export default Popover;
