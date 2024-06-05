import React from 'react';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AriaToolbar from './';
import Documentation from './AriaToolbar.stories.docs.mdx';
import ButtonCircle from '../ButtonCircle';
import ButtonPill from '../ButtonPill';
import ButtonSimple from '../ButtonSimple';
import Popover from '../Popover';

import argTypes from './AriaToolbar.stories.args';

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

const Horizontal = (props) => {
  return (
    <>
      <AriaToolbar
        ariaLabel="toolbar 1"
        ariaControls="textInput"
        style={{ display: 'flex', columnGap: '0.5rem', marginBottom: '1rem' }}
        {...props}
      >
        <ButtonPill onPress={onPressHandler}>Item 1</ButtonPill>
        <ButtonCircle onPress={onPressHandler}>2</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>3</ButtonCircle>
      </AriaToolbar>
      <input type="text" id="textInput" aria-label="A text input" />
    </>
  );
};

Horizontal.argTypes = argTypes;

const Vertical = () => {
  return (
    <>
      <AriaToolbar
        orientation="vertical"
        ariaControls="textInput"
        ariaLabel="toolbar 1"
        style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
      >
        <ButtonCircle onPress={onPressHandler}>1</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>2</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>3</ButtonCircle>
      </AriaToolbar>
      <AriaToolbar
        orientation="vertical"
        ariaControls="textInput"
        ariaLabel="toolbar 2"
        style={{
          display: 'flex',
          rowGap: '0.5rem',
          flexDirection: 'column',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <ButtonCircle onPress={onPressHandler}>1</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>2</ButtonCircle>
        <ButtonCircle onPress={onPressHandler}>3</ButtonCircle>
      </AriaToolbar>
      <input type="text" id="textInput" aria-label="A text input" />
    </>
  );
};

const WithinPopover = () => {
  return (
    <Popover trigger="click" interactive triggerComponent={<ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonSimple>}>
        <AriaToolbar
          orientation="vertical"
          ariaControls="textInput"
          ariaLabel="toolbar 1"
          style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
        >
          <ButtonCircle onPress={onPressHandler}>1</ButtonCircle>
          <ButtonCircle onPress={onPressHandler}>2</ButtonCircle>
          <ButtonCircle onPress={onPressHandler}>3</ButtonCircle>
        </AriaToolbar>
        <AriaToolbar
          orientation="vertical"
          ariaControls="textInput"
          ariaLabel="toolbar 2"
          style={{
            display: 'flex',
            rowGap: '0.5rem',
            flexDirection: 'column',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <ButtonCircle onPress={onPressHandler}>1</ButtonCircle>
          <ButtonCircle onPress={onPressHandler}>2</ButtonCircle>
          <ButtonCircle onPress={onPressHandler}>3</ButtonCircle>
        </AriaToolbar>
    </Popover>

  );
};

export { Horizontal, Vertical, WithinPopover };
