import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { register } from 'actions/AuthActions'

import RegisterForm from 'components/Site/Register/RegisterForm'

import { FORM_REGISTER } from 'constants/AppForms'
import { TITLE_REGISTER, TEXT_REGISTER } from 'constants/AppLanguage'

import { clearMessage } from 'actions'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class RegisterContainer extends React.Component {
  handleSubmit = async formFields => {
    const { register } = this.props
    register(formFields)
  }

  render() {
    const { loggedIn } = this.props
    if (loggedIn) {
      return <Redirect to="/" />
    }
    const {
      ajaxProcessing,
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
  ajaxProcessing: state.common.ajaxProcessing,
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
      clearMessage
    }
  )(RegisterContainer)
)
