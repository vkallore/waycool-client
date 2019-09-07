import React, { Suspense } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import SiteLayout from 'layouts/SiteLayout'
import { ContentLoader } from 'components/Common/Loaders'

import { clearMessage } from 'actions'

const PublicRoute = ({ component: Component, ...props }) => {
  return (
    <SiteLayout>
      <Suspense fallback={<ContentLoader />}>
        <Route {...props} render={() => <Component />} />
      </Suspense>
    </SiteLayout>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

const mapDispatchToProps = dispatch => ({
  clearMessage: () => {
    dispatch(clearMessage())
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PublicRoute)
)
