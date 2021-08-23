import React, { FC } from 'react';
import { Story } from '@storybook/react';

import ListItem, { ListItemProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './ListItem.documentation.mdx';
import ListItemSection from '../ListItemSection';
import { SHAPES, SIZES } from './ListItem.constants';

import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import Avatar from '../Avatar';
import { PresenceType } from '../Avatar/Avatar.types';
import argTypes from './ListItem.stories.args';

const COMPONENT_STATES = ['', 'Hover', 'Active', 'Disable', 'Focus'];

const DocsPage: FC = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Documentation />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
  </>
);

export default {
  title: 'Momentum UI/ListItem',
  component: ListItem,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    ...argTypes,
  },
};

/**
 * Component utility function that returns multiple which variants
 * @param variants
 * @returns ReactElement
 */
const getVariants = (variants) => {
  const items = variants.map((variant, index: number) => (
    <div key={index} style={{ minWidth: '16rem' }}>
      <ListItem {...variant} className={variant.pseudo} />
      <p>{variant.label}</p>
    </div>
  ));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(1, auto)`,
        gap: '1.5rem',
        alignItems: 'start',
      }}
    >
      {items}
    </div>
  );
};

const MultiTemplate: Story<ListItemProps> = (args: ListItemProps, { parameters }) => {
  const { variants, columns } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <p>{variant.label}</p>
      {variant.components}
    </div>
  ));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns || 2}, auto)`,
        gap: '3em',
        alignItems: 'start',
      }}
    >
      {items}
    </div>
  );
};

const Template: Story<ListItemProps> = (args) => (
  <div style={{ display: 'grid', gap: '1rem', minWidth: '16rem' }}>
    Simple
    {COMPONENT_STATES.map((state, index) => {
      return (
        <ListItem {...args} className={state.toLowerCase()} key={index}>
          <ListItemSection position="start">Start</ListItemSection>
          <ListItemSection position="middle">{state}</ListItemSection>
          <ListItemSection position="end">end</ListItemSection>
        </ListItem>
      );
    })}
  </div>
);

const Example = Template.bind({});

Example.args = {};

const Common = MultiTemplate.bind({});

Common.parameters = {
  variants: [
    {
      label: 'Simple',
      components: getVariants(
        COMPONENT_STATES.map((state) => {
          return {
            pseudo: state.toLowerCase(),
            children: (
              <>
                <ListItemSection position="fill">{state || 'Normal'}</ListItemSection>
              </>
            ),
          };
        })
      ),
    },
    {
      label: 'With Icon',
      components: getVariants(
        COMPONENT_STATES.map((state) => {
          return {
            pseudo: state.toLowerCase(),
            children: (
              <>
                <ListItemSection position="fill">{state || 'Normal'}</ListItemSection>
                <ListItemSection position="end">
                  <Icon name="placeholder" scale={16} />
                </ListItemSection>
              </>
            ),
          };
        })
      ),
    },
    {
      label: 'With Button',
      components: getVariants(
        COMPONENT_STATES.map((state) => {
          return {
            pseudo: state.toLowerCase(),
            children: (
              <>
                <ListItemSection position="fill">{state || 'Normal'}</ListItemSection>
                <ListItemSection position="end">
                  <ButtonPill disabled={state === 'Disable'} color="join" size={24}>
                    Join
                  </ButtonPill>
                </ListItemSection>
              </>
            ),
          };
        })
      ),
    },
    {
      label: 'With 2 Icons',
      components: getVariants(
        COMPONENT_STATES.map((state) => {
          return {
            pseudo: state.toLowerCase(),
            children: (
              <>
                <ListItemSection position="start">
                  <Icon name="placeholder" scale={16} />
                </ListItemSection>
                <ListItemSection position="fill">{state || 'Normal'}</ListItemSection>
                <ListItemSection position="end">
                  <Icon name="placeholder" scale={16} />
                </ListItemSection>
              </>
            ),
          };
        })
      ),
    },
  ],
};

const Sizes = MultiTemplate.bind({});

Sizes.parameters = {
  columns: 3,
  variants: [
    ...Object.values(SIZES).map((size) => {
      return {
        label: `Size ${size}`,
        columns: 3,
        components: getVariants(
          COMPONENT_STATES.map((state) => {
            return {
              size: size,
              pseudo: state.toLowerCase(),
              children: (
                <>
                  <ListItemSection position="start">
                    <Icon name="placeholder" scale={16} />
                  </ListItemSection>
                  <ListItemSection position="fill">{state || 'Normal'}</ListItemSection>
                  <ListItemSection position="end">
                    <Icon name="placeholder" scale={16} />
                  </ListItemSection>
                </>
              ),
            };
          })
        ),
      };
    }),
  ],
};

const Shapes = MultiTemplate.bind({});

Shapes.parameters = {
  variants: [
    ...Object.values(SHAPES).map((shape) => {
      return {
        label: `Default Size List Item + Shape ${shape}`,
        columns: 3,
        components: getVariants(
          COMPONENT_STATES.map((state) => {
            return {
              shape,
              pseudo: state.toLowerCase(),
              size: SIZES[50],
              children: (
                <>
                  <ListItemSection position="start">
                    {shape === SHAPES.rounded ? (
                      <Avatar title="John Adams" size={32} presence={PresenceType.Active} />
                    ) : (
                      <Icon name="placeholder" scale={16} />
                    )}
                  </ListItemSection>
                  <ListItemSection position="fill">{state || 'Normal'}</ListItemSection>
                  <ListItemSection position="end">
                    <Icon name="placeholder" scale={16} />
                  </ListItemSection>
                </>
              ),
            };
          })
        ),
      };
    }),
    ...Object.values(SHAPES).map((shape) => {
      return {
        label: `Compact List Item + Shape ${shape}`,
        columns: 3,
        components: getVariants(
          COMPONENT_STATES.map((state) => {
            return {
              shape,
              pseudo: state.toLowerCase(),
              size: SIZES[32],
              children: (
                <>
                  <ListItemSection position="start">
                    {shape === SHAPES.rounded ? (
                      <Avatar title="John Adams" size={24} presence={PresenceType.Active} />
                    ) : (
                      <Icon name="placeholder" scale={16} />
                    )}
                  </ListItemSection>
                  <ListItemSection position="fill">{state || 'Normal'}</ListItemSection>
                  <ListItemSection position="end">
                    <Icon name="placeholder" scale={16} />
                  </ListItemSection>
                </>
              ),
            };
          })
        ),
      };
    }),
  ],
};

export { Example, Sizes, Shapes, Common };
