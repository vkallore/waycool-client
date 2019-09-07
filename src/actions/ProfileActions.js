import { getProfile } from 'services/profile'

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
import { TIME_LOG_DELETE_SUCCESS } from 'constants/AppMessage'

const perPage = process.env.PER_PAGE || 10

/**
 * Get profile details
 */
export const getProfileDetails = () => {
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

      const response = await getProfile()

      dispatch(setAjaxProcessing(false))

      const { data: profileDetails } = response.data || []

      return profileDetails
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

      const response = [] // await timeLogDelete(timeLogId)

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

      const response = [] //await getCategories()

      dispatch(setAjaxProcessing(false))

      return response.data
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
