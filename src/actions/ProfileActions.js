import { getProfile, doDeleteProfile } from 'services/profile'

import {
  errorHandler,
  clearMessage,
  dispatchMessage,
  setAjaxProcessing,
  checkLoggedInStatus,
  setListingData,
  buildApiParams
} from 'actions'

import { logout } from 'actions/AuthActions'

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
 * Delete user profile
 */
export const deleteProfile = () => {
  return async dispatch => {
    try {
      if (
        !window.confirm(
          "You are about to delete your account! Cancel to 'Rethink'!"
        )
      ) {
        return
      }
      dispatch(setAjaxProcessing(true))

      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const response = await doDeleteProfile()

      dispatch(setAjaxProcessing(false))

      dispatch(logout())

      dispatchMessage(
        dispatch,
        response.data.message,
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
