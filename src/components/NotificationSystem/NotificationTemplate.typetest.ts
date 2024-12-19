import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { NotificationTemplateProps } from './NotificationTemplate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<
    ExpectExtends<NotificationTemplateProps, { content: 'Some content'; 'aria-label': 'abc' }>
  >,
  Expect<
    ExpectExtends<
      NotificationTemplateProps,
      { content: 'Some content'; 'aria-labelledby': 'some-id' }
    >
  >,
  Expect<
    ExpectExtends<
      NotificationTemplateProps,
      { content: 'Some content'; 'aria-label': 'abc'; 'aria-labelledby': 'some-id' }
    >
  >,

  ExpectFalse<ExpectExtends<NotificationTemplateProps, { 'aria-label': 'abc' }>>,
  ExpectFalse<ExpectExtends<NotificationTemplateProps, { 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<
    ExpectExtends<NotificationTemplateProps, { 'aria-label': 'abc'; 'aria-labelledby': 'some-id' }>
  >,

  ExpectFalse<ExpectExtends<NotificationTemplateProps, { content: 'Some content' }>>,

  ExpectFalse<ExpectExtends<NotificationTemplateProps, Record<string, never>>>
];
