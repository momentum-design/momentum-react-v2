import React from 'react';
import { Menu, MenuItem, MenuOverlay, Tooltip } from '@momentum-ui/react-collaboration';
import ButtonCircle from '../../../components/ButtonCircle';
export default class MenuOverlayDefault extends React.PureComponent {
  onClick(event, value) {
    alert(`${value} clicked`);
  }
  render() {
    return (
      <MenuOverlay
        menuTrigger={
          <div>
            <Tooltip tooltip="Text">
              <ButtonCircle id="default" ariaLabel="Show Menu" stopPropagation={false}>
                A
              </ButtonCircle>
            </Tooltip>
          </div>
        }
      >
        <Menu>
          <MenuItem onClick={this.onClick} label="Language" />
          <MenuItem onClick={this.onClick} label="Profile" />
          <MenuItem onClick={this.onClick} label="Settings" />
        </Menu>
      </MenuOverlay>
    );
  }
}
