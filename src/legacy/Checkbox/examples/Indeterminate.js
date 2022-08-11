import React from 'react';
import { Checkbox } from '@momentum-ui/react-collaboration';
export default function CheckboxIndeterminate() {
  return (
    <Checkbox
      value="indeterminate"
      label="Indeterminate Checkbox"
      htmlId="indeterminateCheckbox"
      onChange={() => {}}
      indeterminate
    />
  );
}
