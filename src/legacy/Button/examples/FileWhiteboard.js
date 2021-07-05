import React from 'react';
import { Button, ButtonGroup } from '@momentum-ui/react';
export default function ButtonFileWhiteboard() {
  return(
    <ButtonGroup type="unstyled">
    <Button
      className='files'
      children='Files'
      onClick={() => { }}
      ariaLabel='Test'
      color='files'
    />
    <Button
      className='whiteboards'
      children='Whiteboards'
      onClick={() => { }}
      ariaLabel='Test'
      color='whiteboards'
    />
    </ButtonGroup>
  );
}