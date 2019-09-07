import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Routes from 'routes'

import { TITLE_SITE } from 'constants/AppLanguage'

const CommonModal = React.lazy(() => import('components/Common/CommonModal'))

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{TITLE_SITE}</title>
          {/* <link rel="canonical" href="" /> */}
        </Helmet>
        <Router>
          <Routes />
        </Router>
        <Suspense fallback={null}>
          <CommonModal />
        </Suspense>
      </React.Fragment>
    )
  }
}

export default App
