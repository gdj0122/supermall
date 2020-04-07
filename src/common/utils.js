export function debounce(func,delay) {
  let timer = null;
  if (timer) clearTimeout(timer)
  return function (...agrs) {
    timer = setTimeout(() => {
      func.apply(this, agrs)
    }, delay)
  }
}
