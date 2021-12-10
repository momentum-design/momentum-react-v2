import React from 'react';
import { ToggleSwitch } from '@momentum-ui/react-collaboration';
export default class ToggleSwitchFilled extends React.PureComponent {
  render() {
    return <ToggleSwitch checked={true} label="Toggle Switch" htmlId="testToggleSwitch1" />;
  }
}
