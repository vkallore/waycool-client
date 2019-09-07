import { getTimeLog, timeLogDelete, getCategories } from 'services/timeLog'

import {
  errorHandler,
  clearMessage,
  dispatchMessage,
  setAjaxProcessing,
  checkLoggedInStatus,
  setListingData,
  buildApiParams
} from 'actions'

import { toISOString } from 'helpers'

import { CSS_CLASS_SUCCESS } from 'constants/AppConstants'
import {
  TIME_LOG_ADD_SUCCESS,
  TIME_LOG_DELETE_SUCCESS
} from 'constants/AppMessage'
import { FORM_TIME_LOG } from 'constants/AppForms'

const perPage = process.env.PER_PAGE || 10

/**
 * Get time logs
 */
export const getTimeLogs = () => {
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

      const response = await getTimeLog(params)

      dispatch(setAjaxProcessing(false))

      const data = response.data || []

      dispatch(
        setListingData({
          data: data.data,
          totalRecords: data.totalRecords,
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
 * Delete time log
 * @param {string} timeLogId
 */
export const deleteTimeLog = timeLogId => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const response = await timeLogDelete(timeLogId)

      dispatch(setAjaxProcessing(false))
      dispatchMessage(
        dispatch,
        TIME_LOG_DELETE_SUCCESS,
        null,
        CSS_CLASS_SUCCESS,
        true
      )

      return response.data
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Get all categories
 * @param {object} - Filter options
 */
export const allCategories = () => {
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

      const response = await getCategories()

      dispatch(setAjaxProcessing(false))

      return response.data
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
