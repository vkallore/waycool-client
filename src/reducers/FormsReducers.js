import {
  RESET_FORM,
  CHANGE_FORM,
  SET_ADDRESS,
  SET_LOCATION,
  RE_CREATE_ACCOUNT
} from 'constants/AppConstants'
import { FORM_LOGIN, FORM_REGISTER } from 'constants/AppForms'
import { TEXT_REGISTER, TEXT_RE_REGISTER } from 'constants/AppLanguage'

const initialState = {
  login: {
    username: '',
    password: ''
  },
  register: {
    name: '',
    age: '',
    gender: '',
    address: '',
    latitude: '',
    longitude: '',
    email: '',
    recreate_confirm: '',
    regBtnText: TEXT_REGISTER
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
    case SET_ADDRESS:
      return {
        ...state,
        register: {
          ...state.register,
          address: action.address
        }
      }
    case SET_LOCATION:
      return {
        ...state,
        register: {
          ...state.register,
          latitude: action.position.lat,
          longitude: action.position.long
        }
      }
    case RE_CREATE_ACCOUNT:
      console.log(TEXT_RE_REGISTER)
      return {
        ...state,
        register: {
          ...state.register,
          recreate_confirm: 1,
          regBtnText: TEXT_RE_REGISTER
        }
      }
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
