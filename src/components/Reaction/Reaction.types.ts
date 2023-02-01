import { AnimationEventCallback } from 'lottie-web';
import { CSSProperties } from 'react';
import { IconScale } from '../Icon/Icon.types';

import { ON_VIDEO_PATH } from './Reaction.constants';

type OnVideoPrefix = typeof ON_VIDEO_PATH;

export type ReactionWithSkinTone = 'clap' | 'thumb-up' | 'thumb-down' | 'prayer' | 'raise-hand';

export type ReactionWithoutSkinTone =
  | 'smile'
  | 'sad'
  | 'wow'
  | 'haha'
  | 'celebrate'
  | 'heart'
  | 'fire'
  | 'speed-up'
  | 'slow-down';

export type SkinTone = 'yellow' | 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark';

// Maps through all ReactionType and appends all SkinTones.
type GenerateReactionName<ReactionType extends string, SkinType extends string> = keyof {
  [R in ReactionType as `${R}-${SkinType}`];
};

// Appends prefix to literal.
type AppendPrefix<P extends string, T extends string> = keyof {
  [Type in T as `${P}${T}`];
};

// Original
export type OriginalReactionWithoutSkinTone = ReactionWithoutSkinTone;
export type OriginalReactionWithSkinTone = GenerateReactionName<ReactionWithSkinTone, SkinTone>;
export type OriginalReactionName = OriginalReactionWithSkinTone | OriginalReactionWithoutSkinTone;

// On Video
export type OnVideoReactionWithoutSkinTone = AppendPrefix<OnVideoPrefix, ReactionWithoutSkinTone>;
export type OnVideoReactionWithSkinTone = AppendPrefix<
  OnVideoPrefix,
  GenerateReactionName<ReactionWithSkinTone, SkinTone>
>;
export type OnVideoReactionName = OnVideoReactionWithoutSkinTone | OnVideoReactionWithSkinTone;

// ALL
export type ReactionName = OriginalReactionName | OnVideoReactionName;

export interface Props {
  /**
   * Custom boolean to autoplay SVG or not.
   */
  autoPlay?: boolean;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom prop for how many times to loop or true false for no loop vs. infinite loop
   */
  loop?: boolean | number;

  /**
   * Name of the specific animation to render.
   * Name represents the actual file name (including path) of the lottie files
   * in the @momentum-design/animations repo. Path starts under /animations/reactions;
   */
  name: ReactionName;

  /**
   * Size index of this Reaction.
   */
  size?: IconScale;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Callback that gets called after animation has finished.
   */
  onComplete?: AnimationEventCallback;
}
