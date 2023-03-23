export const validateEmail = (value: string) => {
  if (!value) {
    return 'Email is required'
  } else if (value !== 'example@example.com') {
    return 'Invalid email, the correct one is example@example.com'
  }
  return ''
}

export const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required'
  } else if (value !== 'password') {
    return 'Invalid password, the correct one is password'
  }
  return ''
}
