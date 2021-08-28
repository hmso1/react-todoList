import { useRef, useMemo } from "react";

const cancelablePromise = (promise) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => reject(isCanceled, error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

const delay = (n) => new Promise((resolve) => setTimeout(resolve, n));

const useCancellablePromises = () => {
  const pendingPromises = useRef([]);

  const appendPendingPromises = (promise) =>
    (pendingPromises.current = [...pendingPromises.current, promise]);
  const removePendingPromise = (promise) =>
    pendingPromises.current.filter((p) => p !== promise);
  const clearPendingPromises = () =>
    pendingPromises.current.map((p) => p.cancel());

  const api = {
    appendPendingPromises,
    removePendingPromise,
    clearPendingPromises,
  };
  return api;
};

export default function useClickPreventionOnDoubleClick(
  onClick,
  onDoubleClick
) {
  const api = useCancellablePromises();

  const handleClick = useMemo(
    () => (id) => {
      api.clearPendingPromises();
      const waitForClick = cancelablePromise(delay(300));
      api.appendPendingPromises(waitForClick);

      return waitForClick.promise
        .then(() => {
          api.removePendingPromise(waitForClick);
          onClick(id);
        })
        .catch((errorInfo) => {
          api.removePendingPromise(waitForClick);
          if (!errorInfo.isCanceled) {
            throw errorInfo.error;
          }
        });
    },
    [onClick, api]
  );

  const handleDoubleClick = useMemo(
    () => (id, e) => {
      api.clearPendingPromises();
      onDoubleClick(id, e);
    },
    [api, onDoubleClick]
  );

  return [handleClick, handleDoubleClick];
}
