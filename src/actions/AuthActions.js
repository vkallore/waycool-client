import {
  CSS_CLASS_SUCCESS,
  CSS_CLASS_WARNING,
  RE_CREATE_ACCOUNT
} from 'constants/AppConstants'
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
import { doLogin, doRegister } from 'services/auth'

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

      if (userData.api_key) {
        setUserData(userData)

        dispatch(resetForm(FORM_LOGIN))
        dispatch(setLoggedIn(true))
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
  console.log(formData)
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
    dispatch(setLoggedIn(false))
    setUserData()
  }
}

const confirmReCreate = () => {
  return { type: RE_CREATE_ACCOUNT }
}
