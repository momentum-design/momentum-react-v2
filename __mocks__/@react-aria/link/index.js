export function useLink(props, ref) {
  return {
    linkProps: {...props, elementType: 'a', onPress: jest.fn()}
  };
}
