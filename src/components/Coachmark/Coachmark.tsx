import React, { FC } from 'react';

import { Props } from './Coachmark.types';
import { Coachmark as MdcCoachmark } from '@momentum-design/components/dist/react';

/**
 * The Coachmark component.
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const Coachmark: FC<Props> = (props: Props) => {
  return <MdcCoachmark {...props} />;
};

export default Coachmark;
