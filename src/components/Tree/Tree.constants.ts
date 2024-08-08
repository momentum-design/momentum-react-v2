const CLASS_PREFIX = 'md-tree';

const DEFAULTS = {
  IS_RENDERED_FLAT: true,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

/**
 * The root node of the tree.
 *
 * > Note: casting to string to simplify the API, using string only make React happy when the tree node's id used as key.
 * > The root node never appear in the DOM tree, so it is safe to use symbol for the root.
 */
const THREE_ROOT = Symbol('TreeRoot') as unknown as string;

export { CLASS_PREFIX, DEFAULTS, STYLE, THREE_ROOT };
