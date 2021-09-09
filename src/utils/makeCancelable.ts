interface CancelablePromise<T> {
  promise: Promise<T>;
  cancel: () => void;
}

export const makeCancelable = <T>(promise: Promise<T>): CancelablePromise<T> => {
  let isCanceled = false;
  const wrappedPromise = new Promise<T>((resolve, reject) => {
    // Suppress resolution and rejection if canceled
    promise
      .then((val) => !isCanceled && resolve(val))
      .catch((error) => !isCanceled && reject(error));
  });
  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
};
