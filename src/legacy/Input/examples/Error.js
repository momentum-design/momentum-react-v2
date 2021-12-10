import React from 'react';
import { Input } from '@momentum-ui/react-collaboration';

export default function InputError() {
  return (
    <Input
      name="inputError"
      label="Error Input"
      htmlId="inputError"
      containerSize="medium-6"
      messageArr={[{ message: 'This is where the error message would be.', type: 'error' }]}
      value="Error Text"
    />
  );
}
