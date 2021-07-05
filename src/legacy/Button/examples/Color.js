import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonColor() {
  return(
    <>
      <Button
        children='Test Me'
        onClick={() => { }}
        ariaLabel='Test'
        color='blue'
      />
      <Button
        children='Ghost button'
        onClick={() => { }}
        ariaLabel='Ghost button'
        color='ghost'
      />
    </>
  );
}
