import React, { FC } from 'react';

import { MESSAGES } from './ExampleComponent.constants';
import { Props } from './ExampleComponent.types';

const ExampleComponent: FC<Props> = ({ param }: Props) => (
  <div>{`${MESSAGES.EXAMPLE_TEXT}: ${param}`}</div>
);

export default ExampleComponent;
