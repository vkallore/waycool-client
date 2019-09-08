import React from 'react'
import GoogleLogin from 'react-google-login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { TEXT_LINKED_TO, TEXT_GOOGLE } from 'constants/AppLanguage'

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
