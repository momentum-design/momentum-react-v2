import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { Item, Section } from '@react-stately/collections';

import MenuTrigger, { MenuTriggerProps } from './';
import argTypes from './MenuTrigger.stories.args';
import Documentation from './MenuTrigger.stories.docs.mdx';
import ButtonPill from '../ButtonPill';
import ButtonCircle from '../ButtonCircle';
import Menu from '../Menu';
import Icon from '../Icon';
import Flex from '../Flex';
import Avatar from '../Avatar';
import { PresenceType } from '../Avatar/Avatar.types';

export default {
  title: 'Momentum UI/MenuTrigger',
  component: MenuTrigger,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<MenuTriggerProps>(MenuTrigger).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  closeOnSelect: false,
  'aria-label': 'Menu trigger',
  children: [
    <ButtonPill key="1">
      <div>Menu</div> <Icon name="arrow-down" weight="bold" autoScale={100} />
    </ButtonPill>,
    <Menu selectionMode="single" key="2">
      <Item key="one">This is a longer text and should trim nicely...</Item>
      <Item key="two">Two</Item>
      <Item key="three">Three</Item>
      <Item key="four">Four</Item>
      <Item key="five">Five</Item>
      <Item key="six">Six</Item>
    </Menu>,
  ],
};

const Common = MultiTemplate<MenuTriggerProps>(MenuTrigger).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  'aria-label': 'Menu trigger',
};

Common.parameters = {
  variants: [
    {
      label: 'Circle Button Trigger',
      children: [
        <ButtonCircle key="1">
          <Icon name="favorite" weight="filled" autoScale={150} />
        </ButtonCircle>,
        <Menu selectionMode="single" key="2">
          <Item key="one">One</Item>
          <Item key="two">Two</Item>
          <Item key="three">Three</Item>
        </Menu>,
      ],
    },
    {
      label: 'Complex Menu Items',
      children: [
        <ButtonPill key="1">
          <div>Special Menu</div>
          <Icon name="arrow-down" weight="bold" autoScale={100} />
        </ButtonPill>,
        <Menu selectionMode="single" key="2">
          <Item key="one" textValue="Apps">
            <Flex alignItems="center" xgap="0.875rem">
              <Icon name="accessories" scale={18} weight="bold" />
              <span>This is a very long option name and should trim.</span>
            </Flex>
          </Item>
          <Item key="two" textValue="Accessories">
            <Flex alignItems="center" xgap="0.875rem">
              <Icon name="accessibility" scale={18} weight="bold" />
              <span>Accessories</span>
            </Flex>
          </Item>
          <Item key="three" textValue="Favorites">
            <Flex alignItems="center" xgap="0.875rem">
              <Icon name="favorite" scale={18} weight="bold" />
              <span>Favorites</span>
            </Flex>
          </Item>
        </Menu>,
      ],
    },
    {
      label: 'Menu with 2 selection modes',
      closeOnSelect: false,
      children: [
        <ButtonPill color="join" key="1">
          <div>Combined Menu</div>
          <Icon name="arrow-down" weight="bold" autoScale={100} />
        </ButtonPill>,
        <Menu selectionMode="single" key="2">
          <Section title="Select single">
            <Item key="one" textValue="Apps">
              <Flex alignItems="center" xgap="0.875rem">
                <Icon name="accessories" scale={18} weight="bold" />
                <span>Apps</span>
              </Flex>
            </Item>
            <Item key="two" textValue="Accessories">
              <Flex alignItems="center" xgap="0.875rem">
                <Icon name="accessibility" scale={18} weight="bold" />
                <span>Accessories</span>
              </Flex>
            </Item>
            <Item key="three" textValue="Favorites">
              <Flex alignItems="center" xgap="0.875rem">
                <Icon name="favorite" scale={18} weight="bold" />
                <span>Favorites</span>
              </Flex>
            </Item>
          </Section>
        </Menu>,
        <Menu selectionMode="multiple" key="2">
          <Section title="Select multiple">
            <Item key="one" textValue="Apps">
              <Flex alignItems="center" xgap="0.875rem">
                <Icon name="accessories" scale={18} weight="bold" />
                <span>Apps</span>
              </Flex>
            </Item>
            <Item key="two" textValue="Accessories">
              <Flex alignItems="center" xgap="0.875rem">
                <Icon name="accessibility" scale={18} weight="bold" />
                <span>Accessories</span>
              </Flex>
            </Item>
            <Item key="three" textValue="Favorites">
              <Flex alignItems="center" xgap="0.875rem">
                <Icon name="favorite" scale={18} weight="bold" />
                <span>Favorites</span>
              </Flex>
            </Item>
          </Section>
        </Menu>,
      ],
    },
    {
      label: 'Default selected Keys',
      children: [
        <ButtonCircle key="1" color="message">
          <Icon name="chat" weight="filled" autoScale={150} />
        </ButtonCircle>,
        <Menu selectionMode="multiple" defaultSelectedKeys={['one', 'two']} key="2">
          <Item key="one">One</Item>
          <Item key="two">Two</Item>
          <Item key="three">Three</Item>
        </Menu>,
      ],
    },
    {
      label: 'With People',
      overlayRadius: 24,
      children: [
        <ButtonCircle key="1" color="join">
          <Icon name="chat" weight="filled" autoScale={150} />
        </ButtonCircle>,
        <Menu
          itemShape="isPilled"
          itemSize={50}
          selectionMode="multiple"
          defaultSelectedKeys={['one', 'two']}
          key="2"
        >
          <Item textValue="Cisco">
            <Flex alignItems="center" xgap="0.875rem">
              <Avatar initials="C" size={32} presence={PresenceType.Active} />
              <span>Cisco Webex</span>
            </Flex>
          </Item>
          <Item textValue="Josh">
            <Flex alignItems="center" xgap="0.875rem">
              <Avatar initials="J" size={32} presence={PresenceType.Meet} />
              <span>Josh Webex</span>
            </Flex>
          </Item>
        </Menu>,
      ],
    },
  ],
};

export { Example, Common };
