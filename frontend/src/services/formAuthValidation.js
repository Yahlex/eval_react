import { isLength } from 'validator'

const validateRegisterForm = (formData) => {
  const errors = {}
  if (typeof formData === 'object') {
    // Checking First name
    if (!isLength(formData.username, { min: 2, max: undefined })) { errors.username = 'Username name is invalid' }
    if (!isLength(formData.email, { min: 2, max: undefined })) { errors.email = 'email is invalid' }
  } else {
    throw new Error('Invalid parameter type')
  }

  return errors
}

export {
  validateRegisterForm
}
