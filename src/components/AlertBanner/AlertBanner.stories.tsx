import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ButtonSimple from '../ButtonSimple';
import Icon from '../Icon';

import AlertBanner, { AlertBannerProps } from './';
import argTypes from './AlertBanner.stories.args';
import Documentation from './AlertBanner.stories.docs.mdx';

export default {
  title: 'Momentum UI/AlertBanner',
  component: AlertBanner,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const commonButtons = [
  <ButtonSimple key={0}>
    <Icon name="refresh" autoScale />
  </ButtonSimple>,
  <ButtonSimple key={1}>
    <Icon name="cancel" autoScale />
  </ButtonSimple>,
];

const Example = Template<AlertBannerProps>(AlertBanner).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  buttons: commonButtons,
  image: <Icon name="info-circle" autoScale />,
  label: 'Example Label',
};

const Centering = MultiTemplate<AlertBannerProps>(AlertBanner).bind({});

Centering.argTypes = { ...argTypes };
delete Centering.argTypes.isCentered;

Centering.parameters = {
  variants: [
    {
      buttons: commonButtons,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      buttons: commonButtons,
      isCentered: true,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      isCentered: true,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      label: 'Example Label',
    },
    {
      isCentered: true,
      label: 'Example Label',
    },
  ],
};

const Colors = MultiTemplate<AlertBannerProps>(AlertBanner).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.parameters = {
  variants: [
    {
      buttons: commonButtons,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label Default',
    },
    {
      buttons: commonButtons,
      color: 'theme',
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label Theme',
    },
    {
      buttons: commonButtons,
      color: 'success',
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label Success',
    },
    {
      buttons: commonButtons,
      color: 'warning',
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label Warning',
    },
    {
      buttons: commonButtons,
      color: 'error',
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label Error',
    },
  ],
};

const Growing = MultiTemplate<AlertBannerProps>(AlertBanner).bind({});

Growing.argTypes = { ...argTypes };
delete Growing.argTypes.isGrown;

Growing.parameters = {
  variants: [
    {
      buttons: commonButtons,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      buttons: commonButtons,
      isGrown: true,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      isGrown: true,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      label: 'Example Label',
    },
    {
      isGrown: true,
      label: 'Example Label',
    },
  ],
};

const Pilling = MultiTemplate<AlertBannerProps>(AlertBanner).bind({});

Pilling.argTypes = { ...argTypes };
delete Pilling.argTypes.isPilled;

Pilling.parameters = {
  variants: [
    {
      buttons: commonButtons,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      buttons: commonButtons,
      isPilled: true,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      isPilled: true,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label',
    },
    {
      label: 'Example Label',
    },
    {
      isPilled: true,
      label: 'Example Label',
    },
  ],
};

const Sizes = MultiTemplate<AlertBannerProps>(AlertBanner).bind({});

Sizes.argTypes = { ...argTypes };
delete Colors.argTypes.size;

Sizes.parameters = {
  variants: [
    {
      buttons: commonButtons,
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label Default',
    },
    {
      buttons: commonButtons,
      size: 'small',
      image: <Icon name="info-circle" autoScale />,
      label: 'Example Label Small',
    },
  ],
};

const Static = MultiTemplate<AlertBannerProps>(AlertBanner).bind({});

Static.argTypes = { ...argTypes };
delete Static.argTypes.isStatic;

Static.args = {
  buttons: commonButtons,
  image: <Icon name="info-circle" autoScale />,
  label: 'Example Label Default',
};

Static.parameters = {
  variants: [{}, { isStatic: true }],
};

const Common = MultiTemplate<AlertBannerProps>(AlertBanner).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.buttons;
delete Common.argTypes.isCentered;
delete Common.argTypes.children;
delete Common.argTypes.color;
delete Common.argTypes.image;
delete Common.argTypes.label;
delete Common.argTypes.isPilled;
delete Common.argTypes.size;

