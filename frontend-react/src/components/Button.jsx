function Button({ children, className }) {
  return (
    <a className={"btn " + className}>
      {children}
    </a>
  )
}

export default Button