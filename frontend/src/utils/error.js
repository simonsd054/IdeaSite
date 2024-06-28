const graphqlError = (response) => {
  const errors = response?.errors
  if (errors) {
    const errorsExtension = errors?.[0]?.extensions
    if (errorsExtension?.code === "Custom") {
      return errorsExtension?.exception?.message
    } else {
      return "Something went wrong"
    }
  } else {
    return null
  }
}

export { graphqlError }
