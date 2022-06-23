/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

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
      <Component key={index} {...args} {...variant} />
    ));

    return <>{items}</>;
  };

  return LocalTemplate;
}

const COMPONENT_STATES = ['', 'Hover', 'Active', 'Disable', 'Focus'];
type ComponentStates = `${Lowercase<typeof COMPONENT_STATES[number]>}`;
export type ComponentStateToPropsFn = (state: ComponentStates) => any;

/**
 * Component utility function that returns all component states for a variant
 * @param Component
 * @param args
 * @param variant
 * @param componentStateToProps
 * @returns ReactElement
 */

export const getComponentStates = (
  Component: FC,
  args: any,
  variant: any,
  componentStateToProps?: ComponentStateToPropsFn
): ReactElement => {
  const items = COMPONENT_STATES.map((state, index) => {
    const getChildren = () => {
      if (variant.children) {
        return typeof variant.children === 'function' ? variant.children(state) : variant.children;
      } else if (args.children) {
        return typeof args.children === 'function' ? args.children(state) : args.children;
      }
    };

    const stateProps = componentStateToProps?.(state.toLowerCase()) ?? {
      className: state.toLowerCase(),
    };

    return (
      <div key={index}>
        <p>{state || 'Normal'}</p>
        <Component {...variant} {...args} {...stateProps} children={getChildren()} />
      </div>
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
 * @param componentStateToProps
 * @returns - A Story Template with multiple variants of the provided Component's states.
 */
function MultiTemplateWithPseudoStates<Props>(
  Component: FC,
  componentStateToProps?: ComponentStateToPropsFn
): Story<Props> {
  const LocalTemplate: Story<Props> = (args: Props, { parameters }) => {
    const { variants } = parameters;

    const items = variants.map((variant, index) => (
      <div key={index}>
        <div style={{ padding: '0 1rem' }}>{variant.label}</div>
        {getComponentStates(Component, args, variant, componentStateToProps)}
      </div>
    ));

    return <>{items}</>;
  };

  return LocalTemplate;
}

export { MultiTemplate, Template, MultiTemplateWithPseudoStates };
