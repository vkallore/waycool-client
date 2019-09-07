import React, { Suspense } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardLayout from 'layouts/DashboardLayout'
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
  const { loggedIn } = props
  return loggedIn ? (
    <DashboardLayout>
      <Suspense fallback={<ContentLoader />}>
        {!lazyLoad ? (
          <Route {...props} component={Component} />
        ) : (
          <Route {...props} render={() => <Component />} />
        )}
      </Suspense>
    </DashboardLayout>
  ) : (
    <SiteLayout>
      <Suspense fallback={<ContentLoader />}>
        <Route {...props} render={() => <LoginContainer />} />
      </Suspense>
    </SiteLayout>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default withRouter(connect(mapStateToProps)(ProtectedRoute))
