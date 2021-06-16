import React, {FC} from 'react';

type TypeScriptExampleProps = {
  param: string
}

export const TypeScriptExample: FC<TypeScriptExampleProps> = ({param}) => {
  return <div>Hello this is a typescript component: {param}</div>
}
