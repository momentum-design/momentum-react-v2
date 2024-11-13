/* eslint-disable react/display-name */
import React, { useCallback, useState } from 'react';

import ListItemBase, { ListItemBaseProps } from '.';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import Documentation from './ListItemBase.documentation.mdx';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import {
  getComponentStates,
  MultiTemplateWithPseudoStates,
  Template,
} from '../../storybook/helper.stories.templates';

import ListItemBaseSection from '../ListItemBaseSection';
import { SHAPES, SIZES } from './ListItemBase.constants';
import { action } from '@storybook/addon-actions';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import Avatar from '../Avatar';
import { PresenceType } from '../Avatar/Avatar.types';
import argTypes from './ListItemBase.stories.args';
import ButtonSimple from '../ButtonSimple';
import Text from '../Text';
import ButtonCircle from '../ButtonCircle';
import Popover from '../Popover';

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

const Example = Template<ListItemBaseProps>((args) => (
  <>
    {getComponentStates(
      ListItemBase,
      {
        ...args,
        children: (
          <>
            <ListItemBaseSection position="start">Start</ListItemBaseSection>
            <ListItemBaseSection position="middle">Middle</ListItemBaseSection>
            <ListItemBaseSection position="end">end</ListItemBaseSection>
          </>
        ),
        onPress: action('onPress'),
      },
      {}
    )}
  </>
)).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplateWithPseudoStates(ListItemBase).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.isDisabled;
delete Common.argTypes.size;
delete Common.argTypes.shape;

Common.parameters = {
  variants: [
    {
      label: 'Simple',
      children: (
        <>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
        </>
      ),
    },
    {
      label: 'With Icon',
      children: (
        <>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
        </>
      ),
    },
    {
      label: 'With Button',
      children: (state) => (
        <>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <ButtonPill disabled={state === 'Disable'} color="join" size={24}>
              Join
            </ButtonPill>
          </ListItemBaseSection>
        </>
      ),
    },
    {
      label: 'With 2 Icons',
      children: (
        <>
          <ListItemBaseSection position="start">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
        </>
      ),
    },
  ],
};

const Sizes = MultiTemplateWithPseudoStates(ListItemBase).bind({});

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

Sizes.parameters = {
  columns: 3,
  variants: [
    ...Object.values(SIZES).map((size) => ({
      size,
      label: `Size: ${size}`,
      children: (
        <>
          <ListItemBaseSection position="start">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
        </>
      ),
    })),
  ],
};

const Shapes = MultiTemplateWithPseudoStates(ListItemBase).bind({});

Shapes.argTypes = { ...argTypes };
delete Shapes.argTypes.shape;
delete Shapes.argTypes.size;

Shapes.parameters = {
  variants: [
    ...Object.values(SHAPES).map((shape) => {
      return {
        shape,
        label: `Default Size List Item + Shape ${shape}`,
        children: (
          <>
            <ListItemBaseSection position="start">
              {shape === SHAPES.isPilled ? (
                <Avatar title="John Adams" size={32} presence={PresenceType.Active} />
              ) : (
                <Icon name="placeholder" scale={16} />
              )}
            </ListItemBaseSection>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <Icon name="placeholder" scale={16} />
            </ListItemBaseSection>
          </>
        ),
      };
    }),
    ...Object.values(SHAPES).map((shape) => {
      return {
        shape,
        size: 32,
        label: `Compact List Item + Shape ${shape}`,
        children: (
          <>
            <ListItemBaseSection position="start">
              {shape === SHAPES.isPilled ? (
                <Avatar title="John Adams" size={24} presence={PresenceType.Active} />
              ) : (
                <Icon name="placeholder" scale={16} />
              )}
            </ListItemBaseSection>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <Icon name="placeholder" scale={16} />
            </ListItemBaseSection>
          </>
        ),
      };
    }),
    ...Object.values(SHAPES).map((shape) => {
      return {
        isPadded: true,
        shape,
        label: `Padded Default Size List Item + Shape ${shape}`,
        children: (
          <>
            <ListItemBaseSection position="start">
              {shape === SHAPES.isPilled ? (
                <Avatar title="John Adams" size={32} presence={PresenceType.Active} />
              ) : (
                <Icon name="placeholder" scale={16} />
              )}
            </ListItemBaseSection>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <Icon name="placeholder" scale={16} />
            </ListItemBaseSection>
          </>
        ),
      };
    }),
  ],
};

const ListItemWithChangingContent = () => {
  const [showButtonSimple, setShowButtonSimple] = useState<boolean>(false);
  const [removeButton, setRemoveButton] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const handleChange = useCallback(() => {
    setShowButtonSimple((curr) => !curr);
  }, []);

  const handleRemove = useCallback(() => {
    setRemoveButton((curr) => !curr);
  }, []);

  const handleShowTextInstead = useCallback(() => {
    setShowText((curr) => !curr);
  }, []);

  return (
    <div
      style={{
        width: '40rem',
        height: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Text>Example with changing context - try it out!</Text>
      <ListItemBase size={40} isPadded>
        <div
          style={{
            width: '40rem',
            height: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {removeButton && (
            <Popover
              trigger="mouseenter"
              placement="bottom"
              triggerComponent={
                <ButtonCircle size={20} ghost outline onPress={handleShowTextInstead}>
                  <Icon name="plus" weight="bold" scale={16} />
                </ButtonCircle>
              }
            >
              Extra button to toggle text
            </Popover>
          )}
          {showButtonSimple ? (
            <div>
              <div>
                <ButtonSimple onPress={handleRemove}>Toggle extra button</ButtonSimple>
              </div>
            </div>
          ) : (
            <ButtonPill size={20} ghost outline onPress={handleShowTextInstead}>
              Toggle text
            </ButtonPill>
          )}
          {showText && <Text>Unfocusable text</Text>}
          <ButtonPill size={20} ghost outline onPress={handleChange}>
            Change button
          </ButtonPill>
        </div>
      </ListItemBase>
    </div>
  );
};

const ChangingContent = Template(ListItemWithChangingContent).bind({});

ChangingContent.argTypes = { ...argTypes };

export { Example, Sizes, Shapes, Common, ChangingContent };
