import React from 'react';
import { Checkbox } from '@momentum-ui/react-collaboration';
export default function CheckboxDisabled() {
  return (
    <Checkbox
      value="disabledChecked"
      label="Disabled Checkbox"
      htmlId="disabledCheckbox"
      disabled
      onChange={() => {}}
    />
  );
}
