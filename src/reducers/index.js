import { combineReducers } from 'redux'

import { commonReducer } from 'reducers/CommonReducers'
import { formsReducer } from 'reducers/FormsReducers'
import { listingReducer } from 'reducers/ListingReducers'

export default combineReducers({
  common: commonReducer,
  forms: formsReducer,
  listing: listingReducer
})
