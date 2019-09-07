import request from 'services'

import { getLocalStorage } from 'actions'

import { USER_TOKEN, USER_REFRESH_TOKEN } from 'constants/AppConstants'

/**
 * Login
 * @param {object}
 */
export const doLogin = ({ ...formData }) => {
  return request.post('auth/user/login', formData)
}

/**
 * Register
 * @param {object}
 */
export const doRegister = ({ ...formData }) => {
  return request.post('auth/user/', formData)
}

/**
 * Check whether user token is alive
 */
export const isTokenAlive = () => {
  return request.get('auth/user/alive', {
    headers: {
      Authorization: getLocalStorage(USER_TOKEN)
    }
  })
}

/**
 * Get refreshed user token
 */
export const getFreshToken = () => {
  const refreshToken = getLocalStorage(USER_REFRESH_TOKEN)
  return request.post('auth/user/refresh-token', {
    refreshToken
  })
}
