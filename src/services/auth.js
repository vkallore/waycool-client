import request from 'services'

/**
 * Login
 * @param {object}
 */
export const doLogin = ({ ...formData }) => {
  return request.post('auth/login', formData)
}

/**
 * Register
 * @param {object}
 */
export const doRegister = ({ ...formData }) => {
  return request.post('users/', formData)
}
