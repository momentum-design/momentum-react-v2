import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import React from 'react';

import ListHeader, { ListHeaderProps } from './';
import argTypes from './ListHeader.stories.args';
import Documentation from './ListHeader.stories.docs.mdx';
import { Icon, ListItemBaseSection, Text } from '..';
import { OUTLINE_COLOR, OUTLINE_POSITION } from './ListHeader.constants';

export default {
  title: 'Momentum UI/ListHeader',
  component: ListHeader,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ListHeaderProps>(ListHeader);

Example.argTypes = { ...argTypes };
delete Example.argTypes.children;

Example.args = {
  children: (
    <>
      <ListItemBaseSection position="start">
        <Icon name="speaker" scale={16} weight="bold" strokeColor="none" />
      </ListItemBaseSection>
      <ListItemBaseSection position="fill">
        <Text type="body-secondary">Label</Text>
      </ListItemBaseSection>
    </>
  ),
};

const Common = MultiTemplate<ListHeaderProps>(ListHeader);

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.outline;
delete Common.argTypes.outlinePosition;
delete Common.argTypes.bold;

Common.args = {};

Common.parameters = {
  variants: [
    {
      style: { marginBottom: '1rem' },
      outline: true,
      outlinePosition: OUTLINE_POSITION.BOTTOM,
      children: (
        <>
          <Text type="body-secondary">Label and bottom outline</Text>
        </>
      ),
    },
    {
      outline: true,
      outlinePosition: OUTLINE_POSITION.TOP,
      children: (
        <>
          <Text type="body-secondary">Label and top outline</Text>
        </>
      ),
    },
    {
      children: (
        <>
          <ListItemBaseSection position="start">
            <Icon name="speaker" scale={16} weight="bold" strokeColor="none" />
          </ListItemBaseSection>
          <ListItemBaseSection position="fill">
            <Text type="body-secondary">Label and icon</Text>
          </ListItemBaseSection>
        </>
      ),
    },
    {
      bold: true,
      children: (
        <>
          <Text type="header-secondary">Label and bold</Text>
        </>
      ),
    },
    {
      children: (
        <>
          <ListItemBaseSection position="start">
            <Text type="body-secondary">Label and right ('end') icon (icon is changeable)</Text>
          </ListItemBaseSection>
          <ListItemBaseSection position="end">
            <Icon
              name="external-user"
              scale={16}
              weight="bold"
              fillColor="var(--mds-color-theme-text-warning-normal)"
              strokeColor="none"
            />
          </ListItemBaseSection>
        </>
      ),
    },
    {
      outline: true,
      outlineColor: OUTLINE_COLOR.PRIMARY,
      children: (
        <>
          <Text type="body-secondary">Label and primary color outline</Text>
        </>
      ),
    },
    {
      outline: true,
      outlineColor: OUTLINE_COLOR.SECONDARY,
      children: (
        <>
          <Text type="body-secondary">Label and secondary color outline</Text>
        </>
      ),
    },
    {
      outline: true,
      style: { marginTop: '1rem' },
    },
  ],
};

export { Example, Common };
