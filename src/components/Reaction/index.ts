import { default as Reaction } from './Reaction';
import * as CONSTANTS from './Reaction.constants';
import { REACTIONS, SKIN_TONES } from './Reaction.constants';
import {
  Props,
  SkinTone as SkinToneType,
  ReactionName as ReactionNameType,
  OnVideoReactionName as OnVideoReactionNameType,
  OriginalReactionName as OriginalReactionNameType,
} from './Reaction.types';

export { CONSTANTS as REACTION_CONSTANTS };
export { REACTIONS, SKIN_TONES };

export type ReactionProps = Props;
export type SkinTone = SkinToneType;
export type ReactionName = ReactionNameType;
export type OriginalReactionName = OriginalReactionNameType;
export type OnVideoReactionName = OnVideoReactionNameType;

export default Reaction;
