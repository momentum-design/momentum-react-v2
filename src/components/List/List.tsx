/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, RefObject, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { useListState, ListState } from '@react-stately/list';
import { useListBox } from '@react-aria/listbox';
import { Node } from '@react-types/shared';
import { ReusableView } from '@react-stately/virtualizer';

import { STYLE } from './List.constants';
import { Props } from './List.types';
import './List.style.scss';
import ListBoxItem from '../ListBoxItem';
import ListBoxSection from '../ListBoxSection';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';
import { Virtualizer, VirtualizerItem } from '@react-aria/virtualizer';
import { ListLayout } from '@react-stately/layout';
import Loading from '../../legacy/Loading';

export function useListBoxLayout<T>(state: ListState<T>, itemHeight: number): ListLayout<T> {
  const layout = new ListLayout<T>({
    estimatedRowHeight: itemHeight,
    rowHeight: itemHeight,
    estimatedHeadingHeight: itemHeight,
    padding: 0,
    loaderHeight: itemHeight,
    placeholderHeight: itemHeight,
  });

  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;
  return layout;
}

/**
 * The List component.
 */
const List = <T extends object>(props: Props<T>, providedRef: RefObject<HTMLDivElement>) => {
  const { className, id, onScroll, itemHeight } = props;

  const state = useListState(props);

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const mutatedProps = {
    ...props,
  };

  const layout = useListBoxLayout(state, itemHeight);

  delete mutatedProps.id;

  const { listBoxProps } = useListBox(
    {
      autoFocus: props.autoFocus,
      shouldFocusWrap: false,
      ...mutatedProps,
      keyboardDelegate: layout,
      isVirtualized: true,
      shouldUseVirtualFocus: false,
      id,
    },
    state,
    ref
  );

  type View = ReusableView<Node<T>, unknown>;
  const renderWrapper = (
    parent: View,
    reusableView: View,
    children: View[],
    renderChildren: (views: View[]) => ReactElement[]
  ) => {
    // if (reusableView.viewType === 'section') {
    //   return (
    //     <ListBoxSection
    //       key={reusableView.key}
    //       reusableView={reusableView}
    //       header={children.find((c) => c.viewType === 'header')}
    //     >
    //       {renderChildren(children.filter((c) => c.viewType === 'item'))}
    //     </ListBoxSection>
    //   );
    // }

    return <VirtualizerItem key={reusableView.key} reusableView={reusableView} parent={parent} />;
  };

  return (
    <ListBoxContext.Provider value={state}>
      <div className={classnames(className, STYLE.wrapper)}>
        <Virtualizer
          ref={ref}
          {...listBoxProps}
          focusedKey={state.selectionManager.focusedKey}
          sizeToFit="height"
          scrollDirection="vertical"
          layout={layout}
          collection={state.collection}
          renderWrapper={renderWrapper}
          isLoading={props.isLoading}
          transitionDuration={0}
          onLoadMore={props.onLoadMore}
          shouldUseVirtualFocus={false}
          onScroll={onScroll}
        >
          {(type, item: Node<T>) => {
            if (type === 'item') {
              return <ListBoxItem wrapped={false} item={item} />;
            } else if (type === 'loader') {
              return (
                <div
                  role="listitem"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Loading />
                </div>
              );
            }
          }}
        </Virtualizer>
      </div>
    </ListBoxContext.Provider>
  );
};

const _List = React.forwardRef(List);
_List.displayName = 'List';

export default _List as <T>(props: Props<T> & { ref?: RefObject<HTMLDivElement> }) => ReactElement;
export { _List as List };
