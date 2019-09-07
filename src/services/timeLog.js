import request from 'services'

import { getLocalStorage } from 'actions'

import { USER_TOKEN } from 'constants/AppConstants'

export const saveTimeLog = ({ ...formData }) => {
  return request.post('/task/time-log/', formData, {
    headers: {
      Authorization: getLocalStorage(USER_TOKEN)
    }
  })
}

export const getTimeLog = ({ ...params }) => {
  return request.get('/task/time-log/', {
    params: params,
    headers: {
      Authorization: getLocalStorage(USER_TOKEN)
    }
  })
}

export const timeLogDelete = timeLogId => {
  return request.delete(`/task/time-log/${timeLogId}`, {
    headers: {
      Authorization: getLocalStorage(USER_TOKEN)
    }
  })
}

export const getCategories = () => {
  return request.get('/task/time-log/categories/', {
    headers: {
      Authorization: getLocalStorage(USER_TOKEN)
    }
  })
}
