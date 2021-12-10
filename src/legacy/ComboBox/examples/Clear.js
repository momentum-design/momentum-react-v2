import React from 'react';
import { ComboBox } from '@momentum-ui/react-collaboration';
export default class ComboBoxClear extends React.PureComponent {
  render() {
    return <ComboBox options={['a', 'ab', 'abc']} clear />;
  }
}
