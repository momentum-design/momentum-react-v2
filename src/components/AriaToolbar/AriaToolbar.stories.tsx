import React from 'react';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AriaToolbar from './';
import Documentation from './AriaToolbar.stories.docs.mdx';
import ButtonCircle from '../ButtonCircle';
import ButtonPill from '../ButtonPill';

export default {
  title: 'Momentum UI/AriaToolbar',
  component: AriaToolbar,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const onPressHandler = () => {
  const input: HTMLInputElement = document.getElementById('textInput') as HTMLInputElement;
  input.value = input.value + 'a';
};

const Horizontal = () => {
  return (
    <>
      <AriaToolbar ariaControls="textInput" style={{ display: 'flex', columnGap: '0.5rem' }}>
        <ButtonPill onPress={onPressHandler}>Item 1</ButtonPill>
        <ButtonCircle onPress={onPressHandler}>2</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>3</ButtonCircle>
      </AriaToolbar>
      <input type="text" id="textInput" />
    </>
  );
};

const Vertical = () => {
  return (
    <>
      <AriaToolbar
        orientation="vertical"
        ariaControls="textInput"
        style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
      >
        <ButtonCircle onPress={onPressHandler}>1</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>2</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>3</ButtonCircle>
      </AriaToolbar>
      <input type="text" id="textInput" />
    </>
  );
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Horizontal, Vertical };