Common.parameters = {
  variants: [
    // Pills.
    {
      isCentered: true,
      image: <Icon name="spinner" autoScale />,
      label: 'Transient State...',
      isPilled: true,
    },
    {
      image: <Icon name="spinner" autoScale />,
      label: 'Transient State...',
      isPilled: true,
    },
    {
      isCentered: true,
      color: 'theme',
      image: <Icon name="info-circle" weight="filled" autoScale />,
      label: 'General Announcement',
      isPilled: true,
    },
    {
      color: 'theme',
      image: <Icon name="info-circle" weight="filled" autoScale />,
      label: 'General Announcement',
      isPilled: true,
    },
    {
      isCentered: true,
      color: 'success',
      image: <Icon name="check" autoScale />,
      label: 'Success',
      isPilled: true,
    },
    {
      color: 'success',
      image: <Icon name="check" autoScale />,
      label: 'Success',
      isPilled: true,
    },
    {
      isCentered: true,
      color: 'warning',
      image: <Icon name="warning" weight="filled" autoScale />,
      label: 'Warning',
      isPilled: true,
    },
    {
      color: 'warning',
      image: <Icon name="warning" weight="filled" autoScale />,
      label: 'Warning',
      isPilled: true,
    },
    {
      isCentered: true,
      color: 'error',
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Error',
      isPilled: true,
    },
    {
      color: 'error',
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Error',
      isPilled: true,
    },
    {
      isCentered: true,
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'isStatic',
      isPilled: true,
      isStatic: true,
    },
    {
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'isStatic',
      isPilled: true,
      isStatic: true,
    },

    // Lorem Ipsum.
    {
      image: <Icon name="spinner" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      image: <Icon name="spinner" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      color: 'theme',
      image: <Icon name="info-circle" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'theme',
      image: <Icon name="info-circle" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      color: 'success',
      image: <Icon name="check" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'success',
      image: <Icon name="check" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      color: 'warning',
      image: <Icon name="warning" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'warning',
      image: <Icon name="warning" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      color: 'error',
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'error',
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
    },
    {
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      isStatic: true,
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      isStatic: true,
    },

    // Lorem Ipsum Small.
    {
      image: <Icon name="spinner" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      image: <Icon name="spinner" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      color: 'theme',
      image: <Icon name="info-circle" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'theme',
      image: <Icon name="info-circle" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      color: 'success',
      image: <Icon name="check" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'success',
      image: <Icon name="check" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      color: 'warning',
      image: <Icon name="warning" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'warning',
      image: <Icon name="warning" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      color: 'error',
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      color: 'error',
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      isStatic: true,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },
    {
      buttons: (
        <ButtonSimple key={1}>
          <Icon name="cancel" autoScale />
        </ButtonSimple>
      ),
      image: <Icon name="error-legacy" weight="filled" autoScale />,
      isStatic: true,
      label: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte.',
      size: 'small',
    },

    // Small, no Icon.
    {
      buttons: commonButtons,
      label: 'Transient State... [small]',
      isPilled: true,
      size: 'small',
    },
    {
      buttons: commonButtons,
      label: `Transient State... [small] \n- Bulleted Message`,
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'theme',
      label: 'General Announcement [small]',
      isPilled: true,
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'theme',
      label: `General Announcement [small] \n- Bulleted Message`,
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'success',
      label: 'Success [small]',
      isPilled: true,
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'success',
      label: 'Success [small] \n- Bulleted Message',
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'warning',
      label: 'Warning [small]',
      isPilled: true,
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'warning',
      label: 'Warning [small] \n- Bulleted Message',
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'error',
      label: 'Error [small]',
      isPilled: true,
      size: 'small',
    },
    {
      buttons: commonButtons,
      color: 'error',
      label: 'Error [small] \n- Bulleted Message',
      size: 'small',
    },
    {
      buttons: commonButtons,
      isPilled: true,
      isStatic: true,
      label: 'isStatic [small]',
      size: 'small',
    },
    {
      buttons: commonButtons,
      isStatic: true,
      label: 'isStatic [small] \n- Bulleted Message',
      size: 'small',
    },
  ],
};

export { Example, Centering, Colors, Growing, Pilling, Sizes, Static, Common };
