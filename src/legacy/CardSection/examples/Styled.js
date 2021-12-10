import React from 'react';
import { Button, CardSection, Link } from '@momentum-ui/react-collaboration';

export default function CardSectionStyled() {
  return (
    <CardSection
      style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline' }}
    >
      <Link href="" style={{ marginRight: '16px' }}>
        {' '}
        Link Text{' '}
      </Link>
      <Button children="Button" ariaLabel="myAriaLabel" />
    </CardSection>
  );
}
