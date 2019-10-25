const curry = (fn, seen = []) => (...args) =>
  fn.length === args.length + seen.length
    ? fn(...seen, ...args)
    : curry(fn, [...seen, ...args])

export default curry