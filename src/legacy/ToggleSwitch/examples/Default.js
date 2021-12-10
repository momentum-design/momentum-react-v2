import React from 'react';
import { ToggleSwitch } from '@momentum-ui/react-collaboration';
export default class ToggleSwitchDefault extends React.PureComponent {
  render() {
    return <ToggleSwitch checked={false} label="Toggle Switch" htmlId="testToggleSwitch1" />;
  }
}
