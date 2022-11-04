import type { IconWeight } from './Icon.types';
import { DEFAULTS } from './Icon.constants';
/**
 * Creates the resolved name for SVG icons lookup.
 * Used as part of the URL when dynamically loading icons.
 * @param name - name of the icon
 * @param weight - weight of the icon
 * @param weightless - marks that this icon doesn't have a weight
 * @returns - resolved name of the icon
 */
export const getResolvedSVGName = (name: string, weight: IconWeight, weightless: boolean): string =>
  weightless ? name : `${name}-${weight || DEFAULTS.WEIGHT}`;
