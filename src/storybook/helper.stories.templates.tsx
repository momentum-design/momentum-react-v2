import React, { FC } from 'react';
import { Story } from '@storybook/react';

/**
 * Generate a Story Template with the provided component. See the [Storybook Documentation]{@link https://storybook.js.org/docs/react/writing-stories/introduction#using-args}.
 * @param Component - Functional Component to generate a template from.
 * @returns - A Story Template from the provided Component.
 */
function Template<Props>(Component: FC): Story<Props> {
  const LocalTemplate: Story<Props> = (args: Props) => <Component {...args} />;

  return LocalTemplate;
}

/**
 * Generate a Story Template that consists of multiple variants of a single Component. See the [Storybook Documentation]{@link https://storybook.js.org/docs/react/writing-stories/introduction#using-args}.
 * @param Component - Functional Component to generate multiple templates from.
 * @returns - A Story Template with multiple variants of the provided Component.
 */
function MultiTemplate<Props>(Component: FC): Story<Props> {
  const LocalTemplate: Story<Props> = (args: Props, { parameters }) => {
    const { variants } = parameters;

    const items = variants.map((variant, index: number) => (
      <Component key={index} {...args} {...variant} />
    ));

    return <>{items}</>;
  };

  return LocalTemplate;
}

export { MultiTemplate, Template };
