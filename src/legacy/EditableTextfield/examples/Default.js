import React from 'react';
import { EditableTextfield } from '@momentum-ui/react-collaboration';
export default class EditableTextFieldDefault extends React.Component {
  render() {
    return (
      <EditableTextfield handleDoneEditing={(e, data) => alert(data)} inputText="Hello World" />
    );
  }
}
