import request from 'services'

import { getLocalStorage } from 'actions'

import { USER_API_KEY } from 'constants/AppConstants'

export const addSocialProfile = ({ ...putData }) => {
  return request.put('/profile/link_social', putData, {
    headers: {
      [USER_API_KEY]: getLocalStorage(USER_API_KEY)
    }
  })
}

export const getProfile = ({ ...params }) => {
  return request.get('/profile/', {
    params: params,
    headers: {
      [USER_API_KEY]: getLocalStorage(USER_API_KEY)
    }
  })
}

export const doDeleteProfile = () => {
  return request.delete(`/profile/`, {
    headers: {
      [USER_API_KEY]: getLocalStorage(USER_API_KEY)
    }
  })
}
