import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import React, { useState } from 'react';
import Reaction, { ReactionProps } from './';
import argTypes from './Reaction.stories.args';
import Documentation from './Reaction.stories.docs.mdx';
import { REACTION_NAMES } from './Reaction.constants';

export default {
  title: 'Momentum UI/Reaction',
  component: Reaction,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    name: REACTION_NAMES.thumbUpYellow,
    loop: 1,
    autoPlay: true,
  },
};

const Wrapper = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        Trigger
      </button>
      {show && <Reaction autoPlay name="haha" loop={1} onComplete={() => setShow(false)} />}
    </div>
  );
};

const Example = Template<ReactionProps>(Wrapper).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<ReactionProps>(Reaction).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    { name: REACTION_NAMES.popper },
    { name: REACTION_NAMES.heart },
    { name: REACTION_NAMES.thumbUpYellow },
    { name: REACTION_NAMES.smile },
    { name: REACTION_NAMES.haha },
    { name: REACTION_NAMES.wow },
    { name: REACTION_NAMES.sad },
    { name: REACTION_NAMES.popper, size: 16 },
    { name: REACTION_NAMES.heart, size: 16 },
    { name: REACTION_NAMES.thumbUpYellow, size: 16 },
    { name: REACTION_NAMES.smile, size: 16 },
    { name: REACTION_NAMES.haha, size: 16 },
    { name: REACTION_NAMES.wow, size: 16 },
    { name: REACTION_NAMES.sad, size: 16 },
  ],
};

export { Example, Common };
