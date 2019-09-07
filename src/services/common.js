import request from 'services'

/**
 * Get geoLocation
 * @param {object} params
 */
export const geoLocation = params => {
  return request.get('/users/geo_location', {
    params: params
  })
}
