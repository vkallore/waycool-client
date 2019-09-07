import React, { Suspense } from 'react'
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PublicRoute from 'routes/PublicRoute'
import ProtectedRoute from 'routes/ProtectedRoute'
import { ContentLoader } from 'components/Common/Loaders'

import { clearMessage } from 'actions'

/* No Lazy Load for nested route components */
import TimeLogLayout from 'components/Dashboard/TimeLog/TimeLogLayout'

const HomeContainer = React.lazy(() =>
  import('components/Site/Home/HomeContainer')
)
const LoginContainer = React.lazy(() =>
  import('components/Auth/LoginContainer')
)
const RegisterContainer = React.lazy(() =>
  import('components/Site/Register/RegisterContainer')
)
const PageNotFoundContainer = React.lazy(() =>
  import('components/Common/PageNotFoundContainer')
)
const DashboardContainer = React.lazy(() =>
  import('components/Dashboard/DashboardContainer')
)
const LogoutView = React.lazy(() => import('components/Auth/LogoutView'))

class Routes extends React.Component {
  componentDidUpdate(prevProps) {
    const { location, loggedIn, clearMessage } = this.props
    if (
      prevProps.location.pathname !== location.pathname ||
      prevProps.loggedIn !== loggedIn
    ) {
      clearMessage()
    }
  }

  render() {
    return (
      <Suspense fallback={<ContentLoader />}>
        <Switch>
          <PublicRoute exact={true} path="/" component={HomeContainer} />
          <PublicRoute path="/login" component={LoginContainer} />
          <PublicRoute path="/register" component={RegisterContainer} />

          <ProtectedRoute path="/dashboard" component={DashboardContainer} />
          <ProtectedRoute path="/logout" component={LogoutView} />
          <ProtectedRoute
            path="/time-log"
            lazyLoad={false}
            component={TimeLogLayout}
          />

          <PublicRoute path="*" component={PageNotFoundContainer} />
        </Switch>
      </Suspense>
    )
  }
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
  )(Routes)
)
