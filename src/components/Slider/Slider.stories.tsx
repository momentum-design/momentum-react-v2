import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import React, { useState, useEffect } from 'react';
import Slider, { SliderProps } from './';
import argTypes from './Slider.stories.args';
import Documentation from './Slider.stories.docs.mdx';

export default {
  title: 'Momentum UI/Slider',
  component: Slider,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  actions: { argTypesRegex: '^on.*' },
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<SliderProps>((args: any) => {
  const [value, setValue] = useState<number>(args.value);

  const handleChange = (value: number) => {
    setValue(value);
    args.onChange(value);
  };

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return <Slider {...args} value={value} onChange={handleChange} />;
});

Example.argTypes = { ...argTypes };
Example.args = {
  step: 5,
  minValue: 0,
  maxValue: 100,
  ariaLabel: 'slider',
  value: 0,
  isDisabled: false,
};

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<SliderProps>((args: SliderProps) => {
  const [value, setValue] = useState<number>(args.value);

  const handleChange = (value: number) => {
    setValue(value);
    args.onChange(value);
  };

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return <Slider {...args} value={value} onChange={handleChange} />;
});

Common.argTypes = { ...argTypes };

Common.args = {};

Common.parameters = {
  variants: [
    {
      step: 1,
      minValue: 0,
      maxValue: 100,
      ariaLabel: 'slider',
      value: 40,
    },
    {
      step: 5,
      minValue: 0,
      maxValue: 10,
      ariaLabel: 'slider',
      value: 0,
    },
    {
      step: 5,
      minValue: 0,
      maxValue: 100,
      ariaLabel: 'slider',
      value: 100,
    },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
