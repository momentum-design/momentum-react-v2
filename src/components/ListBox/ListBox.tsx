import React, { RefObject, ReactElement, forwardRef } from 'react';
import classnames from 'classnames';

import './ListBox.style.scss';
import { Props } from './ListBox.types';
import { DEFAULTS, STYLE } from './ListBox.constants';
import { useListBox } from 'react-aria';
import { ListState } from '@react-stately/list';
import ListBoxSection from '../ListBoxSection';
import ListBoxItem from '../ListBoxItem';

export const ListBoxContext = React.createContext<ListState<unknown>>(null);

const ListBox = forwardRef(
  <T extends unknown>(props: Props<T>, ref: RefObject<HTMLUListElement>) => {
    const { className } = props;

    // Implementation goes here
    const { state, ...otherProps } = props;

    // Get props for the listbox
    const { listBoxProps } = useListBox(
      {
        autoFocus: props.autoFocus,
        disallowEmptySelection: true,
        ...otherProps,
      },
      state,
      ref
    );

    return (
      <ListBoxContext.Provider value={state}>
        <ul {...listBoxProps} ref={ref} className={classnames(className, STYLE.wrapper)}>
          {[...state.collection].map((item) =>
            item.hasChildNodes ? (
              <ListBoxSection key={item.key} section={item} header={item.rendered} />
            ) : (
              <ListBoxItem item={item} key={item.key} />
            )
          )}
        </ul>
      </ListBoxContext.Provider>
    );
  }
) as <T>(props: Props<T> & { ref?: RefObject<HTMLUListElement> }) => ReactElement;

/**
 * TODO: Add description of component here.
 */

export default ListBox;
