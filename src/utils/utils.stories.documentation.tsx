import React, { FC } from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

function DocumentationPage(Documentation: FC): FC {
  const DocsPage: FC = () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Documentation />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
    </>
  );

  return DocsPage;
}

export { DocumentationPage };
