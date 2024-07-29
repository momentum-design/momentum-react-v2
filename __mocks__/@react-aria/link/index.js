// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useLink(props, ref) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {isDisabled, isInverted, onPress, elementType, ...otherProps} = props;
  return {
    linkProps: { ...otherProps, 'data-disabled': isDisabled, 'data-inverted': isInverted, onClick: onPress },
  };
}
