/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/ban-types */
import React, { RefObject, ReactElement, forwardRef, useRef } from 'react';

import './ListBox.style.scss';
import { Props } from './ListBox.types';
import { DEFAULTS, STYLE } from './ListBox.constants';
import ListBoxBase from '../ListBoxBase';
import { useListState } from '@react-stately/list';
import classnames from 'classnames';

const ListBox = forwardRef(
  <T extends object>(props: Props<T>, ref: RefObject<HTMLUListElement>) => {
    const _ref = ref || useRef<HTMLUListElement>(null);
    const { className } = props;
    const state = useListState(props);

    return (
      <ListBoxBase
        {...props}
        ref={_ref}
        state={state}
        className={classnames(STYLE.wrapper, className)}
      />
    );
  }
) as <T>(props: Props<T> & { ref?: RefObject<HTMLUListElement> }) => ReactElement;

/**
 * TODO: Add description of component here.
 */

export default ListBox;
