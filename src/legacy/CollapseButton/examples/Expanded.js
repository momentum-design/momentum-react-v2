import React from 'react';
import { CollapseButton } from '@momentum-ui/react-collaboration';
export default class CollapseButtonExpanded extends React.PureComponent {
  render() {
    return <CollapseButton collapse={false} />;
  }
}
