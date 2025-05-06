import React from 'react';
import { MenuCustomMenuItems, MenuDefault, MenuSubMenu, MenuWithButtonCircle } from './index';

export default class MenuKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MenuCustomMenuItems />
        <MenuDefault />
        <MenuWithButtonCircle />
        <MenuSubMenu />
      </React.Fragment>
    );
  }
}
