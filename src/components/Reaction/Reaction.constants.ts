import { ICON_CONSTANTS } from '../Icon';
import {
  OnVideoReactionName,
  OriginalReactionName,
  ReactionName,
  ReactionWithoutSkinTone,
  ReactionWithSkinTone,
  SkinTone,
} from './Reaction.types';
import { cartesian, generateReactionsWithSkinTone } from './Reaction.util';

const CLASS_PREFIX = 'md-reaction';

const DEFAULTS = {
  SIZE: 12,
};

const SIZES = ICON_CONSTANTS.SIZES;

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  notFound: `${CLASS_PREFIX}-not-found`,
};

const ON_VIDEO_PATH = 'on_video/';

const SKIN_TONES: Record<SkinTone, SkinTone> = {
  yellow: 'yellow',
  light: 'light',
  medium_light: 'medium_light',
  medium: 'medium',
  medium_dark: 'medium_dark',
  dark: 'dark',
};

const REACTIONS_WITH_SKIN_TONE: Record<ReactionWithSkinTone, ReactionWithSkinTone> = {
  clap: 'clap',
  thumb_up: 'thumb_up',
  thumb_down: 'thumb_down',
  prayer: 'prayer',
  raise_hand: 'raise_hand',
};

const REACTIONS_WITHOUT_SKIN_TONE: Record<ReactionWithoutSkinTone, ReactionWithoutSkinTone> = {
  smile: 'smile',
  sad: 'sad',
  wow: 'wow',
  haha: 'haha',
  celebrate: 'celebrate',
  heart: 'heart',
  fire: 'fire',
  speed_up: 'speed_up',
  slow_down: 'slow_down',
};

const ORIGINAL_REACTIONS = {
  ...REACTIONS_WITHOUT_SKIN_TONE,
  ...generateReactionsWithSkinTone(
    cartesian(Object.values(REACTIONS_WITH_SKIN_TONE), Object.values(SKIN_TONES)),
    ({ type, skinTone }) => `${type}_${skinTone}`
  ),
} as Record<OriginalReactionName, OriginalReactionName>;

const ON_VIDEO_REACTIONS = {
  // append on video path prefix to each.
  ...Object.values(REACTIONS_WITHOUT_SKIN_TONE).reduce(
    (acc, name) => ({ ...acc, [`${ON_VIDEO_PATH}${name}`]: `${ON_VIDEO_PATH}${name}` }),
    {}
  ),
  ...generateReactionsWithSkinTone(
    cartesian(Object.values(REACTIONS_WITH_SKIN_TONE), Object.values(SKIN_TONES)),
    ({ type, skinTone }) => `${ON_VIDEO_PATH}${type}_${skinTone}`
  ),
} as Record<OnVideoReactionName, OnVideoReactionName>;

const REACTIONS: Record<ReactionName, ReactionName> = {
  ...ORIGINAL_REACTIONS,
  ...ON_VIDEO_REACTIONS,
};

export {
  CLASS_PREFIX,
  REACTIONS,
  DEFAULTS,
  SKIN_TONES,
  REACTIONS_WITH_SKIN_TONE,
  REACTIONS_WITHOUT_SKIN_TONE,
  ON_VIDEO_PATH,
  SIZES,
  STYLE,
  ON_VIDEO_REACTIONS,
  ORIGINAL_REACTIONS,
};
