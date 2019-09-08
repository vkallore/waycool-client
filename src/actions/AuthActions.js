import {
  CSS_CLASS_SUCCESS,
  CSS_CLASS_WARNING,
  RE_CREATE_ACCOUNT
} from 'constants/AppConstants'
import { TEXT_GOOGLE, TEXT_FACEBOOK } from 'constants/AppLanguage'
import { FORM_LOGIN, FORM_REGISTER } from 'constants/AppForms'
import {
  errorHandler,
  clearMessage,
  dispatchMessage,
  setUserData,
  resetForm,
  setAjaxProcessing,
  checkLoggedInStatus,
  setLoggedIn
} from 'actions'
import { doLogin, socialLogin, doRegister } from 'services/auth'

/**
 * Login form
 * @param {string} username
 * @param {string} password
 */
export const login = ({ username, password }) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    try {
      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch, false)
      if (statusIsLoggedIn) {
        return []
      }

      const { data: userData } = await doLogin({ username, password })

      const { api_key, is_admin } = userData
      if (api_key) {
        setUserData(userData)

        dispatch(resetForm(FORM_LOGIN))
        dispatch(setLoggedIn(true, is_admin))
        dispatch(setAjaxProcessing(false))
      }
      return userData
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Register form
 * @param {string} username
 * @param {string} password
 */
export const register = formData => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))

    try {
      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch, false)
      if (statusIsLoggedIn) {
        return []
      }

      const response = await doRegister(formData)

      dispatch(setAjaxProcessing(false))
      if (response.status === 201) {
        dispatch(resetForm(FORM_REGISTER))
        dispatchMessage(
          dispatch,
          response.data.message,
          null,
          CSS_CLASS_SUCCESS
        )
      } else if (response.status === 202) {
        dispatchMessage(
          dispatch,
          response.data.message,
          null,
          CSS_CLASS_WARNING
        )
        dispatch(confirmReCreate())
      }
      return []
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Set as not logged in & clear user data
 */
export const logout = () => {
  return dispatch => {
    dispatch(setLoggedIn(false, false))
    setUserData()
  }
}

/**
 * Confirm the account re-creation
 */
const confirmReCreate = () => {
  return { type: RE_CREATE_ACCOUNT }
}

/**
 * Social login to profile
 */
export const loginSocial = (authResponse, socialType) => {
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

      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch, false)
      if (statusIsLoggedIn) {
        return []
      }

      const { data: userData } = await socialLogin({
        social_uid: socialId,
        social_site: socialType
      })

      const { api_key, is_admin, message } = userData
      if (api_key) {
        dispatch(resetForm(FORM_LOGIN))

        await dispatchMessage(dispatch, message, null, CSS_CLASS_SUCCESS)

        setUserData(userData)

        dispatch(setLoggedIn(true, is_admin))
        dispatch(setAjaxProcessing(false))
      }
      return userData
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
