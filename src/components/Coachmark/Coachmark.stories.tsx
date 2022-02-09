import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Coachmark, { CoachmarkProps } from './';
import ButtonSimple from '../ButtonSimple';
import ButtonHyperlink from '../ButtonHyperlink';
import ButtonPill from '../ButtonPill';
import argTypes from './Coachmark.stories.args';
import Documentation from './Coachmark.stories.docs.mdx';

export default {
  title: 'Momentum UI/Coachmark',
  component: Coachmark,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Template: Story<CoachmarkProps> = (args: CoachmarkProps) => {
  return (
    <>
      <Coachmark
        triggerComponent={<div style={{ width: 'fit-content' }}>Target Element</div>}
        {...args}
      />
    </>
  );
};

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
};

const TemplateCommon: Story = () => {
  const [index, setIndex] = useState<number>();

  const next = () => {
    setIndex(index + 1);
  };

  const start = () => {
    setIndex(1);
  };

  const reset = () => {
    setIndex(0);
  };

  interface LocalProps {
    targetIndex: number;
    content?: boolean;
    icon?: boolean;
    image?: boolean;
    title?: boolean;
    trigger: string;
  }

  const CommonCoachmark = ({ content, icon, image, targetIndex, title, trigger }: LocalProps) => (
    <Coachmark
      actions={[
        <ButtonPill key={0} size={28}>
          Button
        </ButtonPill>,
        <ButtonPill key={1} outline size={28}>
          Button
        </ButtonPill>,
        <ButtonHyperlink key={2}>Hyperlink</ButtonHyperlink>,
      ]}
      icon={icon && 'placeholder'}
      image={
        image && (
          <img
            alt="example"
            src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
          />
        )
      }
      isVisible={index === targetIndex}
      title={title && 'Example Title'}
      triggerComponent={<div style={{ width: 'fit-content' }}>{trigger}</div>}
      onDismiss={next}
    >
      {content && (
        <div>Example Coachmark {targetIndex}. Close this Coachmark to continue the experience.</div>
      )}
    </Coachmark>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <CommonCoachmark
        content
        icon
        image
        targetIndex={1}
        title
        trigger="[ Content / Icon / Image / Title ]"
      />
      <CommonCoachmark content image targetIndex={2} title trigger="[ Content / Image / Title ]" />
      <CommonCoachmark content icon targetIndex={3} title trigger="[ Content / Icon / Title ]" />
      <CommonCoachmark content targetIndex={4} title trigger="[ Content / Title ]" />
      <CommonCoachmark content image targetIndex={5} trigger="[ Content / Image ]" />
      <CommonCoachmark content targetIndex={6} trigger="[ Content ]" />
      <CommonCoachmark image targetIndex={7} trigger="[ Image ]" />
      <CommonCoachmark title targetIndex={8} trigger="[ Title ]" />
      <CommonCoachmark icon targetIndex={9} title trigger="[ Icon Title ]" />
      <ButtonSimple onPress={start}>Start Experience</ButtonSimple>
      <ButtonSimple onPress={reset}>Reset Experience</ButtonSimple>
    </div>
  );
};

const Common = TemplateCommon.bind({});

Common.argTypes = Object.entries({ ...argTypes }).reduce((types, entry) => {
  const [key, value] = entry;
  const mutable = { ...types };

  mutable[key] = { ...value };

  mutable[key].control = { type: 'none' };

  return mutable;
}, {});

Common.args = {};

export { Example, Common };
