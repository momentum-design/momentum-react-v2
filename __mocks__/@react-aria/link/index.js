// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useLink(props, ref) {
  return {
    linkProps: {...props, elementType: 'a', onPress: jest.fn()}
  };
}