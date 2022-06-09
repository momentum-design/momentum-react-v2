import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Avatar from '../Avatar';
import ButtonCircle from '../ButtonCircle';
import ButtonControl from '../ButtonControl';
import ButtonGroup from '../ButtonGroup';
import ButtonPill from '../ButtonPill';
import Icon from '../Icon';
import ToastContent from '../ToastContent';
import ToastDetails from '../ToastDetails';

import Toast, { ToastProps } from './';
import argTypes from './Toast.stories.args';
import Documentation from './Toast.stories.docs.mdx';

export default {
  title: 'Momentum UI/Toast',
  component: Toast,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const commonButtons = (
  <ButtonGroup spaced>
    <ButtonCircle outline size={28}>
      <Icon name="alarm" weight="bold" autoScale={125} />
    </ButtonCircle>
    <ButtonPill color="message" size={28}>
      Message
    </ButtonPill>
    <ButtonPill color="cancel" size={28}>
      Cancel
    </ButtonPill>
    <ButtonPill color="join" size={28}>
      Join
    </ButtonPill>
  </ButtonGroup>
);

const Example = Template<ToastProps>(Toast).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  content: (
    <ToastContent action="Action" actionColor="success" actions={commonButtons} actor="Actor">
      Lorem ipsum dolor site aw aetns ctetuer adipiscing
    </ToastContent>
  ),
  controls: [
    <ButtonControl key={0} control="close" />,
    <ButtonControl key={1} control="maximize" />,
    <ButtonControl key={2} control="minimize" />,
  ],
  details: (
    <ToastDetails
      image={<Avatar initials="T" />}
      info="Information"
      infoColor="join"
      subject="Subject"
    >
      Details Title
    </ToastDetails>
  ),
  title: 'Toast Title',
};

const Layouts = MultiTemplate<ToastProps>(Toast).bind({});

Layouts.argTypes = { ...argTypes };
delete Layouts.argTypes.title;

Layouts.args = {
  content: (
    <ToastContent action="Action" actionColor="success" actions={commonButtons} actor="Actor">
      Lorem ipsum dolor site aw aetns ctetuer adipiscing
    </ToastContent>
  ),
  controls: [
    <ButtonControl key={0} control="close" />,
    <ButtonControl key={1} control="maximize" />,
    <ButtonControl key={2} control="minimize" />,
  ],
  details: (
    <ToastDetails
      image={<Avatar initials="T" />}
      info="Information"
      infoColor="join"
      subject="Subject"
    >
      Details Title
    </ToastDetails>
  ),
};

Layouts.parameters = {
  variants: [{}, { title: 'Toast Title' }],
};

const Common = MultiTemplate<ToastProps>(Toast).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.contents;
delete Common.argTypes.controls;
delete Common.argTypes.details;
delete Common.argTypes.title;

Common.parameters = {
  variants: [
    {
      content: (
        <ToastContent action="Action" actionColor="success" actions={commonButtons} actor="Actor">
          Uses content, controls, details, and title props.
        </ToastContent>
      ),
      controls: [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="maximize" />,
        <ButtonControl key={2} control="minimize" />,
      ],
      details: (
        <ToastDetails
          image={<Avatar initials="T" />}
          info="Information"
          infoColor="join"
          subject="Subject"
        >
          Details Title
        </ToastDetails>
      ),
      title: 'Toast Title',
    },
    {
      content: (
        <ToastContent action="Action" actionColor="success" actions={commonButtons} actor="Actor">
          Uses content, controls, and details props.
        </ToastContent>
      ),
      controls: [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="maximize" />,
        <ButtonControl key={2} control="minimize" />,
      ],
      details: (
        <ToastDetails
          image={<Avatar initials="T" />}
          info="Information"
          infoColor="join"
          subject="Subject"
        >
          Details Title
        </ToastDetails>
      ),
    },
    {
      children: [
        <ToastDetails
          key={0}
          image={<Avatar initials="T" />}
          info="Information"
          infoColor="join"
          subject="Subject"
        >
          Details Title
        </ToastDetails>,
        <ToastContent key={1} action="Action" actionColor="warning" actor="Actor">
          Uses children [ToastDetails, ToastContent] and controls props.
        </ToastContent>,
      ],
      controls: [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="mute" />,
        <ButtonControl key={2} control="favorite" />,
      ],
    },
    {
      children: [
        <ToastDetails
          key={0}
          image={<Avatar initials="T" />}
          info="Information"
          infoColor="success"
          subject="Subject"
        >
          Details Title
        </ToastDetails>,
      ],
      content: (
        <ToastContent key={0} action="Action" actionColor="warning" actor="Actor">
          Uses children [ToastDetails], content, and controls props.
        </ToastContent>
      ),
      controls: [<ButtonControl key={0} control="close" />],
    },
    {
      children: [
        <ToastContent key={0} action="Action" actionColor="warning" actor="Actor">
          Uses children [ToastContent], details, controls, and title props.
        </ToastContent>,
      ],
      controls: [<ButtonControl key={0} control="close" />],
      details: (
        <ToastDetails
          image={<Avatar initials="T" />}
          info="Information"
          infoColor="success"
          subject="Subject"
        >
          Details Title
        </ToastDetails>
      ),
      title: 'Toast Title',
    },
    {
      children: [
        <ToastDetails key={0} image={<Avatar initials="T" />}>
          Minimal Toast 1
        </ToastDetails>,
      ],
      controls: [<ButtonControl key={0} control="close" />],
    },
    {
      children: [
        <ToastDetails key={0} image={<Avatar initials="T" />} info="Information" infoColor="join">
          Minimal Toast 2
        </ToastDetails>,
      ],
      controls: [<ButtonControl key={0} control="close" />],
    },
    {
      children: [
        <ToastDetails
          key={0}
          image={<Avatar initials="T" />}
          info="Information"
          infoColor="success"
          subject="Subject"
        >
          Minimal Toast 3
        </ToastDetails>,
      ],
      controls: [<ButtonControl key={0} control="close" />],
    },
    {
      children: [
        <ToastDetails key={0} image={<Avatar initials="T" />} subject="Subject">
          Minimal Toast 4
        </ToastDetails>,
      ],
      controls: [<ButtonControl key={0} control="close" />],
      title: 'Toast Title',
    },
  ],
};

export { Example, Layouts, Common };
