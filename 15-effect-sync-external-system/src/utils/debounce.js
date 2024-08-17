export function debounce(callback, timeout = 300) {
  let cleanup;
  return (...args) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback.bind(null, ...args), timeout);
  };
}
