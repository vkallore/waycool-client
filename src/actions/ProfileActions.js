import { getProfile, doDeleteProfile, addSocialProfile } from 'services/profile'

import {
  errorHandler,
  clearMessage,
  dispatchMessage,
  setAjaxProcessing,
  checkLoggedInStatus
} from 'actions'

import { logout } from 'actions/AuthActions'

import { CSS_CLASS_SUCCESS } from 'constants/AppConstants'

import { TEXT_GOOGLE, TEXT_FACEBOOK } from 'constants/AppLanguage'

/**
 * Get profile details
 */
export const getProfileDetails = () => {
  return async dispatch => {
    try {
      dispatch(clearMessage())

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
 * Get profile details
 */
export const socialConnectResponse = (authResponse, socialType) => {
  return async dispatch => {
    try {
      let socialId = ''
      if (socialType === TEXT_GOOGLE) {
        if (authResponse.error) {
          const errorMsg = `${socialType} Error: ${authResponse.error}`
          errorHandler(dispatch, errorMsg, true)

          return []
        }
        socialId = authResponse.googleId
      } else if (socialType === TEXT_FACEBOOK) {
        if (authResponse.error) {
          const errorMsg = `${socialType} Error: ${authResponse.error.message}`
          errorHandler(dispatch, errorMsg, true)

          return []
        }
        socialId = authResponse.userID
      }

      if (socialId === '' || socialId === null) {
        const message = `Error occurred while linking your ${socialType} profile!`
        dispatchMessage(dispatch, message, null, CSS_CLASS_SUCCESS)

        return []
      }

      dispatch(clearMessage())

      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const { data: response } = await addSocialProfile({
        social_uid: socialId,
        social_site: socialType
      })

      dispatch(setAjaxProcessing(false))
      dispatchMessage(dispatch, response.message, null, CSS_CLASS_SUCCESS, true)
      return response.data
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
