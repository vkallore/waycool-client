import { LISTING_DATA_UPDATE, RESET_LISTING_DATA } from 'constants/AppConstants'
const initialState = {
  data: [],
  totalRecords: 0,
  currentPage: 0,
  totalPages: 0,
  perPage: 10
}

export const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTING_DATA_UPDATE:
      return setListingData(state, action.listingData)
    case RESET_LISTING_DATA:
      return initialState
    default:
      return state
  }
}

const setListingData = (state, listingData) => {
  return {
    ...state,
    ...listingData
  }
}
