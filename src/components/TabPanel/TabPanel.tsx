import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './TabPanel.constants';
import { AllowedTagNames, Props } from './TabPanel.types';
import './TabPanel.style.scss';
import { useTabsContext } from '../TabsProvider/TabsProvider.utils';

/**
 * The TabPanel Component
 */
export const TabPanel: FC<Props> = <T extends AllowedTagNames>(props: Props<T>) => {
  const { tagName: Tag = DEFAULTS.tagName, ...componentProps } = props;

  const tabsContext = useTabsContext();

  if (tabsContext === null) {
    // eslint-disable-next-line no-console
    console.warn(
      'MRV2 (TabPanel): Not recommended to use this component outside of a TabsProvider'
    );
  }

  const ariaProps = {
    'aria-labelledby': tabsContext?.activeTabId || props['aria-labelledby'],
    id: tabsContext?.activePanelId,
  } as HTMLAttributes<HTMLElement>;

  return (
    <Tag
      {...(componentProps as HTMLAttributes<HTMLElement>)}
      role="tabpanel"
      className={classnames(STYLE.wrapper, componentProps.className)}
      {...ariaProps}
    />
  );
};

export default TabPanel;
