import request from 'services'

import { getLocalStorage } from 'actions'

import { USER_API_KEY } from 'constants/AppConstants'

export const getLoginCountByType = ({ ...params }) => {
  return request.get('/admin/user-login-list', {
    params: params,
    headers: {
      [USER_API_KEY]: getLocalStorage(USER_API_KEY)
    }
  })
}

export const getLoginLog = ({ ...params }) => {
  return request.get('/admin/user-login-logs', {
    params: params,
    headers: {
      [USER_API_KEY]: getLocalStorage(USER_API_KEY)
    }
  })
}

export const getDeletedAccount = ({ ...params }) => {
  return request.get('/admin/deleted-accounts', {
    params: params,
    headers: {
      [USER_API_KEY]: getLocalStorage(USER_API_KEY)
    }
  })
}
