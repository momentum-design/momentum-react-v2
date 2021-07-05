import React, { FC } from 'react';

import { Props } from './ExampleComponent.types';

const ExampleComponent: FC<Props> = ({ param }: Props) => (
  <div>Hello this is a typescript component: {param}</div>
);

export default ExampleComponent;
