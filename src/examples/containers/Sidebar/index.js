import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar, SidebarBody, SidebarNav, SidebarNavItem } from '@momentum-ui/react-collaboration';
import { snakeCase } from '../../../legacy/utils';
import * as KitchenSinkComponents from '../../data/components';
import ThemeSelect from '../../ThemeSelect';

export default class KitchenSink extends React.PureComponent {
  render() {
    return (
      <Sidebar className="docs-container__side-nav" isPageLevel withIcons={false}>
        <SidebarBody>
          <ThemeSelect />
          <SidebarNav>
            <SidebarNavItem
              customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/playground`} />}
              keyboardKey="p"
              title="Playground"
            />
            <SidebarNavItem keyboardKey="k" title="Kitchen Sink">
              {Object.keys(KitchenSinkComponents).map((ele) => (
                <SidebarNavItem
                  key={ele}
                  customAnchorNode={
                    <NavLink activeClassName="md-active-nav" to={`/${snakeCase(ele)}`} />
                  }
                  className="md-list-item--primary"
                  keyboardKey={`${snakeCase(ele)}`}
                  title={`${snakeCase(ele)}`}
                />
              ))}
            </SidebarNavItem>
          </SidebarNav>
        </SidebarBody>
      </Sidebar>
    );
  }
}
