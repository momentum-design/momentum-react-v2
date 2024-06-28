import React from 'react';
import { Button, Menu, MenuItem, MenuOverlay, SubMenu} from '@momentum-ui/react-collaboration';
import Icon from '../../../components/Icon';
import ListItemBaseSection from '../../../components/ListItemBaseSection';
export default class MenuOverlaySubMenu extends React.PureComponent {
  onClick(event, clickItem) {
    if(event.type === 'keydown') {
      alert(`${event.target?.textContent} ${event.key} press `);
    } else {
      alert(`${clickItem.value} clicked`);
    }
  }

  render() {
    return (
      <MenuOverlay
        menuTrigger={
          <Button id="submenu" ariaLabel="Show Menu">
            Show SubMenu with Customized MenuItems
          </Button>
        }
      >
        <Menu>
          <SubMenu selectedValue="English" label="Language">
            <MenuItem label="English" />
            <MenuItem label="Spanish" />
          </SubMenu>
          <SubMenu
            label='help'
            title='help'
          >
            <MenuItem
              value='healthChecker'
              label='healthChecker'
              onClick={this.onClick}
            />
            <MenuItem
              value='download'
              onClick={this.onClick}
            >
              <ListItemBaseSection position="left">
                download
              </ListItemBaseSection> 
              <ListItemBaseSection position="middle">
                <Icon name="pop-out" scale={16} />
              </ListItemBaseSection>
            </MenuItem>
          </SubMenu>
        </Menu>
      </MenuOverlay>
    );
  }
}
