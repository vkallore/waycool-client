import { RESET_FORM, CHANGE_FORM } from 'constants/AppConstants'
import { FORM_LOGIN, FORM_REGISTER } from 'constants/AppForms'

const initialState = {
  login: {
    username: '',
    password: ''
  },
  register: {
    name: '',
    age: '',
    gender: '',
    location: '',
    latitude: '',
    longitude: '',
    email: ''
  }
  // timeLog: {
  //   category: '',
  //   duration: '',
  //   taskName: '',
  //   startDate: '',
  //   startTime: ''
  // }
}

export const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FORM:
      return resetForm(state, action)
    case CHANGE_FORM:
      return updateForm(state, action)
    default:
      return state
  }
}

const resetForm = (state, action) => {
  switch (action.formType) {
    case FORM_LOGIN:
      return {
        ...state,
        login: initialState.login
      }
    case FORM_REGISTER:
      return {
        ...state,
        register: initialState.register
      }
    default:
      break
  }
}

const updateForm = (state, action) => {
  switch (action.formType) {
    case FORM_LOGIN:
      return {
        ...state,
        login: { ...state.login, ...action.newState }
      }
    case FORM_REGISTER:
      return {
        ...state,
        register: { ...state.register, ...action.newState }
      }
    default:
      return state
  }
}
