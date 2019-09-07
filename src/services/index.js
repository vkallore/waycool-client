import axios from 'axios'
import * as qs from 'qs'

/**
 * API Base URL - Proxy!
 */
const baseURL = `${process.env.REACT_APP_API_URL}/api/`

/**
 * Axios services
 */
export default axios.create({
  baseURL
})

/**
 * Query Parse
 */
export const queryParse = (str = '') => {
  str = str === '' || str === undefined ? window.location.search : str
  return qs.parse(str, { ignoreQueryPrefix: true })
}

/**
 * Stringify the object
 */
export const stringify = (obj, options = {}) => {
  return qs.stringify(obj, { indices: false, ...options })
}
