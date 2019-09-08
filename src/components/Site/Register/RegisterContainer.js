import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { register } from 'actions/AuthActions'

import RegisterForm from 'components/Site/Register/RegisterForm'

import { FORM_REGISTER } from 'constants/AppForms'
import { TITLE_REGISTER, TEXT_REGISTER } from 'constants/AppLanguage'

import { clearMessage, getGeoLocation } from 'actions'

import { getLoginRedirect } from 'helpers'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class RegisterContainer extends React.Component {
  handleSubmit = async formFields => {
    const { register } = this.props
    register(formFields)
  }

  render() {
    const { loggedIn, loggedInAdmin } = this.props
    if (loggedIn) {
      return <Redirect to={getLoginRedirect(loggedIn, loggedInAdmin)} />
    }
    const {
      ajaxProcessing,
      gettingLocation,
      getGeoLocation,
      formFields,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage
    } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE_REGISTER}</title>
        </Helmet>
        <h1 className="title">{TEXT_REGISTER}</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <RegisterForm
              handleSubmit={this.handleSubmit}
              ajaxProcessing={ajaxProcessing}
              gettingLocation={gettingLocation}
              getGeoLocation={getGeoLocation}
              formFields={formFields}
              formModel={FORM_REGISTER}
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
  gettingLocation: state.common.gettingLocation,
  formFields: state.forms.register,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      register,
      clearMessage,
      getGeoLocation
    }
  )(RegisterContainer)
)
