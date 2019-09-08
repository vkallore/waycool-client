import request from 'services'

/**
 * Login
 * @param {object}
 */
export const doLogin = ({ ...formData }) => {
  return request.post('auth/login', formData)
}

/**
 * Login
 * @param {object}
 */
export const socialLogin = ({ ...formData }) => {
  return request.post('auth/social_login', formData)
}

/**
 * Register
 * @param {object}
 */
export const doRegister = ({ ...formData }) => {
  return request.post('users/', formData)
}
