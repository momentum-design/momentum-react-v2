export const hideOnPopperBlurPlugin = {
    name: 'hideOnPopperBlur',
    defaultValue: true,
    fn(instance) {
      return {
        onCreate() {
          instance.popper.addEventListener('focusout', (event) => {
            if (
              instance.props.hideOnPopperBlur &&
              !instance.props.isChildPopoverOpen &&
              !instance.popper.contains(event.relatedTarget) &&
              event.relatedTarget
            ) {
              instance.hide();
            }
          });
        },
      };
    },
  };