/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { CheckboxNext, List, ListItem } from '@momentum-ui/react-collaboration';

export default class ListWithEventBubbling extends React.PureComponent {
  state = {
    enableBubbling: true,
  };

  onChange = (isSelected) => {
    this.setState({ enableBubbling: isSelected });
  };

  bubbledEventHandler = (e) => {
    console.log(`KeyDown Event \nKeyCode: ${e.keyCode} \nKey: ${e.key}`);
  };

  render() {
    return (
      <div>
        <div className="medium-4 columns" onKeyDown={this.bubbledEventHandler}>
          <List shouldPropagateKeyDown={this.state.enableBubbling}>
            <ListItem label="List Item 1" />
            <ListItem label="List Item 2" />
            <ListItem label="List Item 3" />
            <ListItem label="List Item 4" />
          </List>
        </div>
        <CheckboxNext
          isSelected={this.state.enableBubbling}
          onChange={this.onChange}
          label="Enable Event Bubbling (See Console)"
          id={`checkbox-for-event-bubbling`}
        />
      </div>
    );
  }
}
