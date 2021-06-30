import React, { FC } from 'react';

import { Props } from './TypeScriptExample.types';

const TypeScriptExample: FC<Props> = ({ param }: Props) => (
  <div>Hello this is a typescript component: {param}</div>
);

export default TypeScriptExample;
