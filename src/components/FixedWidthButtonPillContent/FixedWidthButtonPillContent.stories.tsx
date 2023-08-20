/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from 'react';
import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import FixedWidthButtonPillContent, { FixedWidthButtonPillContentProps } from './';
import argTypes from './FixedWidthButtonPillContent.stories.args';
import Documentation from './FixedWidthButtonPillContent.stories.docs.mdx';
import Icon from '../Icon';
import Text from '../Text';
import ButtonPill from '../ButtonPill';
import ButtonGroup from '../ButtonGroup';
import ButtonCircle from '../ButtonCircle';
import { getTextTypeFromButtonPillSize } from './FixedWidthButtonPillContent.utils';

export default {
  title: 'Momentum UI/FixedWidthButtonPillContent',
  component: FixedWidthButtonPillContent,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Common = Template<FixedWidthButtonPillContentProps>(() => {
  const englishStringContentVariations = ['Stop video', 'Start video'];
  const germanStringContentVariations = ['Stummschalten', 'Stummschaltung aufheben'];
  const englishChildren = [
    <>
      <Icon name="camera-on-colored" scale={20} />
      <Text>{englishStringContentVariations[0]}</Text>
    </>,
    <>
      <Icon
        name="camera-muted"
        scale={20}
        style={{ color: 'var(--mds-color-theme-text-error-normal)' }}
      />
      <Text>{englishStringContentVariations[1]}</Text>
    </>,
  ];
  const germanChildren = [
    <>
      <Icon name="audio-microphone-on-colored" scale={20} />
      <Text>{germanStringContentVariations[0]}</Text>
    </>,
    <>
      <Icon
        name="microphone-muted"
        scale={20}
        style={{ color: 'var(--mds-color-theme-text-error-normal)' }}
      />
      <Text>{germanStringContentVariations[1]}</Text>
    </>,
  ];
  const buttonPillStyle = { overflow: 'hidden', maxWidth: '12.375rem' };
  const [child, setChild] = useState(0);
  const handlePress = useCallback(() => {
    setChild((prev) => (prev + 1) % englishChildren.length);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 15rem)',
        gridTemplateRows: 'repeat(3, auto)',
        gap: '0.5rem',
      }}
    >
      <ButtonPill
        style={{ width: '6rem', justifyContent: 'center' }}
        size={30}
        onPress={handlePress}
      >
        Press me
      </ButtonPill>
      <Text>English</Text>
      <Text>German</Text>
      <Text>With</Text>
      <ButtonGroup round compressed>
        <ButtonPill onPress={() => {}} ghost outline style={buttonPillStyle}>
          <FixedWidthButtonPillContent
            stringContentVariations={englishStringContentVariations}
            icon
            iconScale={20}
          >
            {englishChildren[child]}
          </FixedWidthButtonPillContent>
        </ButtonPill>
        <ButtonCircle outline ghost size={40}>
          <Icon data-test="arrow-icon" name="arrow-down" scale={12} weight="filled" />
        </ButtonCircle>
      </ButtonGroup>
      <ButtonGroup round compressed>
        <ButtonPill onPress={() => {}} ghost outline style={buttonPillStyle}>
          <FixedWidthButtonPillContent
            stringContentVariations={germanStringContentVariations}
            icon
            iconScale={12}
          >
            {germanChildren[child]}
          </FixedWidthButtonPillContent>
        </ButtonPill>
        <ButtonCircle outline ghost size={40}>
          <Icon data-test="arrow-icon" name="arrow-down" scale={12} weight="filled" />
        </ButtonCircle>
      </ButtonGroup>
      <Text>Without</Text>
      <ButtonGroup round compressed>
        <ButtonPill onPress={() => {}} ghost outline style={buttonPillStyle}>
          {englishChildren[child]}
        </ButtonPill>
        <ButtonCircle outline ghost size={40}>
          <Icon data-test="arrow-icon" name="arrow-down" scale={12} weight="filled" />
        </ButtonCircle>
      </ButtonGroup>
      <ButtonGroup round compressed>
        <ButtonPill onPress={() => {}} ghost outline style={buttonPillStyle}>
          {germanChildren[child]}
        </ButtonPill>
        <ButtonCircle outline ghost size={40}>
          <Icon data-test="arrow-icon" name="arrow-down" scale={12} weight="filled" />
        </ButtonCircle>
      </ButtonGroup>
    </div>
  );
}).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.stringContentVariations;
delete Common.argTypes.icon;
delete Common.argTypes.iconScale;
delete Common.argTypes.buttonPillSize;

const Example = Template<FixedWidthButtonPillContentProps>((args) => {
  const { icon, iconScale, buttonPillSize } = args as FixedWidthButtonPillContentProps;
  const stringContentVariations = ['Long', 'Longer', 'Longest'];
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const handlePress = useCallback(() => {
    setCurrentChildIndex((prev) => (prev + 1) % stringContentVariations.length);
  }, []);
  const buttonPillStyle = { overflow: 'hidden', maxWidth: '12.375rem' };
  const textType = getTextTypeFromButtonPillSize(buttonPillSize);

  return (
    <>
      <ButtonPill
        style={{ width: '6rem', justifyContent: 'center' }}
        size={30}
        onPress={handlePress}
      >
        Press me
      </ButtonPill>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 15rem)',
          gridTemplateRows: 'repeat(2, auto)',
          gap: '0.5rem',
          marginTop: '0.5rem',
        }}
      >
        <Text>With</Text>
        <div>
          <ButtonPill
            onPress={handlePress}
            ghost
            outline
            size={buttonPillSize}
            style={buttonPillStyle}
          >
            <FixedWidthButtonPillContent
              stringContentVariations={stringContentVariations}
              icon={icon}
              iconScale={iconScale}
              buttonPillSize={buttonPillSize}
            >
              {icon && <Icon name="placeholder" scale={iconScale} />}
              <Text type={textType}>{stringContentVariations[currentChildIndex]}</Text>
            </FixedWidthButtonPillContent>
          </ButtonPill>
        </div>
        <Text>Without</Text>
        <div>
          <ButtonPill
            onPress={handlePress}
            ghost
            outline
            size={buttonPillSize}
            style={buttonPillStyle}
          >
            {icon && <Icon name="placeholder" scale={iconScale} />}
            <Text type={textType}>{stringContentVariations[currentChildIndex]}</Text>
          </ButtonPill>
        </div>
      </div>
    </>
  );
}).bind({});

Example.argTypes = { ...argTypes };
delete Example.argTypes.children;
delete Example.argTypes.stringContentVariations;

Example.args = {
  icon: false,
  iconScale: 20,
  buttonPillSize: 40,
};

export { Example, Common };
