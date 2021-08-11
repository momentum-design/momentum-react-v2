import React, { FC } from 'react';
import { Story } from '@storybook/react';

function Template<Props>(Component: FC): Story<Props> {
  const LocalTemplate: Story<Props> = (args: Props) => <Component {...args} />;

  return LocalTemplate;
}

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
