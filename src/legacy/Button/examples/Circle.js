import React from 'react';
import { Button, Icon } from '@momentum-ui/react-collaboration';

export default function ButtonCircle() {
  return (
    <Button
      children={<Icon name="icon-search_12" />}
      onClick={() => {}}
      ariaLabel="Search"
      circle
    />
  );
}
