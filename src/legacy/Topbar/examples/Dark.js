/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Button,
  Icon,
  ListItem,
  Topbar,
  TopbarMobile,
  TopbarNav,
  TopbarRight,
} from '@momentum-ui/react-collaboration';

export default class TopbarDark extends React.Component {
  render() {
    return (
      <Topbar
        color="dark"
        brandAnchorElement={
          <a href="javascript:void(0)" title="Momentum UI">
            <Icon name="cisco-logo" />
          </a>
        }
      >
        <TopbarNav>
          <ListItem>Develop</ListItem>
          <ListItem>Styles</ListItem>
          <ListItem>Layout</ListItem>
          <ListItem>Navigation</ListItem>
        </TopbarNav>
        <TopbarRight>
          <div className="md-top-bar__user" />
          <div className="md-top-bar__logged-out">
            <a href="javascript:void(0)">Log In</a>
            <Button color="blue" ariaLabel="myAriaLabel">
              Button
            </Button>
          </div>
        </TopbarRight>
        <TopbarMobile shouldCloseOnClick={false}>
          <a href="javascript:void(0)" title="Momentum UI">
            <Icon name="cisco-logo" />
          </a>
          <ListItem>Develop</ListItem>
          <ListItem>Styles</ListItem>
          <ListItem>Layout</ListItem>
          <ListItem>Navigation</ListItem>
        </TopbarMobile>
      </Topbar>
    );
  }
}
/* eslint-enable jsx-a11y/anchor-is-valid */
