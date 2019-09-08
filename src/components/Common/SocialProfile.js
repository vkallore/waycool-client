import React from 'react'
import GoogleLogin from 'react-google-login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import {
  TEXT_LINKED_TO,
  TEXT_GOOGLE,
  TEXT_FACEBOOK
} from 'constants/AppLanguage'

/**
 * Google login button
 */
export const LoginGoogle = ({
  buttonText = '',
  buttonClass = '',
  socialConnectResponse,
  renderPlugin = true
}) => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

  const responseGoogle = response => {
    socialConnectResponse(response, TEXT_GOOGLE)
  }
  return renderPlugin === true ? (
    <GoogleLogin
      clientId={googleClientId}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className={buttonClass}
        >
          {`${buttonText} ${TEXT_GOOGLE}`}

          <FontAwesomeIcon icon={faGoogle} />
        </button>
      )}
      autoLoad={false}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  ) : (
    <button disabled={true} className="button">
      {`${TEXT_LINKED_TO} ${TEXT_GOOGLE}`}

      <FontAwesomeIcon icon={faGoogle} />
    </button>
  )
}

/**
 * Facebook login button
 */
export const LoginFacebook = ({
  buttonText = '',
  buttonClass = '',
  socialConnectResponse,
  renderPlugin = true
}) => {
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID

  const responseFacebook = response => {
    socialConnectResponse(response, TEXT_FACEBOOK)
  }

  return renderPlugin === true ? (
    <FacebookLogin
      appId={facebookAppId}
      autoLoad={false}
      callback={responseFacebook}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className={buttonClass}
        >
          {`${buttonText} ${TEXT_FACEBOOK}`}

          <FontAwesomeIcon icon={faFacebook} />
        </button>
      )}
      cookiePolicy={'single_host_origin'}
    />
  ) : (
    <button disabled={true} className="button">
      {`${TEXT_LINKED_TO} ${TEXT_FACEBOOK}`}

      <FontAwesomeIcon icon={faFacebook} />
    </button>
  )
}
