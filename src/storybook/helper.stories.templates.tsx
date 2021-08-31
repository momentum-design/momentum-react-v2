import React, { FC, ReactElement } from 'react';
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
      <Component key={index} {...args} {...variant} className={variant.pseudo} />
    ));

    return <>{items}</>;
  };

  return LocalTemplate;
}

const COMPONENT_STATES = ['', 'Hover', 'Active', 'Disable', 'Focus'];

/**
 * Component utility function that returns all component states for a variant
 * @param Component
 * @param variant
 * @returns ReactElement
 */
export const getComponentStates = (Component: FC, args, variant): ReactElement => {
  const items = COMPONENT_STATES.map((state, index) => {
    const getChildren = () => {
      if (variant.children) {
        return typeof variant.children === 'function' ? variant.children(state) : variant.children;
      } else if (args.children) {
        return typeof args.children === 'function' ? args.children(state) : args.children;
      }
    };

    return (
      <>
        <div>{state || 'Normal'}</div>
        <Component
          key={index}
          {...variant}
          {...args}
          children={getChildren()}
          className={state.toLowerCase()}
        />
      </>
    );
  });

  return (
    <div
      style={{
        minWidth: '18rem',
        padding: '1rem',
        display: 'grid',
        gridTemplateColumns: `repeat(1, auto)`,
        gap: '1.5rem',
        alignItems: 'start',
        alignContent: 'start',
      }}
    >
      {items}
    </div>
  );
};

/**
 * Generate a Story Template that consists of multiple variants with all Component states. See the [Storybook Documentation]{@link https://storybook.js.org/docs/react/writing-stories/introduction#using-args}.
 * @param Component - Functional Component to generate multiple templates from.
 * @returns - A Story Template with multiple variants of the provided Component's states.
 */
function MultiTemplateWithPseudoStates<Props>(Component: FC): Story<Props> {
  const LocalTemplate: Story<Props> = (args: Props, { parameters }) => {
    const { variants } = parameters;

    const items = variants.map((variant, index) => (
      <div key={index}>
        <div style={{ padding: '0 1rem' }}>{variant.label}</div>
        {getComponentStates(Component, args, variant)}
      </div>
    ));

    return <>{items}</>;
  };

  return LocalTemplate;
}

export { MultiTemplate, Template, MultiTemplateWithPseudoStates };
