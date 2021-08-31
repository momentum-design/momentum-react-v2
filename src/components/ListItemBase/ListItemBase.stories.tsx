import React from 'react';
import { Story } from '@storybook/react';

import ListItemBase, { ListItemBaseProps } from '.';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import Documentation from './ListItemBase.documentation.mdx';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ListItemBaseSection from '../ListItemBaseSection';
import { SHAPES, SIZES } from './ListItemBase.constants';

import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import Avatar from '../Avatar';
import { PresenceType } from '../Avatar/Avatar.types';
import argTypes from './ListItemBase.stories.args';

const COMPONENT_STATES = ['', 'Hover', 'Active', 'Disable', 'Focus'];

export default {
  title: 'Momentum UI/ListItemBase',
  component: ListItemBase,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
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
      <ListItemBase {...variant} className={variant.pseudo} />
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

const MultiTemplate: Story<ListItemBaseProps> = (args: ListItemBaseProps, { parameters }) => {
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

const Template: Story<ListItemBaseProps> = (args) => (
  <div style={{ display: 'grid', gap: '1rem', minWidth: '16rem' }}>
    Simple
    {COMPONENT_STATES.map((state, index) => {
      return (
        <ListItemBase {...args} className={state.toLowerCase()} key={index}>
          <ListItemBaseSection position="start">Start</ListItemBaseSection>
          <ListItemBaseSection position="middle">{state}</ListItemBaseSection>
          <ListItemBaseSection position="end">end</ListItemBaseSection>
        </ListItemBase>
      );
    })}
  </div>
);

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplate.bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.isDisabled;
delete Common.argTypes.size;
delete Common.argTypes.shape;

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
                <ListItemBaseSection position="fill">{state || 'Normal'}</ListItemBaseSection>
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
                <ListItemBaseSection position="fill">{state || 'Normal'}</ListItemBaseSection>
                <ListItemBaseSection position="end">
                  <Icon name="placeholder" scale={16} />
                </ListItemBaseSection>
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
                <ListItemBaseSection position="fill">{state || 'Normal'}</ListItemBaseSection>
                <ListItemBaseSection position="end">
                  <ButtonPill disabled={state === 'Disable'} color="join" size={24}>
                    Join
                  </ButtonPill>
                </ListItemBaseSection>
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
                <ListItemBaseSection position="start">
                  <Icon name="placeholder" scale={16} />
                </ListItemBaseSection>
                <ListItemBaseSection position="fill">{state || 'Normal'}</ListItemBaseSection>
                <ListItemBaseSection position="end">
                  <Icon name="placeholder" scale={16} />
                </ListItemBaseSection>
              </>
            ),
          };
        })
      ),
    },
  ],
};

const Sizes = MultiTemplate.bind({});

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

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
                  <ListItemBaseSection position="start">
                    <Icon name="placeholder" scale={16} />
                  </ListItemBaseSection>
                  <ListItemBaseSection position="fill">{state || 'Normal'}</ListItemBaseSection>
                  <ListItemBaseSection position="end">
                    <Icon name="placeholder" scale={16} />
                  </ListItemBaseSection>
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

Shapes.argTypes = { ...argTypes };
delete Shapes.argTypes.shape;

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
                  <ListItemBaseSection position="start">
                    {shape === SHAPES.rounded ? (
                      <Avatar title="John Adams" size={32} presence={PresenceType.Active} />
                    ) : (
                      <Icon name="placeholder" scale={16} />
                    )}
                  </ListItemBaseSection>
                  <ListItemBaseSection position="fill">{state || 'Normal'}</ListItemBaseSection>
                  <ListItemBaseSection position="end">
                    <Icon name="placeholder" scale={16} />
                  </ListItemBaseSection>
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
                  <ListItemBaseSection position="start">
                    {shape === SHAPES.rounded ? (
                      <Avatar title="John Adams" size={24} presence={PresenceType.Active} />
                    ) : (
                      <Icon name="placeholder" scale={16} />
                    )}
                  </ListItemBaseSection>
                  <ListItemBaseSection position="fill">{state || 'Normal'}</ListItemBaseSection>
                  <ListItemBaseSection position="end">
                    <Icon name="placeholder" scale={16} />
                  </ListItemBaseSection>
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
