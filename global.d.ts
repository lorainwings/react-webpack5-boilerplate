declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.scss' {
  const classes: Readonly<Record<string, string>>
  export default classes
}
