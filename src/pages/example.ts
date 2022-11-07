type FnReturnType<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: unknown[]
) => infer R
  ? R
  : never

type ExFnReturnType = FnReturnType<typeof example>

const example = () => {
  return 'A webpack 5 boilerplate using Babel and PostCSS with hot reload by dev server and an optimized production build !'
}

// const exampleRt: ExFnReturnType = 13412

export default example
