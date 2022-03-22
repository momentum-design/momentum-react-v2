import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import React, { FC } from 'react';

/**
 * Generate the documentation page within a story.
 * @param documentation - Array of documentation components provided as `.mdx` files.
 * @returns - Markdown documentation page.
 */
function DocumentationPage(...documentation: Array<FC>): FC {
  const docs = documentation.map((Markdown: FC, index) => <Markdown key={index} />);

  const DocsPage: FC = () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      {docs}
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
    </>
  );

  return DocsPage;
}

export { DocumentationPage };
