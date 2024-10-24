import React, { FC, ReactElement, useLayoutEffect, useRef } from 'react';
import classnames from 'classnames';

import { PressEvent } from '@react-types/shared';
import { defaultsDeep } from 'lodash';
import useOrientationBasedKeyboardNavigation from '../../hooks/useOrientationBasedKeyboardNavigation';
import { getKeyboardFocusableElements } from '../../utils/navigation';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup';
import { TabProps } from '../Tab';
import { useTabsContext } from '../TabsProvider/TabsProvider.utils';
import { DEFAULTS, STYLE } from './TabList.constants';
import './TabList.style.scss';
import { Props } from './TabList.types';

/**
 * The TabList component.
 */
const TabList: FC<Props> = (props: Props) => {
  const {
    children: _children,
    orientation = DEFAULTS.ORIENTATION,
    onTabSelection,
    hasBackground = DEFAULTS.HAS_BACKGROUND,
    ...otherProps
  } = props;
  const children: ReactElement<TabProps>[] = Array.isArray(_children)
    ? (_children as ReactElement<TabProps>[])
    : [_children];

  const buttonGroupProps = defaultsDeep({}, otherProps, {
    round: true,
    spaced: true,
  } as ButtonGroupProps);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabsContext = useTabsContext();

  const {
    keyboardProps,
    focusWithinProps,
    getContext: getFocusContext,
  } = useOrientationBasedKeyboardNavigation({
    listSize: children.filter((element) => !element.props.disabled).length,
    orientation,
    noLoop: false,
  });

  const { currentFocus, isFocusedWithin, setCurrentFocus } = getFocusContext();

  // Reset the tabIndex when focusing out
  useLayoutEffect(() => {
    if (!isFocusedWithin) {
      const activeIndex = getKeyboardFocusableElements(containerRef.current, false).findIndex(
        (el) => el.dataset.active === 'true'
      );
      setCurrentFocus(Math.max(activeIndex, 0));
    }
  }, [isFocusedWithin, setCurrentFocus]);

  // Get the DOM to focus on the current focused element stored in state
  useLayoutEffect(() => {
    if (isFocusedWithin) {
      getKeyboardFocusableElements(containerRef.current, false)[currentFocus]?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFocus]);

  let seenDisabledTabs = 0;
  const cloneWithCommonProps = (element: ReactElement<TabProps>, index: number) => {
    const elementKey = element.key;
    const isFocused = !element.props.disabled && currentFocus === index - seenDisabledTabs;
    if (element.props.disabled) {
      seenDisabledTabs++;
    }

    const handleOnPress = (e: PressEvent) => {
      setCurrentFocus(index);

      if (element.props.onPress) {
        element.props.onPress?.(e);
      } else if (elementKey) {
        onTabSelection?.(elementKey);
      }
    };

    const commonProps = {
      role: 'tab',
      tabIndex: isFocused ? 0 : -1,
      onPress: handleOnPress,
    };

    // If <TabList /> is used outside of a <TabsProvider />, just include keyboard navigation stuff
    if (tabsContext === null) {
      return React.cloneElement(element, { ...commonProps });
    }

    if (elementKey === null) {
      console.warn('MRV2: Tabs in TabList must have a key', element);

      return element;
    }

    const isActiveTab = tabsContext.selectedTab === elementKey;

    return React.cloneElement(element, {
      ...commonProps,
      active: isActiveTab,
      'aria-selected': isActiveTab,
      'aria-controls': isActiveTab ? tabsContext.activePanelId : undefined,
      id: tabsContext.getTabId(elementKey),
    } as TabProps);
  };

  return (
    <ButtonGroup
      ref={containerRef}
      {...buttonGroupProps}
      {...keyboardProps}
      {...focusWithinProps}
      data-has-background={hasBackground}
      role="tablist"
      className={classnames(STYLE.wrapper, props.className)}
    >
      {children.map(cloneWithCommonProps)}
    </ButtonGroup>
  );
};

export default TabList;
