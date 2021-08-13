import { TYPES } from './Avatar.constants';

/**
 * Utility function to convert names into initials
 *
 * @param title The name of the person/space this avatar is for
 * @returns string with initials
 */
export const getInitials = (title: string, type: string): string => {
  if (!title.replace(/\s/g, '').length) return '';
  const letters = [];
  const words = title.trim().split(/ +/);

  letters.push(String.fromCodePoint(words[0].codePointAt(0)));

  if (type !== TYPES.space && words.length > 1) {
    letters.push(String.fromCodePoint(words[words.length - 1].codePointAt(0)));
  }
  return letters.join('');
};
