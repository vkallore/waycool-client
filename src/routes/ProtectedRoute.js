import React, { Suspense } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardLayout from 'layouts/DashboardLayout'
import AdminLayout from 'layouts/AdminLayout'
import { ContentLoader } from 'components/Common/Loaders'

import SiteLayout from 'layouts/SiteLayout'

const LoginContainer = React.lazy(() =>
  import('components/Auth/LoginContainer')
)

const ProtectedRoute = ({
  component: Component,
  lazyLoad = true,
  ...props
}) => {
  const { loggedIn, loggedInAdmin } = props
  if (loggedIn) {
    let LoggedInLayout = null
    if (loggedInAdmin) {
      LoggedInLayout = AdminLayout
    } else {
      LoggedInLayout = DashboardLayout
    }

    return (
      <LoggedInLayout>
        <Suspense fallback={<ContentLoader />}>
          {!lazyLoad ? (
            <Route {...props} component={Component} />
          ) : (
            <Route {...props} render={() => <Component />} />
          )}
        </Suspense>
      </LoggedInLayout>
    )
  } else {
    return (
      <SiteLayout>
        <Suspense fallback={<ContentLoader />}>
          <Route {...props} render={() => <LoginContainer />} />
        </Suspense>
      </SiteLayout>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  loggedInAdmin: state.common.loggedInAdmin
})

export default withRouter(connect(mapStateToProps)(ProtectedRoute))
