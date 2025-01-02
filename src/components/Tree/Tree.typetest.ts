import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props, TreeRoot } from './Tree.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { treeStructure: TreeRoot; 'aria-label': 'abc' }>>,
  Expect<ExpectExtends<Props, { treeStructure: TreeRoot; 'aria-labelledby': 'some-id' }>>,
  Expect<
    ExpectExtends<
      Props,
      { treeStructure: TreeRoot; 'aria-label': 'abc'; 'aria-labelledby': 'some-id' }
    >
  >,

  ExpectFalse<ExpectExtends<Props, { 'aria-label': 'abc' }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-label': 'abc'; 'aria-labelledby': 'some-id' }>>,

  ExpectFalse<ExpectExtends<Props, { treeStructure: TreeRoot }>>,

  ExpectFalse<ExpectExtends<Props, Record<string, never>>>
];
