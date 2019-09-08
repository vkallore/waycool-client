import {
  getLoginCountByType,
  getLoginLog,
  getDeletedAccount
} from 'services/admin'

import {
  errorHandler,
  setAjaxProcessing,
  checkLoggedInStatus,
  setListingData,
  buildApiParams
} from 'actions'

const perPage = process.env.PER_PAGE || 10

/**
 * Get Login Count By Types
 */
export const getLoginCountByTypes = () => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const params = buildApiParams()

      const response = await getLoginCountByType(params)

      dispatch(setAjaxProcessing(false))

      const data = response.data || []

      dispatch(
        setListingData({
          data: data.data,
          totalRecords: data._meta.total_results,
          perPage
        })
      )

      return []
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Get Login logs
 */
export const getLoginLogs = () => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const params = buildApiParams()

      const response = await getLoginLog(params)

      dispatch(setAjaxProcessing(false))

      const data = response.data || []

      dispatch(
        setListingData({
          data: data.data,
          totalRecords: data._meta.total_results,
          perPage
        })
      )

      return []
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Get Login logs
 */
export const getDeletedAccounts = () => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const params = buildApiParams()

      const response = await getDeletedAccount(params)

      dispatch(setAjaxProcessing(false))

      const data = response.data || []

      dispatch(
        setListingData({
          data: data.data,
          totalRecords: data._meta.total_results,
          perPage
        })
      )

      return []
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
