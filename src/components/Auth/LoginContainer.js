import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { login, loginSocial } from 'actions/AuthActions'

import LoginForm from 'components/Auth/LoginForm'

import { LoginGoogle, LoginFacebook } from 'components/Common/SocialProfile'

import { FORM_LOGIN } from 'constants/AppForms'
import {
  TITLE_LOGIN,
  TEXT_LOGIN,
  TEXT_LOGIN_USING
} from 'constants/AppLanguage'

import { clearMessage } from 'actions'

import { getLoginRedirect } from 'helpers'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class LoginContainer extends React.Component {
  handleSubmit = async formFields => {
    const { login } = this.props

    await login({
      username: formFields.username,
      password: formFields.password
    })
  }

  render() {
    const { loggedIn, loggedInAdmin } = this.props
    if (loggedIn) {
      return <Redirect to={getLoginRedirect(loggedIn, loggedInAdmin)} />
    }
    const {
      ajaxProcessing,
      formFields,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage,
      loginSocial
    } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE_LOGIN}</title>
        </Helmet>
        <h1 className="title">{TEXT_LOGIN}</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <LoginForm
              handleSubmit={this.handleSubmit}
              ajaxProcessing={ajaxProcessing}
              formFields={formFields}
              formModel={FORM_LOGIN}
            />
          </div>
        </div>
        <div className="columns is-centered has-text-centered">
          <div className="column is-one-quarter">
            <LoginGoogle
              buttonClass="button"
              buttonText={TEXT_LOGIN_USING}
              socialConnectResponse={loginSocial}
            />
          </div>
          <div className="column is-one-quarter">
            <LoginFacebook
              buttonClass="button"
              buttonText={TEXT_LOGIN_USING}
              socialConnectResponse={loginSocial}
            />
          </div>
        </div>
        <AlertBox
          alertText={apiResponse}
          alertType={apiResponseType}
          allowMessageClear={allowMessageClear}
          clearMessage={clearMessage}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  loggedInAdmin: state.common.loggedInAdmin,
  ajaxProcessing: state.common.ajaxProcessing,
  formFields: state.forms.login,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    { login, clearMessage, loginSocial }
  )(LoginContainer)
)
