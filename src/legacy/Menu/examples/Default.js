import React from 'react';
import { Button, Menu, MenuItem, MenuOverlay } from '@momentum-ui/react-collaboration';
export default class MenuOverlayDefault extends React.PureComponent {
  onClick(event, value) {
    alert(`${value} clicked`);
  }
  render() {
    return (
      <MenuOverlay
        menuTrigger={
          <Button id="default" ariaLabel="Show Menu">
            Show Menu
          </Button>
        }
      >
        <Menu>
          <MenuItem onClick={this.onClick} label="Language" fireClickOnSpaceKeydown={false} />
          <MenuItem onClick={this.onClick} label="Profile" />
          <MenuItem onClick={this.onClick} label="Settings" />
        </Menu>
      </MenuOverlay>
    );
  }
}
