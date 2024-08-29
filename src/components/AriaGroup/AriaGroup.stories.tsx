import React, { FC } from 'react';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AriaGroup from '.';
import Documentation from './AriaGroup.stories.docs.mdx';
import Checkbox from '../Checkbox';
import Text from '../Text';
import TextInput from '../TextInput';
import Toggle from '../Toggle';

export default {
  title: 'Momentum UI/AriaGroup',
  component: AriaGroup,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const AriaGroupOfTextInput: FC = () => {
  const children = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        width: 'fit-content',
        flexDirection: 'column',
      }}
    >
      <Text id="text-input-group-head">{'Please enter your information'}</Text>
      <TextInput
        aria-label={'first name'}
        label={'First Name'}
        placeholder={'First Name'}
        clearAriaLabel={'clear'}
      />
      <TextInput
        aria-label={'middle name'}
        label={'Middle Name'}
        placeholder={'Middle Name'}
        clearAriaLabel={'clear'}
      />
      <TextInput
        aria-label={'last name'}
        label={'Last Name'}
        placeholder={'Last Name'}
        clearAriaLabel={'clear'}
      />
    </div>
  );

  return <AriaGroup ariaLabelledby="text-input-group-head" children={children} />;
};

const AriaGroupOfCheckbox: FC = () => {
  const children = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        width: 'fit-content',
        flexDirection: 'column',
      }}
    >
      <Text id="checkbox-group-head">{'Counties you have visited'}</Text>
      <Checkbox label={'United States of America'} />
      <Checkbox label={'United Kingdom'} />
      <Checkbox label={'France'} />
    </div>
  );

  return <AriaGroup ariaLabelledby="checkbox-group-head" children={children} />;
};

const AriaGroupOfToggles: FC = () => {
  const children = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        width: 'fit-content',
        flexDirection: 'column',
      }}
    >
      <Text id="other-options-group-head">{'Other options'}</Text>
      <Toggle aria-label={'Option A'} />
      <Toggle aria-label={'Option B'} />
      <Toggle aria-label={'Option C'} />
    </div>
  );

  return <AriaGroup ariaLabelledby="other-options-group-head" children={children} />;
};

export { AriaGroupOfTextInput, AriaGroupOfCheckbox, AriaGroupOfToggles };
