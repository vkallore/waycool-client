import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { SvgLoader } from 'components/Common/Loaders'

import { clearMessage } from 'actions'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class AdminContainer extends React.Component {
  render() {
    const {
      ajaxProcessing,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage,
      loggedInAdmin
    } = this.props

    if (!loggedInAdmin) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="container">
          <div className="columns">
            <div className="column is-half table-container">
              <h1>Welcome to Admin!</h1>
            </div>
          </div>
          <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
        </div>
        <AlertBox
          alertText={apiResponse}
          alertType={apiResponseType}
          allowMessageClear={allowMessageClear}
          clearMessage={clearMessage}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  loggedInAdmin: state.common.loggedInAdmin,
  ajaxProcessing: state.common.ajaxProcessing,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      clearMessage
      //, paginate, resetListingData
    }
  )(AdminContainer)
)
