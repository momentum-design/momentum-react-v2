import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonFileWhiteboard() {
  return(
    <React.Fragment>
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
    </React.Fragment>
  );
}